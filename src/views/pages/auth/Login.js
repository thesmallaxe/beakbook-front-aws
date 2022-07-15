import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  FormGroup,
  FormControl,
  FormControlLabel,
  Checkbox,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { submitLoginRequest } from "../../../app/actions/AuthActions";
import Alert from "../../components/partials/Alert";

function Login({ loading, success, error, loginUser }) {
  const [values, setValues] = React.useState({
    email: "",
    password: "",
    remember: false,
    showPassword: false,
    errors: { email: "", password: "" },
  });

  const validate = () => {
    const EMAIL_REGEX =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let messages = {};

    messages.email = EMAIL_REGEX.test(values.email)
      ? ""
      : "The user name is not valid!";
    messages.password =
      values.password !== "" ? "" : "The password is required!";

    setValues({ ...values, errors: messages });

    return Object.values(messages).every((x) => x === "");
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleChangeRemember = () => (event) => {
    setValues({
      ...values,
      remember: event.target.checked,
    });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();

    if (validate() && !loading) {
      loginUser(values);
    }
  };

  return (
    <div className="login">
       
      <div className="login__content">
        <p>Please Log In to your Account</p>
        {error?.message && <Alert action="error" message={error.message} />}
        {success?.message && (
          <Alert action="success" message={success.message} />
        )}
        <form onSubmit={handleLoginSubmit}>
          <div className="login__field">
            <FormControl
              variant="outlined"
              margin="normal"
              fullWidth
              error={values.errors.email !== ""}
            >
              <InputLabel htmlFor="outlined-adornment-email">
                User Name
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-email"
                type="text"
                value={values.email}
                onChange={handleChange("email")}
                label="User Name"
              />
              {values.errors.email !== "" && (
                <FormHelperText>{values.errors?.email}</FormHelperText>
              )}
            </FormControl>
          </div>
          <div className="login__field">
            <FormControl
              variant="outlined"
              margin="normal"
              fullWidth
              error={values.errors.password !== ""}
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              {values.errors.password !== "" && (
                <FormHelperText>{values.errors.password}</FormHelperText>
              )}
            </FormControl>
          </div>
          <div className="login__remember">
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    name="remember"
                    value="1"
                    onChange={handleChangeRemember()}
                  />
                }
                label="Remember me"
              />
            </FormGroup>
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
          <button
            className={
              "btn btn--green login__action-btn " +
              (loading ? "btn--loading" : " ")
            }
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    success: state.auth.success,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (user_data) => dispatch(submitLoginRequest(user_data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
