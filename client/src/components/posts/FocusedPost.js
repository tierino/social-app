import React, { useState } from "react";
import { Field, reduxForm, reset } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import moment from "moment";

import CommentForm from "./CommentForm";
import { deletePost } from "../../actions";
import { toggleReaction } from "../../actions";

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

import { faCrown } from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    overflow: "auto",
  },
  card: {
    marginTop: theme.spacing(1),
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

function getCommentDialogStyle() {
  return {
    margin: "auto",
  };
}

function FocusedPost(props) {
  const classes = useStyles();

  // Likes/crowns state
  const [likedByUser, setLiked] = useState(
    props.post.likedBy.some((like) => like.userId === props.currentUserId)
  );
  const [numLikes, setNumLikes] = useState(props.post.likedBy.length);

  // Comments state
  const [numComments, setNumComments] = useState(props.post.commentIds.length);

  // Comment dialog state
  const [commentDialogOpen, setCommentDialogOpen] = React.useState(false);

  /* Delete dialog here as well */

  const renderAdmin = () => {
    if (
      props.currentUserId === props.post.authorId ||
      props.currentUserId === "7bcce630-d4a4-46c2-9330-c058d4c0ea76" // Admin account uid
    ) {
      return (
        <div>
          <Tooltip title="Delete this post">
            <IconButton
              className={classes.adminButton}
              onClick={() => {
                props.deletePost(props.post.id);
                props.history.push(`/home`);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
      );
    } else {
      return null;
    }
  };

  const handleCommentDialogOpen = (e) => {
    setCommentDialogOpen(true);
  };

  const handleCommentDialogClose = (e) => {
    setCommentDialogOpen(false);
  };

  const handlePostClick = (e) => {
    e.stopPropagation();
    // Go to post page (see comments)
    props.history.push(`/post/${props.post.id}`);
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
    return moment(props.post.date).format("MMM D YYYY, h:mm A");
  };

  return (
    <div className="item">
      <Dialog
        style={{
          //display: "flex",
          //alignItems: "center",
          justifyContent: "center",
        }}
        maxWidth="sm"
        fullWidth={true}
        open={commentDialogOpen}
        onClose={handleCommentDialogClose}
      >
        <CommentForm
          parentPost={props.post}
          handleClose={handleCommentDialogClose}
        />
      </Dialog>
      <Card className={classes.card} elevation={4}>
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
            {numComments}
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
})(FocusedPost);
