import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "inline",
  },
  paper: {
    "&:focus": {
      outline: "0px",
    },
  },
  menuTitle: {
    textAlign: "center",
    paddingBottom: "6px",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    "&:focus": {
      outline: "0px",
    },
  },
  menuContent: {
    color: "white",
  },
  avatar: {
    backgroundColor: "#ff8a80",
    marginRight: theme.spacing(2),
  },
  accountButton: {
    borderRadius: "26px",
    paddingRight: theme.spacing(2),
  },
}));

function AccountMenu(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  // Signout dialog state
  const [signoutDialogOpen, setSignoutDialogOpen] = React.useState(false);

  const handleSignoutDialogOpen = (e) => {
    setSignoutDialogOpen(true);
  };

  const handleSignoutDialogClose = (e) => {
    setSignoutDialogOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      <Dialog
        maxWidth="xs"
        fullWidth={true}
        open={signoutDialogOpen}
        onClose={handleSignoutDialogClose}
      >
        <DialogTitle>Are you sure you want to sign out?</DialogTitle>

        <Divider />
        <DialogActions>
          <Button onClick={handleSignoutDialogClose}>Cancel</Button>
          <Link to="/signout" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="secondary">
              Sign out
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
      <Button
        className={classes.accountButton}
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Avatar className={classes.avatar}>
          {props.currentUser.charAt(0).toUpperCase()}
        </Avatar>
        {props.currentUser}
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper className={classes.paper}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <Typography className={classes.menuTitle} variant="h6">
                    {props.currentUser}
                  </Typography>
                  <Divider></Divider>
                  <MenuItem
                    className={classes.menuContent}
                    onClick={handleClose}
                    disabled
                  >
                    My profile
                  </MenuItem>
                  <MenuItem
                    onClick={handleSignoutDialogOpen}
                    className={classes.menuContent}
                    style={{ textDecoration: "inherit" }}
                  >
                    Sign out
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}

function mapStateToProps(state) {
  return { currentUser: state.auth.username };
}

export default connect(mapStateToProps)(AccountMenu);
