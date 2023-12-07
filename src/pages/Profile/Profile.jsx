import TabPanel from "@mui/lab/TabPanel";
// import { Link } from "react-router-dom";
import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProfileTabs, ItemPost, ModalEdit } from "@/components";
// import { useLoadPost } from "@/hooks/useLoadPost";
import { Container as AppContainer } from "@/components";
import { getLikedPosts, getUserInfo } from "@/redux/slices/userSlice";
import { getMyPosts, resetPosts } from "@/redux/slices/postsSlice";
import useLoadPostsNew from "@/hooks/useLoadPostsNew";
import InfiniteScroll from "react-infinite-scroll-component";
import ProfileUser from "@/components/ProfileUser/ProfileUser";
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
  // const [page, setPage] = useState(1);
  // const hasMore = useSelector((state) => state.posts.hasMore);
  // const fetchPosts = () => {
  //   setPage((prevState) => prevState + 1);

  //   if (hasMore) {
  //     dispatch(getMyPosts(page));
  //   }
  // };

  // useLoadPost(getMyPosts);
  useEffect(() => {
    dispatch(getLikedPosts());
    dispatch(getUserInfo());
    dispatch(resetPosts());
    dispatch(getMyPosts());
  }, [dispatch]);

  const fetchPosts = useLoadPostsNew(getMyPosts);

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
          <TabPanel value="0">
            <InfiniteScroll
              dataLength={posts.length}
              next={fetchPosts}
              hasMore={true}
              loader={<h4>Loading...</h4>}>
              {posts?.map((post) => (
                <ItemPost
                  key={post.id}
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
          </TabPanel>

          {/* <TabPanel value="1">Replies</TabPanel> */}
          <TabPanel value="2">
            {
              likedPosts.length ? (
                likedPosts.map((post) => (
                  <ItemPost
                    avatarUrl={user.avatarUrl}
                    fullName={user.fullName}
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
