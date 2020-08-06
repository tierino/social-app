import React, { getState, useEffect } from "react";
import { connect } from "react-redux";
import { Field, reduxForm, reset } from "redux-form";
import { compose } from "redux";
import { Link as RouterLink } from "react-router-dom";

import { fetchPost, fetchComments, fetchPosts } from "../../actions";
import CommentDialog from "./CommentForm";
import FocusedPost from "./FocusedPost";
import Post from "./Post";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import { deletePost } from "../../actions";
import { toggleReaction } from "../../actions";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tooltip from "@material-ui/core/Tooltip";
import Modal from "@material-ui/core/Modal";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import { faCrown } from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    overflow: "auto",
  },
  card: {
    marginTop: theme.spacing(1),
  },
  username: {},
  adminButton: {
    marginLeft: theme.spacing(1),
  },
  postContent: {
    wordWrap: "break-word",
    marginTop: "12px",
    whiteSpace: "pre-wrap",
  },
  date: {
    color: "grey",
  },
  crownIcon: {
    marginTop: "2px",
    marginBottom: "2px",
  },
  modal: {
    "&:focus": {
      outline: "none",
    },
    "&:active": {
      outline: "none",
    },
  },
  box: {
    display: "flex",
    flexDirection: "column",
    height: "calc(100vh - 72px)",
    alignItems: "center",
  },
  container: {
    marginTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    alignItems: "center",
  },
  loaderContainer: {
    textAlign: "center",
  },
  divider: {
    margin: theme.spacing(2),
  },
}));

function ViewPost(props) {
  const classes = useStyles();

  useEffect(() => {
    // Prevents bug where previous scroll position persists when clicking a post.
    window.scrollTo(0, 0);

    props.fetchPosts();

    const { id } = props.match.params;

    props.fetchPost(id);
    props.fetchComments(id);
  }, []);

  const renderComments = () => {
    // If no comments, display a message
    if (props.post.commentIds.length === 0) {
      return (
        <Container className={classes.loaderContainer}>
          <Typography style={{ color: "grey" }}>No comments</Typography>
        </Container>
      );
    }
    // Else, iterate over the posts commentIds, displaying each corresponding comment.
    // Storing every posts comment Ids allows this, which is faster than looping through
    // all posts to find which are comments of the current viewed post.
    return props.post.commentIds
      .slice(0)
      .reverse()
      .map((commentId) => {
        return (
          <Post
            post={props.posts[commentId]}
            key={commentId}
            history={props.history}
          >
            {commentId}
          </Post>
        );
      });
  };

  const renderPost = () => {
    // Display loader when post hasn't been fetched from fake API yet.
    if (!props.post) {
      return (
        <Container className={classes.loaderContainer}>
          <CircularProgress />
        </Container>
      );
    }

    return (
      <div>
        <FocusedPost
          post={props.post}
          key={props.post.id}
          history={props.history}
        />
        <Divider className={classes.divider} />
        {renderComments()}
      </div>
    );
  };

  return (
    <Box className={classes.box}>
      <Container className={classes.container} component="main" maxWidth="md">
        <Button
          style={{ marginTop: "12px" }}
          onClick={() => {
            props.history.goBack();
          }}
          startIcon={<ArrowBackIcon />}
        >
          Go back
        </Button>
        {renderPost()}
      </Container>
    </Box>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    posts: state.posts,
    post: state.posts[ownProps.match.params.id],
    originalPost: state.viewedPost.id,
  };
}

export default connect(mapStateToProps, {
  fetchPost,
  fetchComments,
  fetchPosts,
})(ViewPost);
