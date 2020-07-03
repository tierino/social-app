import React, { useState } from "react";
import { Field, reduxForm, reset } from "redux-form";
import { compose } from "redux";
import { connect, useDispatch } from "react-redux";

import { addCommentToParent, createPost } from "../../actions";

import {
  makeStyles,
  ThemeProvider,
  withStyles,
  createMuiTheme,
} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import InputBase from "@material-ui/core/InputBase";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import CheckSharpIcon from "@material-ui/icons/CheckSharp";
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import Divider from "@material-ui/core/Divider";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Snackbar from "@material-ui/core/Snackbar";

const { v4: uuidv4 } = require("uuid");

const useStyles = makeStyles((theme) => ({
  form: {
    padding: "0px",
  },
  container: {
    padding: "0px",
    //textAlign: "right",
  },
  textField: {
    padding: "0px",
  },
  button: {
    // marginTop: theme.spacing(2),
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

// Field renderer so Material-UI works with Redux Form
const renderTextField = ({ input, meta: { touched, invalid }, ...custom }) => (
  <InputBase
    variant="outlined"
    multiline
    autoComplete="off"
    placeholder="Write a new comment"
    error={touched && invalid}
    {...input}
    {...custom}
  />
);

function CommentForm(props) {
  const dispatch = useDispatch();
  const { handleSubmit } = props;
  const classes = useStyles();

  // Store contents of text field in component-level state
  const [postContent, setContent] = useState("");

  const onChange = (event) => setContent(event.target.value);

  const onSubmit = (formProps) => {
    // Trim whitespaces each end, compress multiple sequential newlines into one
    // (no clue how the replace() call works)
    formProps.content = formProps.content.trim().replace(/\n\s*\n/g, "\n\n");
    // Check if non-empty
    if (formProps.content) {
      const commentId = uuidv4();

      props.addCommentToParent(props.parentPost.id, commentId);
      props.createPost(formProps, commentId, props.parentPost.id);
      props.handleClose();
      // props.incrementComments(props.numComments + 1);
    }
    // Clear the form after submission
    dispatch(reset("newComment"));
    setContent("");
  };

  return (
    <Container className={classes.container}>
      <DialogTitle>Commenting on {props.parentPost.author}'s post</DialogTitle>
      <DialogContent>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Field
            autoFocus
            className={classes.textField}
            rowsMax={20}
            fullWidth
            name="content"
            component={renderTextField}
            onChange={onChange}
          />
        </form>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button
          className={classes.button}
          onClick={() => {
            setContent("");
            dispatch(reset("newComment"));
            props.handleClose();
          }}
          style={{ marginRight: "12px" }}
        >
          Cancel
        </Button>
        <ColorButton
          className={classes.button}
          variant="contained"
          onClick={handleSubmit(onSubmit)}
          disabled={postContent.trim() === ""}
        >
          Post
        </ColorButton>
      </DialogActions>
    </Container>
  );
}

function mapStateToProps(state) {
  return { originalPost: state.viewedPost };
}

export default compose(
  connect(mapStateToProps, { addCommentToParent, createPost }),
  reduxForm({ form: "newComment" })
)(CommentForm);
