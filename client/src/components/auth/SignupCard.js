import React, { useEffect, useState } from "react";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import { connect, useDispatch } from "react-redux";
import * as actions from "../../actions";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { AUTH_ERROR } from "../../actions/types";

const MAX_UN_LEN = 20;
const MIN_PW_LEN = 8;
const MAX_PW_LEN = 100;

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  image: {
    marginTop: theme.spacing(4),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  textField: {
    "& label.Mui-focused": {
      color: "#4791db",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#4791db",
      },
    },
  },
}));

// Field renderer so Material-UI works with Redux Form
const renderTextField = ({ label, input, ...custom }) => (
  <TextField
    variant="outlined"
    label={label}
    fullWidth
    margin="normal"
    placeholder={label}
    {...input}
    {...custom}
  />
);

const ColorButton = withStyles((theme) => ({
  root: {
    color: "#212121",
    backgroundColor: "#ff8a80",
    "&:hover": {
      backgroundColor: "#ff5252",
    },
  },
}))(Button);

function SignupCard(props) {
  const dispatch = useDispatch();
  const { handleSubmit } = props;
  const classes = useStyles();

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateForm = (formProps) => {
    let valid = true;

    formProps.username = formProps.username.trim();
    formProps.password = formProps.password.trim();

    // Test username for forbidden characters
    if (/[!$%^&*()+|\s~=`\\#{}\[\]:";'<>?,\/]/.test(formProps.username)) {
      valid = false;
      setUsernameError("Username contains forbidden character(s).");
    }

    // Test password for forbidden characters
    if (/[\s]/.test(formProps.password)) {
      valid = false;
      setPasswordError("Password cannot contain spaces.");
    }

    return valid;
  };

  const onSubmit = (formProps) => {
    if (validateForm(formProps)) {
      // Callback navigates user to '/home' path when they sign in
      props.signup(formProps, () => {
        // The 'history' prop comes from Redux Router
        props.history.push("/home");
      });
    }
  };

  // Clears error message when component mounts
  useEffect(() => {
    dispatch(props.clearError());
  }, []);

  return (
    // Destructure handleSubmit from props object (provided by reduxForm)
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h4">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Field
            className={classes.textField}
            name="username"
            component={renderTextField}
            label="Username"
            autoComplete="off"
            helperText={usernameError}
            inputProps={{
              maxLength: MAX_UN_LEN,
            }}
            required
          />
          <Field
            className={classes.textField}
            name="password"
            component={renderTextField}
            label="Password"
            type="password"
            helperText={passwordError}
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
            Already have an account? Sign in{" "}
            <Link href="/signin" style={{ color: "#4791db" }}>
              here
            </Link>
            .
          </Typography>
          <ColorButton
            type="submit"
            className={classes.submit}
            variant="contained"
          >
            Sign up
          </ColorButton>
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
  reduxForm({ form: "signup" })
)(SignupCard);
