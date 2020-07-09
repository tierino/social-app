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
import InfiniteScroll from "react-infinite-scroll-component";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  loaderContainer: {
    alignItems: "center",
    textAlign: "center",
    paddingTop: theme.spacing(2),
  },
}));

function areEqual(prevProps, nextProps) {
  return prevProps.posts === nextProps.posts;
}

function PostList(props) {
  const classes = useStyles();

  useEffect(() => {
    props.fetchPosts();
  }, []);

  if (props.posts.length === 0) {
    return (
      <Container className={classes.loaderContainer}>
        <CircularProgress />
      </Container>
    );
  }

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

export default connect(mapStateToProps, { fetchPosts })(
  React.memo(PostList, areEqual)
);
