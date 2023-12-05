import TabPanel from "@mui/lab/TabPanel";
// import { Link } from "react-router-dom";

import { Container } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProfileTabs, ItemPost } from "@/components";
import { useLoadPost } from "@/hooks/useLoadPost";

import { Container as AppContainer } from "@/components";
import { useParams } from "react-router-dom";
import { getCurrentPosts, getCurrentUser } from "@/redux/slices/currentUser";

import ProfileUser from "@/components/ProfileUser/ProfileUser";
// import PropTypes from "prop-types";

const tabs = [
  { label: "Post", value: "0" },
  // { label: "Replies", value: "1" },
  // { label: "Likes", value: "2" },
];

export function CurrentUser() {
  const { id } = useParams();
  // const [isModalOpen, setIsModalOpen] = useState(false);

  const user = useSelector((state) => state.currentUser.user);
  const posts = useSelector((state) => state.currentUser.currentPosts);

  const dispatch = useDispatch();

  useLoadPost(getCurrentPosts);

  useEffect(() => {
    dispatch(getCurrentUser(id));
    dispatch(getCurrentPosts(id));
  }, [dispatch, id]);

  return (
    <>
      <AppContainer>
        <Container
          maxWidth="sm"
          disableGutters={true}
          sx={{ border: "1px solid rgb(239, 243, 244)" }}>
          {user && (
            <ProfileUser
              id={user.id}
              key={user.id}
              fullName={user.fullName}
              avatarUrl={user.avatarUrl}
              imageUrl={user.imageUrl}
              userTag={user.userTag}
              bio={user.bio}
              birthdate={user.birthdate}
              following={user.following}
              followers={user.followers}
              isFollowedByUser={user.isFollowedByUser}
              showFollowButton={true}
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
              {posts.map((post) => (
                <ItemPost
                  key={post.id}
                  avatarUrl={post.user?.avatarUrl}
                  fullName={post.user?.fullName}
                  replyCount={post.replyCount}
                  id={post.id}
                  content={post.body}
                  likeCount={post.likeCount}
                  liked={post.liked}
                  imageUrls={post.imageUrls}
                />
              ))}
            </TabPanel>
            {/* <TabPanel value="1">Replies</TabPanel>
          <TabPanel value="2">
            
          </TabPanel> */}
          </ProfileTabs>
        </Container>
      </AppContainer>
    </>
  );
}
// CurrentUser.propTypes = {
// updateComment: PropTypes.func,
// fullName: PropTypes.string,
// };
