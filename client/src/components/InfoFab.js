import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  infoAnchor: {
    zIndex: 1100,
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

function InfoFab() {
  const classes = useStyles();

  // Info dialog state
  const [infoDialogOpen, setInfoDialogOpen] = React.useState(false);

  const handleInfoDialogOpen = (e) => {
    setInfoDialogOpen(true);
  };

  const handleInfoDialogClose = (e) => {
    setInfoDialogOpen(false);
  };

  return (
    <div className={classes.infoAnchor}>
      <Dialog
        maxWidth="sm"
        open={infoDialogOpen}
        onClose={handleInfoDialogClose}
      >
        <DialogTitle>APP INFORMATION</DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText>
            <Typography variant="subtitle1">ABOUT THE APP</Typography> <br />
            Created by Tom Ierino (
            <a
              href="https://github.com/tomierino/deployed-social-app"
              target="_blank"
              style={{ color: "#4791db" }}
            >
              https://github.com/tomierino
            </a>
            ). <br />
            See the source code on Github{" "}
            <a
              href="https://github.com/tomierino/deployed-social-app"
              target="_blank"
              style={{ color: "#4791db" }}
            >
              here
            </a>
            .
            <br /> <br />
            This is a simple MERN social media application with a fake REST API
            (json-server) containing posts and a MongoDB authentication server.
            The application contains post, delete, like and reply
            functionalities. Hosted by Heroku. Styled with Material UI.
            <br /> <br />
            <Typography variant="subtitle1">SIGNING UP</Typography> <br /> Sign
            up with a unique username and strong password. Passwords are
            encrypted in the MongoDB database. You can sign back in with these
            credentials at any point, given your account hasn't been deleted.{" "}
            <br /> <br />
            <Typography variant="subtitle1">POSTING</Typography> <br /> Feel
            free to create a new post, or explore and interact with the existing
            posts by clicking on them. Clicking on a post will show all of its
            direct comments. <br /> <br />
            <i>
              Note: due to the nature of Heroku, the fake posts API will reset
              whenever the app sleeps, or about every 24 hours.
            </i>
          </DialogContentText>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={handleInfoDialogClose}>Ok</Button>
        </DialogActions>
      </Dialog>
      <Tooltip title="Information" placement="left">
        <Fab size="small" onClick={handleInfoDialogOpen}>
          <InfoOutlinedIcon fontSize="large" />
        </Fab>
      </Tooltip>
    </div>
  );
}

export default InfoFab;
