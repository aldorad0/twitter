import TabPanel from "@mui/lab/TabPanel";
// import { Link } from "react-router-dom";
import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProfileTabs, ItemPost, ModalEdit } from "@/components";
// import { useLoadPost } from "@/hooks/useLoadPost";
import { Container as AppContainer } from "@/components";
import { getLikedPosts, getUserInfo } from "@/redux/slices/userSlice";
import { getMyPosts } from "@/redux/slices/postsSlice";

import ProfileUser from "@/components/ProfileUser/ProfileUser";
import InfiniteScroll from "react-infinite-scroll-component";

const tabs = [
  { label: "Post", value: "0" },
  // { label: "Replies", value: "1" },
  { label: "Likes", value: "2" },
];

export function Profile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useSelector((state) => state.user.user);
  const likedPosts = useSelector((state) => state.user.likedPosts);
  const posts = useSelector((state) => state.posts.myPosts);
  const dispatch = useDispatch();
  const hasMore = useSelector((state) => state.posts.hasMore);
  const [page, setPage] = useState(1);
  // console.log(posts);
  const fetchPosts = () => {
    setPage((prevState) => prevState + 1);

    if (hasMore) {
      dispatch(getMyPosts(page));
    }
  };
  useEffect(() => {
    dispatch(getMyPosts(0));
  }, [dispatch]);
  useEffect(() => {
    dispatch(getUserInfo());
    // dispatch(getMyPosts());
    dispatch(getLikedPosts());
  }, [dispatch]);

  return (
    <AppContainer>
      <ModalEdit
        isOpen={isModalOpen}
        fullName={user.fullName}
        userTag={user.userTag}
        location={user.location}
        bio={user.bio}
        onClose={() => setIsModalOpen(false)}
      />
      <Container
        maxWidth="sm"
        disableGutters={true}
        sx={{ border: "1px solid rgb(239, 243, 244)", height: "unset" }}>
        {user && (
          <ProfileUser
            id={user.id}
            key={user.id}
            fullName={user.fullName}
            avatarUrl={user.avatarUrl}
            imageUrl={user.imageUrl}
            userTag={user.userTag}
            bio={user.bio}
            setIsModalOpen={setIsModalOpen}
            birthdate={user.birthdate}
            following={user.following}
            followers={user.followers}
            showFollowButton={false}
            location={user.location}
            createdAt={user.createdAt}
          />
        )}
        <ProfileTabs
          tabs={tabs}
          variant="scrollable"
          scrollButtons="auto"
          style={{
            "& .MuiTabs-flexContainer": {
              justifyContent: "space-around",
            },
          }}>
          <TabPanel value="0" sx={{ padding: 0 }}></TabPanel>
          <InfiniteScroll
            dataLength={posts.length}
            next={fetchPosts}
            hasMore={true}
            // loader={posts?<h4>Loading...</h4> : null}
          >
            {posts.map((post) => (
              <ItemPost
                key={post.id}
                postUser={post.user}
                avatarUrl={user.avatarUrl}
                fullName={user.fullName}
                replyCount={post.replyCount}
                id={post.id}
                content={post.body}
                likeCount={post.likeCount}
                liked={post.liked}
                imageUrls={post.imageUrls}
              />
            ))}
          </InfiniteScroll>
          {/* <TabPanel value="1">Replies</TabPanel> */}
          <TabPanel value="2">
            {
              likedPosts.length ? (
                likedPosts.map((post) => (
                  <ItemPost
                    postUser={post.user}
                    avatarUrl={post.user.avatarUrl}
                    fullName={post.user.fullName}
                    key={post.id}
                    content={post.body}
                    imageUrls={post.imageUrls}
                    id={post.id}
                    likeCount={post.likeCount}
                    liked={post.liked}
                    replyCount={post.replyCount}
                  />
                ))
              ) : (
                <>You don&apos;t have any likes yet</>
              )
              // <NotificationTabContent
              //   title={'You do not have any likes yet'}
              //   text="Tap the heart on any post to show it some love. When you do, it’ll show up here."
              // />
            }
          </TabPanel>
        </ProfileTabs>
      </Container>
    </AppContainer>
  );
}
