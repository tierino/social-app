import React, { useEffect } from "react";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import { connect, useDispatch } from "react-redux";

import * as actions from "../../actions";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const MAX_UN_LEN = 20;
const MIN_PW_LEN = 8;
const MAX_PW_LEN = 100;

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  textField: {
    "&:-webkit-autofill": {
      WebkitBoxShadow: "0 0 0px 1000px black inset !important",
    },
  },
}));

// Field renderer so Material-UI works with Redux Form
const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    label={label}
    fullWidth
    variant="filled"
    margin="normal"
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
);

function Signin(props) {
  const dispatch = useDispatch();
  const { handleSubmit } = props;
  const classes = useStyles();

  // Clears error message when component mounts
  useEffect(() => {
    dispatch(props.clearError());
  }, []);

  const onSubmit = (formProps) => {
    formProps.username = formProps.username.trim();
    formProps.password = formProps.password.trim();

    // Callback navigates user to '/home' path when they sign in
    props.signin(formProps, () => {
      // The 'history' prop comes from Redux Router
      props.history.push("/home");
    });
  };

  return (
    // Destructure handleSubmit from props object (provided by reduxForm)
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h4">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Field
            className={classes.textField}
            name="username"
            component={renderTextField}
            label="Username"
            autoComplete="off"
            inputProps={{
              maxLength: MAX_UN_LEN,
            }}
            autoFocus
            required
          />
          <Field
            className={classes.textField}
            name="password"
            component={renderTextField}
            label="Password"
            type="password"
            inputProps={{
              minLength: MIN_PW_LEN,
              maxLength: MAX_PW_LEN,
            }}
            required
          />
          <Typography variant="subtitle1" style={{ color: "red" }}>
            {props.errorMessage}
          </Typography>
          <Typography variant="subtitle1">
            Don't have an account? Create one{" "}
            <Link href="/signup" style={{ color: "#4791db" }}>
              here
            </Link>
            .
          </Typography>
          <Button type="submit" className={classes.submit} variant="contained">
            Sign in
          </Button>
        </form>
      </div>
    </Container>
  );
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage };
}

// compose() just allows us to apply multiple HOCs to a single component with better syntax
export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: "signin" })
)(Signin);
