import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { IconButton } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { ModalCommentPost } from "../../components";
import { deletePost } from "../../redux/slices/postsSlice";
import { api } from "../../service/api";
import { ReactComponent as View } from "../../assets/icons/view.svg";
import { ReactComponent as Reply } from "../../assets/icons/reply.svg";
import { ReactComponent as LikeFalse } from "../../assets/icons/likeFalse.svg";
import { ReactComponent as Repost } from "../../assets/icons/repost.svg";
import { ReactComponent as Share } from "../../assets/icons/share.svg";
import { ReactComponent as Like } from "../../assets/icons/like.svg";
import { ReactComponent as Delete } from "../../assets/icons/delete.svg";
import styles from "./ItemPost.module.scss";

export function ItemPost({
  content,
  imageUrls,
  id,
  likeCount,
  liked,
  disable,
  onPostDeleted,
  replyCount,
  updateComment,
  avatarUrl,
  fullName,
}) {
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDeletePost = () => {
    dispatch(deletePost(id));
    if (onPostDeleted) {
      onPostDeleted(id);
    }
  };

  const navigate = useNavigate();

  const redirectToPost = () => {
    navigate(`/inshyy-post/${id}`);
  };
  const fonnClick = (event) => {
    if (event.currentTarget === event.target) {
      redirectToPost();
    }
  };
  const [isLiked, setIsLiked] = useState(liked);
  const [likeCountState, setLikeCount] = useState(likeCount);

  const handleLike = async () => {
    try {
      const requestData = {
        postId: id,
      };
      const response = await api.post(`likes/like`, requestData);

      if (response.status === 200) {
        setIsLiked(true);

        setLikeCount((prevCount) => prevCount + 1);
        // dispatch(getPosts());
      }
    } catch (error) {
      console.error("Error liking the post:", error);
    }
  };
  const handleUnlike = async () => {
    try {
      const response = await api.delete(`likes/unlike?id=${id}`);

      if (response.status === 200) {
        setIsLiked(false);

        setLikeCount((prevCount) => prevCount - 1);

        // dispatch(getPosts());
      }
    } catch (error) {
      console.error("Error liking the post:", error);
    }
  };

  return (
    <div>
      <div className={styles.tweet} onClick={fonnClick}>
        <div className={styles.tweetHeader}>
          <div className={styles.tweetAvatar}>
            <Avatar
              sx={{
                mt: 0,
                ml: 1,
                bgcolor: "rgb(8, 139, 226)",
                width: 50,
                height: 50,
              }}
              src={avatarUrl}
            />
            <div className={styles.tweetUserInfo}>
              <span className={styles.tweetUsername}>{fullName}</span>
            </div>
          </div>
          <div>
            <IconButton id="basic-button" onClick={handleClick}>
              <MoreHorizIcon fontSize="large" />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}>
              <MenuItem onClick={handleDeletePost} sx={{ color: "red" }}>
                <Delete />
                Delete
              </MenuItem>
            </Menu>
          </div>
        </div>
        <p className={styles.tweetContent}>{content}</p>
        <div className={styles.tweetImg}>
          {imageUrls.map((imageUrl, index) => (
            <img
              key={index}
              src={imageUrl}
              alt={`${index}`}
              style={{ width: "220px", objectFit: "cover" }}
            />
          ))}
        </div>

        <div className={styles.tweetActions}>
          {!disable && (
            <>
              <div>
                <IconButton
                  onClick={openModal}
                  // onClick={() => {
                  //   // const postId = id;
                  //     dispatch(setModalComent());
                  //     dispatch(setContent(<ComentPost id={id}/>));
                  // }}
                >
                  <Reply className={styles.tweetReply} />
                </IconButton>
                <span>{replyCount}</span>
              </div>
              <IconButton>
                <Repost className={styles.tweetRepost} />
              </IconButton>
              <div>
                <IconButton onClick={isLiked ? handleUnlike : handleLike}>
                  {isLiked ? <LikeFalse /> : <Like className={styles.tweetLike} />}
                </IconButton>
                <span>{likeCountState}</span>
              </div>
              <IconButton>
                <View className={styles.tweetReply} />
              </IconButton>
              <IconButton>
                <Share className={styles.tweetReply} />
              </IconButton>
            </>
          )}
        </div>
      </div>

      <ModalCommentPost
        isOpen={modalIsOpen}
        closeModal={closeModal}
        content={content}
        imageUrls={imageUrls}
        id={id}
        likeCount={likeCount}
        liked={liked}
        updateComment={updateComment}
        avatarUrl={avatarUrl}
        fullName={fullName}
      />
    </div>
  );
}

ItemPost.propTypes = {
  content: PropTypes.string,
  imageUrls: PropTypes.array,
  avatarUrl: PropTypes.string,
  fullName: PropTypes.string,
};

ItemPost.defaultProps = {
  content: "",
  imageUrls: [],
  avatarUrl: "",
  fullName: "",
};
