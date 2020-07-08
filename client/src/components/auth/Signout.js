import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import * as actions from "../../actions";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import { ReactComponent as Goodbye } from "../../images/undraw_walk_in_the_city_1ma6.svg";
import { Typography } from "@material-ui/core";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: "center",
    marginTop: theme.spacing(12),
  },
}));

function Signout(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  // Call signout action creator when component mounts
  useEffect(() => {
    dispatch(props.signout());
  }, []);

  return (
    <Container maxWidth="sm" className={classes.container}>
      <Typography variant="h4">You have been signed out.</Typography>
      <Goodbye width={400} height={400} style={{ pointerEvents: "none" }} />
    </Container>
  );
}

export default connect(null, actions)(Signout);
