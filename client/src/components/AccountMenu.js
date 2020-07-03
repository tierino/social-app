import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import IconButton from "@material-ui/core/IconButton";
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
    marginLeft: "8px",
    marginRight: "8px",
    color: "#ff8a80",
    "&:focus": {
      outline: "0px",
    },
  },
  menuContent: {
    color: "white",
  },
}));

function AccountMenu(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

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
      <IconButton
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <AccountCircleIcon fontSize="large" style={{ color: "#ff8a80" }} />
      </IconButton>
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
                  <MenuItem onClick={handleClose}>
                    <Link
                      to="/signout"
                      className={classes.menuContent}
                      style={{ textDecoration: "inherit" }}
                    >
                      Sign out
                    </Link>
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
