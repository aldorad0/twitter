import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../service/api";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    selectedPost: null,
    postComments: [],
  },
  reducers: {
    setPosts: (state, action) => {
      const combinedPosts = [...state.posts, ...action.payload];
      const uniquePostsSet = new Set(combinedPosts.map((post) => post.id));
      const uniquePostsArray = Array.from(uniquePostsSet, (postId) =>
        combinedPosts.find((post) => post.id === postId),
      );
      state.posts = uniquePostsArray;
    },
    addPost: (state, action) => {
      const newPost = action.payload;
      if (newPost.type === "TWEET") {
        state.posts.unshift(newPost);
      }
      if (newPost.type === "REPLY") {
        state.postComments.unshift(newPost);

        if (newPost.parentPost && newPost.parentPost.id) {
          const parentPost = state.posts.find(
            (post) => post.id === newPost.parentPost.id,
          );

          if (parentPost) {
            parentPost.replyCount = (parentPost.replyCount || 0) + 1;
          }
        }
      }
    },
    deleteComment: (state, action) => {
      state.postComments.filter((comment) => comment.id !== action.payload);
    },
    deleteFromPost: (state, action) => {
      state.posts.filter((post) => post.id !== action.payload);
    },
    getPostId: (state, action) => {
      const post = action.payload;

      state.selectedPost = post;
    },
    getPostComents: (state, action) => {
      const comments = action.payload;
      state.postComments = comments;

      // Оновлюємо replyCount для кожного батьківського поста
      comments.forEach((comment) => {
        if (comment.parentPost && comment.parentPost.id) {
          const parentPost = state.posts.find(
            (post) => post.id === comment.parentPost.id,
          );
          if (parentPost) {
            parentPost.replyCount = (parentPost.replyCount || 0) + 1;
          }
        }
      });
    },

    like: (state, action) => {
      const { postId } = action.payload;
      state.posts = state.posts.map((post) =>
        post.id === postId
          ? { ...post, likeCount: post.likeCount + 1, liked: true }
          : post,
      );
      state.postComments = state.postComments.map((post) =>
        post.id === postId
          ? { ...post, likeCount: post.likeCount + 1, liked: true }
          : post,
      );
    },

    unlike: (state, action) => {
      const { id } = action.payload;
      state.posts = state.posts.map((post) =>
        post.id === id && post.likeCount > 0
          ? { ...post, likeCount: post.likeCount - 1, liked: false }
          : post,
      );
      state.postComments = state.postComments.map((post) =>
        post.id === id && post.likeCount > 0
          ? { ...post, likeCount: post.likeCount - 1, liked: false }
          : post,
      );
    },
  },
});

export const {
  setPosts,
  addPost,
  deleteComment,
  deleteFromPost,
  getPostId,
  getPostComents,
  like,
  unlike,
} = postsSlice.actions;
export default postsSlice.reducer;

export const handleUnlike = (id) => async (dispatch) => {
  try {
    const response = await api.delete(`likes/unlike?id=${id}`);

    if (response.status === 200) {
      const { likeCount, liked } = response.data;
      dispatch(unlike({ id, likeCount, liked }));
    }
  } catch (error) {
    console.error("Error unliking the post:", error);
  }
};

export const handleLike = (id) => async (dispatch) => {
  const requestData = {
    postId: id,
  };
  try {
    const response = await api.post(`likes/like`, requestData);

    if (response.status === 200) {
      const { likeCount, liked } = response.data;
      dispatch(like({ postId: id, likeCount, liked }));
    }
  } catch (error) {
    console.error("Error liking the post:", error);
  }
};

export const axiosPostComments = (id) => async (dispatch) => {
  try {
    const response = await api.get(`posts/replies?postId=${id}&page=${0}&pageSize=${5}`);
    const comments = response.data.content;
    // console.log(comments);
    dispatch(getPostComents(comments));
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

export const getPostById = (id) => async (dispatch) => {
  try {
    const response = await api.get(`posts/post?id=${id}`);
    const data = response.data;
    dispatch(getPostId(data));
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

export const getPosts = (currentPage) => async (dispatch) => {
  try {
    const response = await api.get(`posts/home?page=${currentPage}&pageSize=${12}`);
    // console.log(response);

    dispatch(setPosts(response.data.content));
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

export const addPosts = (formData) => async (dispatch) => {
  try {
    const response = await api.post("posts/create", formData);
    const data = response.data;
    dispatch(addPost(data));
  } catch (error) {
    console.log("ERROR", error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.delete(`posts/delete?id=${id}`);
    await dispatch(deleteFromPost(id));
    // dispatch(getPosts());
  } catch (error) {
    console.error("Сталася помилка при видаленні поста:", error);
  }
};
