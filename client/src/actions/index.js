import axios from "axios";
import history from "../history";
import posts from "../apis/posts";
import {
  AUTH_USER,
  AUTH_ERROR,
  CREATE_POST,
  FETCH_POSTS,
  FETCH_COMMENTS,
  FETCH_POST,
  DELETE_POST,
  TOGGLE_REACTION,
  ADD_COMMENT_TO_PARENT,
  REMOVE_COMMENT_FROM_PARENT,
} from "./types";

const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

/*****************************************************************************
 * AUTH ACTIONS
 *****************************************************************************/

// Redux Thunk allows us to return either an action object (as usual) or a function
export const signup = (formProps, callback) => async (dispatch) => {
  try {
    // const response = await axios.post(`/signup`, formProps); //formProps has username and password

    /* Uncomment below for local development */

    const response = await axios.post(
      `http://localhost:3090/signup`,
      formProps
    );

    // Successful signup action, send web token in payload
    dispatch({
      type: AUTH_USER,
      payload: {
        token: response.data.token,
        username: formProps.username,
        id: response.data.userId,
      },
    });
    // Store token in localStorage (persisting logged-in state)
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("id", response.data.userId);
    localStorage.setItem("username", formProps.username);
    // Redirects user to '/home'
    callback();
  } catch (e) {
    console.log(e);
    dispatch({ type: AUTH_ERROR, payload: "Username in use." });
  }
};

export const signout = () => {
  localStorage.removeItem("token");

  return {
    type: AUTH_USER,
    payload: "",
  };
};

export const signin = (formProps, callback) => async (dispatch) => {
  try {
    // const response = await axios.post(`/signin`, formProps); //formProps has username and password

    /* Uncomment below for local development */

    const response = await axios.post(
      `http://localhost:3090/signin`,
      formProps
    );

    // Successful signin action, send web token in payload
    dispatch({
      type: AUTH_USER,
      payload: {
        token: response.data.token,
        username: formProps.username,
        id: response.data.userId,
      },
    });
    // Store token in localStorage (persisting logged-in state)
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("id", response.data.userId);
    localStorage.setItem("username", formProps.username);
    // Redirects user to '/home'
    callback();
  } catch (e) {
    console.log(e);
    dispatch({ type: AUTH_ERROR, payload: "Invalid username or password." });
  }
};

/*****************************************************************************
 * POST ACTIONS
 *****************************************************************************/

export const createPost = (formProps, postId, parentId) => async (
  dispatch,
  getState
) => {
  const { auth } = getState();

  const response = await posts.post("/posts", {
    ...formProps,
    author: auth.username,
    authorId: auth.id,
    likedBy: [],
    dislikedBy: [],
    commentIds: [],
    isComment: postId ? true : false, // If id is passed in, it is a comment
    date: Date.now(),
    parentId: parentId ? parentId : null,
    id: postId ? postId : uuidv4(),
  });

  dispatch({
    type: CREATE_POST,
    payload: response.data,
  });
};

export const addCommentToParent = (parentId, postId) => async (dispatch) => {
  const getResponse = await posts.get(`/posts/${parentId}`);
  let response;

  response = await posts.patch(`/posts/${parentId}`, {
    commentIds: [...getResponse.data.commentIds, postId],
  });

  dispatch({
    type: ADD_COMMENT_TO_PARENT,
    payload: response.data,
  });
};

export const removeCommentFromParent = (parentId, postId) => async (
  dispatch
) => {
  const getResponse = await posts.get(`/posts/${parentId}`);
  let response;

  response = await posts.patch(`/posts/${parentId}`, {
    commentIds: getResponse.data.commentIds.filter((commentId) => {
      return commentId !== postId;
    }),
  });

  dispatch({
    type: REMOVE_COMMENT_FROM_PARENT,
    payload: response.data,
  });
};

export const deletePost = (id) => async (dispatch) => {
  await posts.delete(`/posts/${id}`);

  dispatch({ type: DELETE_POST, payload: id });
  // Return to list of posts
  history.push("/");
};

export const fetchPost = (id) => async (dispatch) => {
  const response = await posts.get(`/posts/${id}`);

  dispatch({ type: FETCH_POST, payload: response.data });
};

export const fetchPosts = () => async (dispatch) => {
  const response = await posts.get("/posts");
  dispatch({ type: FETCH_POSTS, payload: response.data });
};

export const fetchComments = (parentId) => async (dispatch) => {
  const response = await posts.get(`/posts/${parentId}`);

  dispatch({ type: FETCH_COMMENTS, payload: response.data });
};

export const toggleReaction = (id, user, userId, toggleType) => async (
  dispatch
) => {
  const getResponse = await posts.get(`/posts/${id}`);
  let response;

  if (toggleType == "on") {
    // LIKE
    response = await posts.patch(`/posts/${id}`, {
      likedBy: [...getResponse.data.likedBy, { user, userId }],
    });
  } else {
    // UN-LIKE
    response = await posts.patch(`/posts/${id}`, {
      likedBy: getResponse.data.likedBy.filter(
        (like) => like.userId !== userId
      ),
    });
  }

  dispatch({ type: TOGGLE_REACTION, payload: response.data });
};

/*****************************************************************************
 * OTHER ACTIONS
 *****************************************************************************/

export const clearError = () => {
  return {
    type: AUTH_ERROR,
    payload: "",
  };
};
