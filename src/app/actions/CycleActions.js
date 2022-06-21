import {
  SHOW_CYCLE_OPEN,
  SHOW_CYCLE_CLOSE,
} from "../constants/types/CycleTypes";
import HttpRequest from "../services/api/HttpRequest";
import { createToast, toastError, toastSuccess } from "../services/ToastHelper";

// Constant variables
const NEW_CYCLE_ENDPOINT = ``;

// Cycle Actions
export const showCyclePopup = () => {
  return {
    type: SHOW_CYCLE_OPEN,
  };
};

export const hideCyclePopup = () => {
  return {
    type: SHOW_CYCLE_CLOSE,
  };
};

export const createCycleSubmit = (obj) => {
  return (dispatch) => {
    const request = new HttpRequest();

    const id = createToast();

    request
      .post(NEW_CYCLE_ENDPOINT, obj)
      .then((res) => {
        // Log Success
        toastSuccess(id, res);
      })
      .catch((error) => {
        // Error log
        toastError(id, error);
      });
  };
};
