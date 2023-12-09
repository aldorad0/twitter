import { useLoadPost } from "@/hooks/useLoadPost";
import { Stack, Typography } from "@mui/material";
import { useSelector, shallowEqual } from "react-redux";
import { Container, CreatePost, ItemPost, WelcomeMessage } from "@/components";
import { homeHeaderSX } from "./stylesSX";

export const Home = () => {
  const accountUser = useSelector((state) => state.user.user);
  const posts = useSelector((state) => state.posts.posts, shallowEqual);
  const popularPosts = useSelector((state) => state.posts.popularPosts, shallowEqual);
  const renderPosts = accountUser.following ? posts : popularPosts;

  useLoadPost();

  return (
    <Container>
      <div style={{ border: "1px solid rgb(239, 243, 244)" }}>
        <Stack sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
          <Typography variant="h2" component="h2" sx={homeHeaderSX}>
            Following
          </Typography>
        </Stack>

        {!accountUser.following && (
          <WelcomeMessage
            stylesSX={{
              marginBottom: "15px",
              padding: "0 20px",
              fontWeight: 500,
              textAlign: "center",
            }}
          />
        )}
        <CreatePost avatarUrl={accountUser.avatarUrl} />
        {renderPosts.map((post) => (
          <ItemPost
            key={post.id}
            postUser={post.user}
            avatarUrl={post.user.avatarUrl}
            fullName={post.user.fullName}
            content={post.body}
            replyCount={post.replyCount}
            imageUrls={post.imageUrls}
            id={post.id}
            likeCount={post.likeCount}
            liked={post.liked}
            bookmarked={post.bookmarked}
          />
        ))}
      </div>
    </Container>
  );
};
