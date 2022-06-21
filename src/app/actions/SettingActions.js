import {
  START_LOADING,
  END_LOADING,
  RESET_ALERT,
  SHOW_ERROR,
  SHOW_SUCCESS,
} from "../constants/types/SettingTypes";
import HttpRequest from "../services/api/HttpRequest";
import { toastSuccess, toastError, createToast } from "../services/ToastHelper";

// Constant variables
const FEEDBACK_URL = `send-feedback`;

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

export const submitFeedbackRequest = (data = {}) => {
  return (dispatch) => {
    const request = new HttpRequest();

    dispatch(startLoading());

    // Starting laoding screen
    const id = createToast();

    request
      .post(FEEDBACK_URL, data)
      .then((res) => {
        // Set response to state
        dispatch(logSuccess(res));
        // Set response to state
        toastSuccess(id, res);
      })
      .catch((error) => {
        // Error log
        toastError(id, error);
      })
      .finally(() => {
        dispatch(stopLoading());

        dispatch(resetAlerts());
      });
  };
};
