import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FormControl, InputLabel, OutlinedInput } from "@mui/material";

import { submitForgotPassword } from "../../../app/actions/AuthActions";
import Alert from "../../components/partials/Alert";

function ForgotPassword({
  loading,
  success,
  error,
  forgot_password,
  submitForgot,
}) {
  const [values, setValues] = React.useState({
    email: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleForgotSubmit = (event) => {
    event.preventDefault();

    if (!loading) {
      submitForgot(values);
    }
  };

  return (
    <div className="login login--forget">
      {/* <Link to="/" className="auth__logo">
        <img src="/assets/img/logo.svg" alt="Logo" />
      </Link> */}
      <div className="login__content">
        <Link to="/login" className="login__back">
          <i className="icon icon-arrow-left"></i> <abbr>Back to Login</abbr>
        </Link>
        <p>Forgot Password</p>
        {error?.message && <Alert action="error" message={error.message} />}
        {success?.message && (
          <Alert action="success" message={success.message} />
        )}
        <form onSubmit={handleForgotSubmit}>
          <div className="login__field">
            <FormControl variant="outlined" margin="normal" fullWidth required>
              <InputLabel htmlFor="outlined-adornment-email">
                Email Address
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-email"
                type="email"
                value={values.email}
                onChange={handleChange("email")}
                label="User Name"
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
    success: state.auth.success,
    forgot_password: state.auth.forgot_password,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitForgot: (email) => dispatch(submitForgotPassword(email)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
