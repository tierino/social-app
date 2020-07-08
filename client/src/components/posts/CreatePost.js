import React, { useState } from "react";
import { Field, reduxForm, reset } from "redux-form";
import { compose } from "redux";
import { connect, useDispatch } from "react-redux";

import { createPost } from "../../actions";

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

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "0px",
    textAlign: "right",
    marginBottom: theme.spacing(3),
  },
  textField: {
    padding: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(1),
  },
  formContainer: {
    marginRight: theme.spacing(16),
    marginLeft: theme.spacing(16),
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
    placeholder="Write a new post"
    error={touched && invalid}
    {...input}
    {...custom}
  />
);

function CreatePost(props) {
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
      props.createPost(formProps);
    }
    // Clear the form after submission
    dispatch(reset("newPost"));
    setContent("");
  };

  return (
    <Container className={classes.container}>
      <Container maxWidth="sm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Paper variant="outlined">
            <Field
              className={classes.textField}
              rowsMax={20}
              fullWidth
              name="content"
              component={renderTextField}
              onChange={onChange}
            />
          </Paper>
          <Button
            className={classes.button}
            onClick={() => {
              setContent("");
              dispatch(reset("newPost"));
            }}
            style={{ marginRight: "12px" }}
            disabled={postContent.trim() === ""}
          >
            Clear
          </Button>
          <ColorButton
            className={classes.button}
            variant="contained"
            onClick={handleSubmit(onSubmit)}
            disabled={postContent.trim() === ""}
          >
            Post
          </ColorButton>
        </form>
      </Container>
    </Container>
  );
}

export default compose(
  connect(null, { createPost }),
  reduxForm({ form: "newPost" })
)(CreatePost);
