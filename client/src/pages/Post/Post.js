import { Fragment, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import styles from "./Post.module.scss";
import { useSelector } from "react-redux";
import { useModal } from "../../hooks";

import { getReadingTime } from "../../utils/stringUtils";
import { formatRelativeDate } from "../../utils/dateUtils";
import DOMPurify from "dompurify";
import draftToHtml from "draftjs-to-html";

import Sidebar from "../../components/Sidebar/Sidebar";
import SidebarProfile from "../../components/Sidebar/components/SidebarProfile";
import Avatar from "react-avatar";
import BookmarkButton from "../../components/BookmarkButton/BookmarkButton";
import MoreButton from "../../components/MoreButton/MoreButton";
import Button from "../../components/Button/Button";
import Loader from "../../components/Loader/Loader";
import AuthenticationModal from "../../components/Modal/AuthenticationModal/AuthenticationModal";
import CommentsMenu from "./components/CommentsMenu";

import {
  getPost,
  deletePost,
  likePost,
  unlikePost,
} from "../../features/posts/postsService";

function Post() {
  const [authModalOpen, openAuthModal, closeAuthModal] = useModal();
  const [commentsMenuOpen, setCommentsMenuOpen] = useState(false);
  const [post, setPost] = useState();
  const [loading, setLoading] = useState(false);
  const { postId } = useParams();
  const navigate = useNavigate();

  const sanitizedHTML = DOMPurify.sanitize(draftToHtml(post?.content));

  const { id, token } = useSelector((state) => state.auth.user);


  useEffect(() => {
    try {
      async function fetchPost() {
        setLoading(true);
        const response = await getPost(postId, token);
        setPost(response);
        setLoading(false);
      }

      fetchPost();
    } catch (error) {
      navigate("/404");
    }
  }, [postId, navigate, token]);

  function handleLikesClick() {
    const isOwnPost = post?.author._id === id;
    if (!token) {
      openAuthModal();
    } else if (post.isLiked && !isOwnPost) {
      unlikePost(postId, token);
      setPost({ ...post, isLiked: false, likeCount: post.likeCount - 1 });
    } else if (!isOwnPost) {
      likePost(postId, token);
      setPost({ ...post, isLiked: true, likeCount: post.likeCount + 1 });
    }
  }

  function handleCommentsClick() {
    if (!token) {
      openAuthModal();
    } else {
      setCommentsMenuOpen(true);
    }
  }

  async function onClickDelete() {
    try {
      await deletePost(postId, token);
      navigate("/");
    } catch {
      navigate("404");
    }
  }

  if (loading) {
    return <Loader className={styles.loader} />;
  } else if(!post?.author){
    navigate("404");
  } else {
    const isOwnPost = post?.author._id === id;

    return (
      <Fragment>
        <main className={styles.wrapper}>
          <div className={styles.container}>
            <div className={styles.header}>
              <div className={styles.infoContainer}>
                <Link to={`/${post?.author.username}`}>
                  <Avatar
                    name={post?.author.username}
                    size="48"
                    textSizeRatio={1.5}
                    src={post?.author.avatar?.url}
                    round
                  />
                </Link>
                <div className={styles.info}>
                  <Link
                    to={`/${post?.author.username}`}
                    className={styles.author}
                  >
                    <p>{post?.author.username}</p>
                  </Link>
                  <div className={styles.details}>
                    <p>
                      {post?.createdAt && formatRelativeDate(post?.createdAt)}
                    </p>
                    <p className={styles.bullet}>·</p>
                    <p>{getReadingTime(sanitizedHTML)}</p>
                  </div>
                </div>
              </div>
              <div className={styles.headerButtonsContainer}>
                <BookmarkButton post={post} />
                {isOwnPost && (
                  <MoreButton>
                    <button
                      onClick={onClickDelete}
                      className={styles.deleteButton}
                    >
                      Delete post
                    </button>
                  </MoreButton>
                )}
              </div>
            </div>
            <h1 className={styles.title}>{post?.title}</h1>
            {post?.photo && (
              <img alt="" src={post.photo.url} className={styles.image} />
            )}
            <div
              dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
              className={styles.content}
            ></div>
            <span className={styles.buttonContainer}>
              <Button
                leadingIcon={post?.isLiked ? "thumbs-up-filled" : "thumbs-up"}
                variant="icon"
                onClick={handleLikesClick}
                className={styles.button}
                disabled={isOwnPost}
              />
              <span>{post?.likeCount}</span>
            </span>
            <Button
              leadingIcon="chat-bubble"
              variant="icon"
              onClick={handleCommentsClick}
              className={styles.button}
            />
          </div>
        </main>
        <Sidebar>
          {post?.author && (
            <SidebarProfile
              author={post.author}
              username={post.author.username}
              id={id}
              token={token}
              openAuthModal={openAuthModal}
            />
          )}
        </Sidebar>
        {commentsMenuOpen && (
          <CommentsMenu
            postId={postId}
            token={token}
            isOpen={commentsMenuOpen}
            setCommentsMenuOpen={setCommentsMenuOpen}
          />
        )}
        {authModalOpen && (
          <AuthenticationModal
            shouldShowLogin={false}
            isOpen={authModalOpen}
            onRequestClose={closeAuthModal}
          />
        )}
      </Fragment>
    );
  }
}

export default Post;
