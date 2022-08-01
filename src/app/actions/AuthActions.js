import {
  AUTHENTICATE_USER,
  END_LOADING,
  FORGOT_USER,
  LOGOUT_USER,
  RESET_ALERT,
  SHOW_ERROR,
  SHOW_SUCCESS,
  START_LOADING,
} from "../constants/types/AuthTypes";
import HttpRequest from "../services/api/HttpRequest";
import {
  createToast,
  notifyError,
  notifySuccess,
  toastError,
  toastSuccess,
} from "../services/ToastHelper";
import { initPermissions } from "../slices/PermssionSlice";

// Constant variables
const LOGIN_URL = `login`;
const LOGOUT_URL = `logout`;
const FORGOT_URL = `forgot-password`;
const RESET_URL = `reset-password`;
const UPDATE_PASSWORD_URL = `change-password`;

// Messages
const ERROR_MESSAGE = "Something wen't wrong, Please try again later!";

// Didpatching Methods
export const startLoading = () => {
  return {
    type: START_LOADING,
  };
};

export const stopLoading = () => {
  return {
    type: END_LOADING,
  };
};

export const authenticateUser = (payload) => {
  return {
    type: AUTHENTICATE_USER,
    payload: payload,
  };
};

export const updateUserForgot = (payload) => {
  return {
    type: FORGOT_USER,
    payload: payload,
  };
};

export const logError = (payload) => {
  return {
    type: SHOW_ERROR,
    payload: payload,
  };
};

export const logSuccess = (payload) => {
  return {
    type: SHOW_SUCCESS,
    payload: payload,
  };
};

export const resetAlerts = () => {
  return {
    type: RESET_ALERT,
  };
};

export const submitLoginRequest = (user_data = {}) => {
  return (dispatch) => {
    // Initiate a request
    const request = new HttpRequest();

    // Starting laoding screen
    dispatch(startLoading());

    // Emplty notification
    dispatch(resetAlerts());

    request
      .post(LOGIN_URL, user_data)
      .then((res) => {
        if (user_data.remember) {
          localStorage.setItem("remember_me", true);
          localStorage.setItem("user_data", JSON.stringify(res.user_details));
          localStorage.setItem("farm_data", JSON.stringify(res.farm_details));
          localStorage.setItem("token", JSON.stringify(res.access_token));
        } else {
          sessionStorage.setItem("token", JSON.stringify(res.access_token));
          sessionStorage.setItem("user_data", JSON.stringify(res.user_details));
          sessionStorage.setItem("farm_data", JSON.stringify(res.farm_details));
        }

        // Login user with user object
        dispatch(authenticateUser(res));

        sessionStorage.removeItem("permissions");
        sessionStorage.setItem("permissions", JSON.stringify(res.permissions));

        // Init the permissions
        dispatch(initPermissions(res));
      })
      .catch((error) => {
        // Error log
        if (error.json) {
          error.json().then((errorMessage) => {
            dispatch(logError(errorMessage));
          });
        } else {
          // Error log
          dispatch(logError(ERROR_MESSAGE));
        }
      })
      .finally(() => {
        // Ending laoding screen
        dispatch(stopLoading());

        setTimeout(() => {
          dispatch(resetAlerts());
        }, 2000);
      });
  };
};

export const submitForgotPassword = (data) => {
  return (dispatch) => {
    // Initiate a request
    const request = new HttpRequest();

    // Starting laoding screen
    dispatch(startLoading());

    // Emplty error notification
    dispatch(resetAlerts());

    request
      .post(FORGOT_URL, data)
      .then((res) => {
        // Show success message
        dispatch(logSuccess(res));

        // Forgot Password user with user email
        let response = { ...res, email: data.email };
        dispatch(updateUserForgot(response));
      })
      .catch((error) => {
        // Error log
        if (error.json) {
          error.json().then((errorMessage) => {
            dispatch(logError(errorMessage));
          });
        } else {
          // Error log
          dispatch(logError(ERROR_MESSAGE));
        }
      })
      .finally(() => {
        // Ending laoding screen
        dispatch(stopLoading());

        setTimeout(() => {
          dispatch(resetAlerts());
        }, 2000);
      });
  };
};

export const submitResetPassword = (data) => {
  return (dispatch) => {
    // Initiate a request
    const request = new HttpRequest();

    // Starting laoding screen
    dispatch(startLoading());

    // Emplty error notification
    dispatch(resetAlerts());

    request
      .post(RESET_URL, data)
      .then((res) => {
        // Show success message
        dispatch(logSuccess(res));

        let response = { ...res, email: data.email };
        // Forgot Password user with user email
        dispatch(updateUserForgot(response));
      })
      .catch((error) => {
        // Error log
        if (error.json) {
          error.json().then((errorMessage) => {
            dispatch(logError(errorMessage));
          });
        } else {
          // Error log
          dispatch(logError(ERROR_MESSAGE));
        }
      })
      .finally(() => {
        // Ending laoding screen
        dispatch(stopLoading());

        setTimeout(() => {
          dispatch(resetAlerts());
        }, 2000);
      });
  };
};

export const submitUpdatePassword = (data) => {
  return (dispatch) => {
    // Initiate a request
    const request = new HttpRequest();

    const id = createToast();

    // Starting laoding screen
    dispatch(startLoading());

    request
      .post(UPDATE_PASSWORD_URL, data)
      .then((res) => {
        dispatch(logSuccess(res));
        // Show success message
        toastSuccess(id, res);
      })
      .catch((error) => {
        // Error log
        toastError(id, error);
      })
      .finally(() => {
        // Ending laoding screen
        dispatch(stopLoading());

        dispatch(resetAlerts());
      });
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
  };
};

export const logout = () => {
  return (dispatch) => {
    // Initiate a request
    const request = new HttpRequest();

    request
      .post(LOGOUT_URL)
      .then((res) => {
        // Display notification
        notifySuccess(res?.message);
      })
      .catch((error) => {
        // Error log
        notifyError(error?.message);                         
      })
      .finally(() => {
        // Clear Storage
        localStorage.clear();
        sessionStorage.clear();

        // Logout session
        dispatch(logoutUser());
      });
  };
};
