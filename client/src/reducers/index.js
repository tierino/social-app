import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import postsReducer from "./postsReducer";
import commentsReducer from "./commentsReducer";
import viewedPostReducer from "./viewedPostReducer";
import authReducer from "./authReducer";

export default combineReducers({
  auth: authReducer, // Auth state (token, current user)
  posts: postsReducer, // Posts state (all posts)
  viewedPost: viewedPostReducer,
  comments: commentsReducer, // Comments state (comments of currently viewed post)
  form: formReducer, // Form state (current form)
});
