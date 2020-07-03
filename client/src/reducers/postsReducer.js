import _ from "lodash";

import {
  FETCH_POSTS,
  FETCH_POST,
  CREATE_POST,
  DELETE_POST,
  ADD_COMMENT_TO_PARENT,
  REMOVE_COMMENT_FROM_PARENT,
  TOGGLE_REACTION,
} from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case CREATE_POST:
      return { ...state, [action.payload.id]: action.payload };
    case ADD_COMMENT_TO_PARENT:
      return { ...state, [action.payload.id]: action.payload };
    case REMOVE_COMMENT_FROM_PARENT:
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_POSTS:
      // Turns array returned from api into an object with keys mapped to id of each post
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case FETCH_POST:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_POST:
      return _.omit(state, action.payload);
    case TOGGLE_REACTION:
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
};
