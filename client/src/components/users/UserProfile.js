import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  text: {
    marginTop: theme.spacing(8),
  },
}));

function UserProfile(props) {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="md">
      <Typography variant="h5" className={classes.text}>
        {props.match.params.username}'s profile
      </Typography>
      <Typography style={{ color: "grey" }}>
        (Profiles are still under development)
      </Typography>
    </Container>
  );
}

export default UserProfile;
