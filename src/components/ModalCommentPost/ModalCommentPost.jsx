import { styled } from "@mui/material";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/system";
import { CommentPost, ItemPost } from "@/components";
import { PostType } from "@/constants";
import { Cross } from "@/icons";
import styles from "../PostModal/PostModal.module.scss";
import PropTypes from "prop-types";

export const ModalBody = styled(Box)(() => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "600px",
  width: "100%",
  maxHeight: "40em",
  overflowY: "auto",
  overflowX: "hidden",
  backgroundColor: "white",
  display: "flex",
  justifyContent: "flex-start",
  flexDirection: "column",
  textAlign: "center",
  borderRadius: 24,
  paddingLeft: 16,
  paddingRight: 16,

  "@media(max-width: 700px)": {
    minWidth: "100%",
    minHeight: "100%",
  },
}));

export function ModalCommentPost({
  isOpen,
  closeModal,
  content,
  imageUrls,
  id,
  likeCount,
  liked,
  postUser,
  avatarUrl,
  fullName,
  bookmarked,
}) {
  return (
    <div>
      <Modal open={isOpen}>
        <ModalBody>
          <div className={styles.close}>
            <button onClick={closeModal} className={styles.clossvg}>
              <Cross size={30} />
            </button>
          </div>
          <div className={styles.postInput}>
            <ItemPost
              key={id}
              postUser={postUser}
              content={content}
              imageUrls={imageUrls}
              id={id}
              likeCount={likeCount}
              liked={liked}
              avatarUrl={avatarUrl}
              fullName={fullName}
              disable={true}
              bookmarked={bookmarked}
            />
            <CommentPost
              id={id}
              closeModal={closeModal}
              placeholder="Post your reply"
              buttonName="Reply"
              type={PostType.REPLY}
            />
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

ModalCommentPost.propTypes = {
  isOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  content: PropTypes.string,
  imageUrls: PropTypes.array,
  id: PropTypes.string,
  likeCount: PropTypes.number,
  liked: PropTypes.bool,
  updateComment: PropTypes.func,
  avatarUrl: PropTypes.string,
  fullName: PropTypes.string,
  postUser: PropTypes.object,
  bookmarked: PropTypes.bool,
};
