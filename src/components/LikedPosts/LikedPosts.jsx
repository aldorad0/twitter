import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import PropTypes from "prop-types";
import { getCurrentLikedPosts } from "@/redux/slices/currentUser";
import { getLikedPosts } from "@/redux/slices/userSlice";
import { ItemPost } from "..";

function LikedPosts({ id, currentUser }) {
  const dispatch = useDispatch();
  const likedPosts = useSelector((state) =>
    currentUser ? state.currentUser.currentLikedPosts : state.user.likedPosts,
  );

  useEffect(() => {
    if (currentUser) {
      dispatch(getCurrentLikedPosts(id));
    } else {
      dispatch(getLikedPosts());
    }
  }, [dispatch, id, currentUser]);

  return (
    <>
      {likedPosts.length ? (
        likedPosts.map((post) => <ItemPost key={post.id} post={post} />)
      ) : (
        <>{currentUser ? "User has no liked posts" : "You don't have any likes yet"}</>
      )}
    </>
  );
}

export default LikedPosts;

LikedPosts.propTypes = {
  id: PropTypes.string,
  currentUser: PropTypes.bool,
};
