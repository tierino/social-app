import React, { useEffect } from "react";
import { Field, reduxForm, reset } from "redux-form";
import { compose } from "redux";
import { connect, useDispatch } from "react-redux";

import { fetchPosts } from "../../actions";
import Post from "./Post";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import ThumbUpAltSharpIcon from "@material-ui/icons/ThumbUpAltSharp";
import ThumbDownAltSharpIcon from "@material-ui/icons/ThumbDownAltSharp";
import ChatBubbleSharpIcon from "@material-ui/icons/ChatBubbleSharp";
import DeleteSharpIcon from "@material-ui/icons/DeleteSharp";
import EditSharpIcon from "@material-ui/icons/EditSharp";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    overflow: "auto",
  },
  container: {
    marginTop: theme.spacing(4),
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    alignItems: "center",
  },
  secondContainer: {
    alignItems: "center",
    textAlign: "center",
  },
  paper: {
    justifyContent: "center",
    padding: theme.spacing(2),
    flexDirection: "column",
    display: "flex",
  },
  fixedHeight: {
    height: 480,
  },
  box: {
    display: "flex",
    flexDirection: "column",
    height: "calc(100vh - 72px)",
    alignItems: "center",
  },
  card: {
    marginTop: theme.spacing(2),
  },
  username: {
    marginBottom: "12px",
  },
  adminButton: {
    marginLeft: "auto",
  },
  postContent: {
    wordWrap: "break-word",
  },
}));

// PostList only re-renders when the length of the posts array has changed, i.e.
// a post has been added or deleted.
function areEqual(prevProps, nextProps) {
  return prevProps.posts.length === nextProps.posts.length;
}

function PostList(props) {
  const classes = useStyles();

  console.log("yeaasdfasdf");

  return props.posts
    .slice(0)
    .reverse() // Make newest posts show at the top
    .map((post) => {
      if (!post.isComment) {
        return <Post post={post} key={post.id} history={props.history} />;
      }
    });
}

function mapStateToProps(state) {
  return { posts: Object.values(state.posts) };
}

export default connect(mapStateToProps)(React.memo(PostList, areEqual));
