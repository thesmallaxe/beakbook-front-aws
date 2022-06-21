import React from "react";
import { connect } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { submitResetPassword } from "../../../app/actions/AuthActions";
import Alert from "../../components/partials/Alert";

function ResetPassword({ loading, error, reset_password, submitReset }) {
  const { token } = useParams();
  const [values, setValues] = React.useState({
    token: token,
    password: "",
    password_confirmation: "",
    showPassword: false,
    showConfirmPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = (prop) => (event) => {
    let key = [prop];
    setValues({
      ...values,
      [prop]: !values[key],
    });
  };

  const handleResetSubmit = (event) => {
    event.preventDefault();

    submitReset(values);
  };

  return (
    <div className="login login--reset">
      <Link to="/" className="auth__logo">
        <img src="/assets/img/logo.svg" alt="Logo" />
      </Link>
      <div className="login__content">
        <p>Reset Password</p>
        {error?.message && <Alert action="error" message={error.message} />}
        {reset_password?.message && <Navigate to="/login" />}
        <form onSubmit={handleResetSubmit}>
          <div className="login__field">
            <FormControl variant="outlined" margin="normal" fullWidth required>
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
                      onClick={handleClickShowPassword("showPassword")}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </div>
          <div className="login__field">
            <FormControl variant="outlined" margin="normal" fullWidth required>
              <InputLabel htmlFor="outlined-adornment-confirm_password">
                Retype Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-confirm_password"
                type={values.showConfirmPassword ? "text" : "password"}
                value={values.confirm_password}
                onChange={handleChange("password_confirmation")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword("showConfirmPassword")}
                      edge="end"
                    >
                      {values.showConfirmPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </div>
          <button
            className={
              "btn btn--green login__action-btn " +
              (loading ? "btn--loading" : " ")
            }
          >
            Reset Password
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
    reset_password: state.auth.forgot_password,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitReset: (email) => dispatch(submitResetPassword(email)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
