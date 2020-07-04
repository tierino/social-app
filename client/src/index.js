import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import reducers from "./reducers";
import App from "./components/App";
import Welcome from "./components/Welcome";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import Signout from "./components/auth/Signout";
import Signin from "./components/auth/Signin";
import ViewPost from "./components/posts/ViewPost";
import UserProfile from "./components/users/UserProfile";

// if (process.env.NODE_ENV === "development") {
//   const whyDidYouRender = require("@welldone-software/why-did-you-render");
//   whyDidYouRender(React, {
//     trackAllPureComponents: true,
//   });
// }

const store = createStore(
  reducers,
  // This object is initial state
  {
    // When app starts up, check localStorage to see if user has a token
    auth: {
      authenticated: localStorage.getItem("token"),
      username: localStorage.getItem("username"),
      id: localStorage.getItem("id"),
    },
  },
  composeWithDevTools(applyMiddleware(reduxThunk))
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Route path="" exact component={Welcome} />
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/home" component={Home} />
          <Route path="/signout" component={Signout} />
          <Route path="/signin" component={Signin} />
          <Route path="/post/:id" exact component={ViewPost} />
          <Route path="/:username" component={UserProfile} />
        </Switch>
      </App>
    </BrowserRouter>
  </Provider>,
  document.querySelector("#root")
);
