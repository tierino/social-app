import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import AccountMenu from "./AccountMenu";
import { ReactComponent as Octopus } from "../images/octopus.svg";
import ScrollToTop from "./ScrollToTop";

import clsx from "clsx";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Divider from "@material-ui/core/Divider";
import HomeSharpIcon from "@material-ui/icons/HomeSharp";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  appBar: {
    background: "#212121",
  },
  menuButton: {
    marginRight: 12,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: {
    height: 72,
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  divider: {
    display: "inline",
    height: "50px",
  },
  homeButton: {
    padding: "8px",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
}));

const ColorButton = withStyles((theme) => ({
  root: {
    color: "#212121",
    backgroundColor: "#ff8a80",
    "&:hover": {
      backgroundColor: "#ff5252",
    },
  },
}))(Button);

function Header(props) {
  const classes = useStyles();
  let homeLink = "";

  if (props.authenticated) {
    homeLink = "/home";
  } else {
    homeLink = "/";
  }

  const renderLinks = () => {
    if (props.authenticated) {
      // User is signed in
      return (
        <div>
          {/* <Link to="/signout" style={{ textDecoration: "inherit" }}>
            <Button>Sign out</Button>
          </Link>
          <Divider
            className={classes.divider}
            variant="middle"
            orientation="vertical"
          /> */}
          <AccountMenu />
        </div>
      );
    } else {
      // User is not signed in
      return (
        <Typography>
          <Link
            to="/signin"
            style={{ textDecoration: "inherit", color: "inherit" }}
          >
            <Button className={classes.menuButton}>Sign in</Button>
          </Link>
          <Link
            to="/signup"
            style={{ textDecoration: "inherit", color: "inherit" }}
          >
            <ColorButton variant="contained">Sign up</ColorButton>
          </Link>
        </Typography>
      );
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar className={classes.appBar} position="fixed">
        <Container maxWidth="lg">
          <Toolbar className={classes.toolbar}>
            <Typography
              component="h1"
              variant="h5"
              noWrap
              className={classes.title}
            >
              <Link
                to={homeLink}
                style={{ textDecoration: "inherit", color: "inherit" }}
              >
                <IconButton className={classes.homeButton} disableRipple>
                  <Octopus style={{ width: "60px", height: "60px" }} />
                </IconButton>
              </Link>
            </Typography>
            {renderLinks()}
          </Toolbar>
        </Container>
      </AppBar>
      <ScrollToTop />
      <div className={classes.appBarSpacer} />
    </div>
  );
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(Header);
