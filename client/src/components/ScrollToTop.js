import React from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Zoom from "@material-ui/core/Zoom";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    top: theme.spacing(12),
    left: "calc(50vw - 70px)",
    zIndex: 1100,
  },
}));

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function BackToTop(props) {
  // Only show if at home page
  if (useLocation().pathname === "/home") {
    return (
      <React.Fragment>
        <CssBaseline />
        <Toolbar id="back-to-top-anchor" />
        <ScrollTop {...props}>
          <Fab
            variant="extended"
            color="primary"
            size="medium"
            aria-label="scroll back to top"
          >
            BACK TO TOP
          </Fab>
        </ScrollTop>
      </React.Fragment>
    );
  } else {
    return null;
  }
}
