import React, { useEffect } from "react";
import { connect } from "react-redux";

import { ReactComponent as Hello } from "../images/undraw_Hello_qnas.svg";
import SignupCard from "./auth/SignupCard";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

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
  container: {
    marginTop: theme.spacing(12),
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
  box: {
    display: "flex",
    flexDirection: "column",
    height: "calc(100vh - 72px)",
    alignItems: "center",
  },
}));

function Welcome(props) {
  const classes = useStyles();

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
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={6}>
              <Container>
                <Typography variant="h2">Welcome!</Typography>
                <Typography variant="h5">
                  Sign in or create an account to get started!
                </Typography>
              </Container>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <SignupCard history={props.history} />
              </Paper>
            </Grid>
          </Grid>
        </Container>
        <Container
          maxWidth="xl"
          className={classes.secondContainer}
        ></Container>
      </Box>
    </div>
  );
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(Welcome);
