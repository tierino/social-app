// This content is exclusive to auth'd users
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchPosts } from "../actions";

import requireAuth from "./requireAuth";
import CreatePost from "./posts/CreatePost";
import PostList from "./posts/PostList";
import { ReactComponent as Octopus } from "../images/octopus.svg";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(1),
  },
  octopusIcon: {
    marginTop: theme.spacing(3),
    width: "80px",
    height: "80px",
  },
  container: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(4),
    alignItems: "center",
  },
  box: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  divider: {
    marginBottom: theme.spacing(3),
  },
}));

function Home(props) {
  const classes = useStyles();

  useEffect(() => {
    props.fetchPosts();
  }, []);

  return (
    <div>
      <Box className={classes.box}>
        <Octopus className={classes.octopusIcon} />
        <Typography className={classes.title} variant="h5">
          Home
        </Typography>
        <Container maxWidth="md" className={classes.container}>
          <CreatePost />
          <Divider className={classes.divider} />
          <PostList history={props.history} />
        </Container>
      </Box>
    </div>
  );
}

function mapStateToProps(state) {
  return { posts: Object.values(state.posts) };
}

// Wrap Home with HOC to ensure user must be auth'd
export default connect(mapStateToProps, { fetchPosts })(requireAuth(Home));
