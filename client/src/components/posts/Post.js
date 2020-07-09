import React, { useState } from "react";
import { Field, reduxForm, reset } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import moment from "moment";

import CommentForm from "./CommentForm";
import {
  deletePost,
  toggleReaction,
  removeCommentFromParent,
} from "../../actions";

import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";
import CardActions from "@material-ui/core/CardActions";
import Paper from "@material-ui/core/Paper";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import DeleteIcon from "@material-ui/icons/Delete";
import Divider from "@material-ui/core/Divider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";

import { faCrown } from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    overflow: "auto",
  },
  card: {
    marginTop: theme.spacing(1),
  },
  commentCard: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  postHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    marginRight: theme.spacing(2),
    backgroundColor: "#ff8a80",
  },
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
  dialog: {
    "&:focus": {
      outline: "none",
    },
    "&:active": {
      outline: "none",
    },
  },
}));

function Post(props) {
  const classes = useStyles();

  // Likes state
  const [likedByUser, setLiked] = useState(
    props.post.likedBy.some((like) => like.userId === props.currentUserId)
  );
  const [numLikes, setNumLikes] = useState(props.post.likedBy.length);

  // Comments state
  const [numComments, setNumComments] = useState(props.post.commentIds.length);

  // Comment dialog state
  const [commentDialogOpen, setCommentDialogOpen] = React.useState(false);

  const handleCommentDialogOpen = (e) => {
    setCommentDialogOpen(true);
  };

  const handleCommentDialogClose = (e) => {
    setCommentDialogOpen(false);
  };

  // Delete dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  const handleDeleteDialogOpen = (e) => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = (e) => {
    setDeleteDialogOpen(false);
  };

  // Delete button
  const renderAdmin = () => {
    // If post belongs to logged-in user
    if (props.currentUserId === props.post.authorId) {
      return (
        <div>
          <Tooltip title="Delete this post">
            <IconButton
              className={classes.adminButton}
              onClick={handleDeleteDialogOpen}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
      );
    }
  };

  const handlePostClick = (e) => {
    e.stopPropagation();
    // Go to post page (see comments)
    props.history.push(`/post/${props.post.id}`);
  };

  const handleDelete = () => {
    if (props.post.isComment) {
      // async/await prevents undefined error when ViewPost renders
      async function deleteComment() {
        await props.removeCommentFromParent(props.post.parentId, props.post.id);
        props.deletePost(props.post.Id);
      }
      deleteComment();
    } else {
      props.deletePost(props.post.id);
    }
  };

  const handleLike = () => {
    props.toggleReaction(
      props.post.id,
      props.currentUsername,
      props.currentUserId,
      likedByUser ? "off" : "on"
    );

    if (!likedByUser) {
      // Set to liked
      setLiked(true);
      setNumLikes(numLikes + 1);
    } else {
      setLiked(false);
      setNumLikes(numLikes - 1);
    }
  };

  const likeButtonColor = () => {
    return likedByUser ? "#ff128c" : "white";
  };

  const crownButtonColor = () => {
    return;
  };

  const getDateStr = () => {
    return moment(props.post.date).fromNow();
  };

  return (
    <div className="item">
      <Dialog
        maxWidth="sm"
        fullWidth={true}
        open={commentDialogOpen}
        onClose={handleCommentDialogClose}
      >
        <CommentForm
          parentPost={props.post}
          handleClose={handleCommentDialogClose}
          numComments={numComments}
          incrementComments={setNumComments}
        />
      </Dialog>
      <Dialog
        maxWidth="xs"
        fullWidth={true}
        open={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
      >
        <DialogTitle>Permanently delete this post?</DialogTitle>
        <Divider />
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>Cancel</Button>
          <Button variant="contained" color="secondary" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Card
        className={props.post.isComment ? classes.commentCard : classes.card}
      >
        <CardActionArea onClick={handlePostClick}>
          <CardContent style={{ display: "flex" }}>
            <div className={classes.content}>
              <div className={classes.postHeader}>
                <Avatar className={classes.avatar}>
                  {props.post.author.charAt(0).toUpperCase()}
                </Avatar>
                <div>
                  <Typography variant="h6">
                    <Link
                      to={`/${props.post.author}`}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      color="inherit"
                      component={RouterLink}
                    >
                      {props.post.author}
                    </Link>
                  </Typography>
                  <Typography className={classes.date} variant="caption">
                    {getDateStr()}
                  </Typography>
                </div>
              </div>
              <Typography className={classes.postContent} variant="body1">
                {props.post.content}
              </Typography>
            </div>
          </CardContent>
          <Divider />
        </CardActionArea>
        <CardActions style={{ paddingTop: "0px", paddingBottom: "1px" }}>
          <IconButton onClick={handleLike}>
            <FavoriteIcon
              fontSize="small"
              style={{ color: likeButtonColor() }}
            />
          </IconButton>
          <Typography
            variant="body1"
            style={{ display: "inline", color: likeButtonColor() }}
          >
            {numLikes}
          </Typography>
          <IconButton onClick={handleCommentDialogOpen}>
            <ChatBubbleIcon fontSize="small" />
          </IconButton>
          <Typography
            variant="body1"
            style={{ display: "inline", marginRight: "auto" }}
          >
            <Link
              to={`/post/${props.post.id}`}
              color="inherit"
              component={RouterLink}
            >
              {numComments}
            </Link>
          </Typography>
          {/* <Tooltip title="Crown this post">
            <IconButton style={{ marginRight: "auto" }}>
              <FontAwesomeIcon
                className={classes.crownIcon}
                icon={faCrown}
                size="xs"
              />
            </IconButton>
          </Tooltip> */}
          {renderAdmin()}
        </CardActions>
      </Card>
    </div>
  );
}

function mapStateToProps(state) {
  return { currentUserId: state.auth.id, currentUsername: state.auth.username };
}

export default connect(mapStateToProps, {
  deletePost,
  toggleReaction,
  removeCommentFromParent,
})(Post);
