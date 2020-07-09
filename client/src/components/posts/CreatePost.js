import React, { useState } from "react";
import { Field, reduxForm, reset } from "redux-form";
import { compose } from "redux";
import { connect, useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { createPost } from "../../actions";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import AvatarIcon from "@material-ui/core/Avatar";
import withWidth from "@material-ui/core/withWidth";
import CreateIcon from "@material-ui/icons/Create";
import Hidden from "@material-ui/core/Hidden";

const MAX_POST_LEN = 2000;

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "0px",
    marginBottom: theme.spacing(3),
  },
  formContainer: {
    textAlign: "right",
    padding: 0,
  },
  inputAndIconContainer: {
    padding: 0,
    textAlign: "left",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    marginTop: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(1),
    flexGrow: 2,
  },
}));

// Field renderer so Material-UI works with Redux Form
const renderTextField = ({ input, meta: { touched, invalid }, ...custom }) => (
  <InputBase
    multiline
    autoComplete="new-password"
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
    <Container className={classes.container} maxWidth="sm">
      <Container className={classes.formContainer} maxWidth="sm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Container className={classes.inputAndIconContainer} maxWidth="sm">
            <Hidden smDown>
              <CreateIcon
                style={{ color: "grey", marginRight: "16px" }}
                fontSize="large"
              />
            </Hidden>
            <Paper className={classes.paper} variant="outlined">
              <Field
                rowsMax={20}
                fullWidth
                name="content"
                component={renderTextField}
                inputProps={{
                  maxLength: MAX_POST_LEN,
                }}
                onChange={onChange}
              />
            </Paper>
          </Container>
          <Button
            className={classes.button}
            size="large"
            onClick={() => {
              setContent("");
              dispatch(reset("newPost"));
            }}
            style={{ marginRight: "12px" }}
            disabled={postContent.trim() === ""}
          >
            Clear
          </Button>
          <Button
            className={classes.button}
            size="large"
            color="primary"
            variant="contained"
            onClick={handleSubmit(onSubmit)}
            disabled={postContent.trim() === ""}
          >
            Post
          </Button>
        </form>
      </Container>
    </Container>
  );
}

CreatePost.propTypes = {
  width: PropTypes.oneOf(["lg", "md", "sm", "xl", "xs"]).isRequired,
};

export default compose(
  withWidth(),
  connect(null, { createPost }),
  reduxForm({ form: "newPost" })
)(CreatePost);
