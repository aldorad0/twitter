import styles from "./Home.module.scss";
import LabTabs from "../../Components/ProfileTabs";
import TabPanel from "@mui/lab/TabPanel";
import Post from "../../Components/Post/Post";
import ItemPost from "../../Components/ItemPost/ItemPost";
import React, { useState, useEffect } from "react";
import { api } from "../../service/api";
import { useSelector } from "react-redux";
import { getPosts } from "../../redux/actions/createPost";
import { useDispatch ,shallowEqual} from "react-redux";

const tabs = [
  { label: "Following", value: "1" },
  // { label: "Following", value: "2" },
];
const Home = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts, shallowEqual);

  // const [content, setContent] = useState(null);

  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getPosts());
      // api.get("posts/home")
      // .then((r) => setContent(r.data.content));
    }
  }, [isAuthenticated]);

  
  function compareByDate(a, b) {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
  
    if (dateA < dateB) {
      return 1; // Змінюємо на -1, якщо потрібно сортувати за зростанням
    }
    if (dateA > dateB) {
      return -1; // Змінюємо на 1, якщо потрібно сортувати за зростанням
    }
    return 0;
  }
  
  // Використовуємо метод sort() для сортування
  if (!isAuthenticated) return "Завантаження";
  return (
    <>
      <h1>Home</h1>
      {/* <button onClick={addPost}></button> */}
      <LabTabs
        tabs={tabs}
        variant="scrollable"
        scrollButtons="auto"
        style={{
          "& .MuiTabs-flexContainer": {
            justifyContent: "space-around",
          },
          button: {
            "&:hover": {
              backgroundColor: "#c9c3c381",
            },
          },
        }}
      >
        <TabPanel value="1">
          <Post  />
          {posts?.sort(compareByDate).map((p) => (
            <ItemPost   key={p.id} content={p.body} replyCount={p.replyCount} imageUrls={p.imageUrls} id ={p.id} likeCount ={p.likeCount } liked={p.liked}/>
          ))}
        </TabPanel>
        {/* <TabPanel value="2"></TabPanel> */}
      </LabTabs>
    </>
  );
};
export default Home;
