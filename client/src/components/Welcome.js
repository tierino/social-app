import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { compose } from "redux";

import { ReactComponent as Hello } from "../images/undraw_Hello_qnas.svg";
import SignupCard from "./auth/SignupCard";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import withWidth from "@material-ui/core/withWidth";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,

    overflow: "auto",
  },
  welcomeText: {
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
    },
  },
  container: {
    marginTop: theme.spacing(12),
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(1),
    },
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    alignItems: "center",
  },
  lowerContainer: {
    alignItems: "center",
    textAlign: "center",
  },
  paper: {
    justifyContent: "center",
    padding: theme.spacing(2),
    flexDirection: "column",
    display: "flex",
  },
  box: {
    display: "flex",
    flexDirection: "column",
    height: "calc(100vh - 72px)",
    alignItems: "center",
  },
}));

function Welcome(props) {
  const classes = useStyles();
  const { width } = props;

  // Push to Home page if user is signed in when site loads
  useEffect(() => {
    if (props.authenticated) {
      props.history.push("/home");
    }
  }, []);

  return (
    <div>
      <Box className={classes.box}>
        <Container maxWidth="md" className={classes.container}>
          <Grid
            container
            spacing={3}
            alignItems="center"
            direction={width === "xs" ? "column" : "row"}
          >
            <Grid item xs={12} sm={5} md={6} className={classes.welcomeText}>
              <Typography variant={width === "xs" ? "h4" : "h3"}>
                Welcome!
              </Typography>
              <Typography variant={width === "xs" ? "h6" : "h5"}>
                Sign in or create an account to get started.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={7} md={6}>
              <Paper className={classes.paper}>
                <SignupCard history={props.history} />
              </Paper>
            </Grid>
          </Grid>
        </Container>
        <Container maxWidth="xl" className={classes.lowerContainer}>
          <Typography variant="subtitle1" style={{ color: "grey" }}>
            See bottom right of screen for app info ˙ ͜ʟ˙
          </Typography>
        </Container>
      </Box>
    </div>
  );
}

Welcome.propTypes = {
  width: PropTypes.oneOf(["lg", "md", "sm", "xl", "xs"]).isRequired,
};

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default compose(withWidth(), connect(mapStateToProps))(Welcome);
