import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import InputLabel from "@mui/material/InputLabel";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import { FormHelperText } from "@mui/material";
import { useEffect } from "react";

export const ChangePasswordForm = (props) => {
  const { user, loading, updatePassword, success } = props;

  const [state, setState] = useState({
    old_password: "",
    new_password: "",
    new_password_confirmation: "",
    errors: {
      old_password: "",
      new_password: "",
      new_password_confirmation: "",
    },
  });

  const [show, setShow] = useState({
    old_password: false,
    new_password: false,
    new_password_confirmation: false,
  });

  const validateForm = () => {
    let messages = {};

    messages.old_password =
      state.old_password !== "" ? "" : "The current password is required!";
    messages.new_password =
      state.new_password !== "" ? "" : "The new password is required!";
    messages.new_password_confirmation =
      state.new_password_confirmation !== ""
        ? ""
        : "The confirm password is required!";

    if (state.new_password !== state.new_password_confirmation) {
      messages.new_password_confirmation = "The password does not match!";
    }

    setState({ ...state, errors: messages });

    return Object.values(messages).every((x) => x === "");
  };

  const handleChange = (prop) => (event) => {
    setState({
      ...state,
      [prop]: event.target.value,
    });
  };

  const handleShowPassword = (prop) => (event) => {
    let key = [prop];
    setShow({
      ...show,
      [prop]: !show[key],
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm() && !loading) {
      updatePassword(state);
    }
  };

  useEffect(() => {
    setState((state) => ({
      ...state,
      old_password: "",
      new_password: "",
      new_password_confirmation: "",
    }));
  }, [success]);

  return (
    <form
      onSubmit={handleSubmit}
      className="settings__change-password__field-wrapper"
    >
      <FormControl variant="outlined">
        <TextField
          id="userName"
          label="User Name"
          defaultValue={user.email}
          InputProps={{
            readOnly: true,
          }}
        />
      </FormControl>
      <FormControl variant="outlined" error={state.errors.old_password !== ""}>
        <InputLabel htmlFor="outlined-old-password">Old Password</InputLabel>
        <OutlinedInput
          id="outlined-old-password"
          type={show.old_password ? "text" : "password"}
          onChange={handleChange("old_password")}
          value={state.old_password}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={handleShowPassword("old_password")}
                aria-label="toggle password visibility"
                edge="end"
              >
                {!show.old_password ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Old Password"
        />
        {state.errors.old_password !== "" && (
          <FormHelperText>{state.errors?.old_password}</FormHelperText>
        )}
      </FormControl>
      <FormControl variant="outlined" error={state.errors.new_password !== ""}>
        <InputLabel htmlFor="outlined-new-password">New Password</InputLabel>
        <OutlinedInput
          id="outlined-new-password"
          type={show.new_password ? "text" : "password"}
          onChange={handleChange("new_password")}
          value={state.new_password}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={handleShowPassword("new_password")}
                aria-label="toggle password visibility"
                edge="end"
              >
                {!show.new_password ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="New Password"
        />
        {state.errors.new_password !== "" && (
          <FormHelperText>{state.errors?.new_password}</FormHelperText>
        )}
      </FormControl>
      <FormControl
        variant="outlined"
        error={state.errors.new_password_confirmation !== ""}
      >
        <InputLabel htmlFor="outlined-confirm-password">
          Confirm Password
        </InputLabel>
        <OutlinedInput
          id="outlined-confirm-password"
          type={show.new_password_confirmation ? "text" : "password"}
          onChange={handleChange("new_password_confirmation")}
          value={state.new_password_confirmation}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={handleShowPassword("new_password_confirmation")}
                aria-label="toggle password visibility"
                edge="end"
              >
                {!show.new_password_confirmation ? (
                  <VisibilityOff />
                ) : (
                  <Visibility />
                )}
              </IconButton>
            </InputAdornment>
          }
          label="Confirm Password"
        />
        {state.errors.new_password_confirmation !== "" && (
          <FormHelperText>
            {state.errors?.new_password_confirmation}
          </FormHelperText>
        )}
      </FormControl>
      <Button
        type="submit"
        variant="contained"
        className={loading ? "btn--loading" : " "}
      >
        Change Password
      </Button>
    </form>
  );
};
