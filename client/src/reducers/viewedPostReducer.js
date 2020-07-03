import _ from "lodash";

import { FETCH_POST } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_POST:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
