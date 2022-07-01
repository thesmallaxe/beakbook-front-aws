import {
  SHOW_CYCLE_OPEN,
  SHOW_CYCLE_CLOSE,
  SHOW_MORTALITY_OPEN,
  SHOW_MORTALITY_CLOSE,
  SHOW_SUCCESS,
  SHOW_ERROR,
  UPDATE_MORTALITY,
} from "../constants/types/CycleTypes";
import HttpRequest from "../services/api/HttpRequest";
import {
  createToast,
  notifyError,
  toastError,
  toastSuccess,
} from "../services/ToastHelper";

// Constant variables
const NEW_CYCLE_ENDPOINT = `create-cycle`;
const NEW_MORTALITY_ENDPOINT = `add-mortality-statistics`;
const CHECK_MORTALITY_ENDPOINT = `get-mortality-count`;

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

export const showMortalityPopup = () => {
  return {
    type: SHOW_MORTALITY_OPEN,
  };
};

export const hideMortalityPopup = () => {
  return {
    type: SHOW_MORTALITY_CLOSE,
  };
};

export const logSuccess = (obj) => {
  return {
    type: SHOW_SUCCESS,
    payload: obj,
  };
};

export const logError = (obj) => {
  return {
    type: SHOW_ERROR,
    payload: obj,
  };
};

export const resetLog = () => {
  return (dispatch) => {
    dispatch(logSuccess({}));
    dispatch(logError({}));
  };
};

export const createCycleSubmit = (obj) => {
  return (dispatch) => {
    const request = new HttpRequest();

    const id = createToast();

    dispatch(resetLog());

    request
      .post(NEW_CYCLE_ENDPOINT, obj)
      .then((res) => {
        // Log Success
        toastSuccess(id, res);
        dispatch(logSuccess(res));
      })
      .catch((error) => {
        // Error log
        toastError(id, error);
      });
  };
};

export const resetMortality = () => {
  return {
    type: UPDATE_MORTALITY,
    payload: {
      date: "",
      mortality_number: "",
      selected_date: null,
    },
  };
};

export const updateMortality = (obj) => {
  return {
    type: UPDATE_MORTALITY,
    payload: obj,
  };
};

export const createMortalitySubmit = (obj) => {
  return (dispatch) => {
    // Update Motality
    dispatch(updateMortality(obj));

    const id = createToast();
    const request = new HttpRequest();

    request
      .post(NEW_MORTALITY_ENDPOINT, obj)
      .then((res) => {
        // Log Success
        toastSuccess(id, res);
        // Reset Mortality array
        dispatch(resetMortality());
        // Close popup
        dispatch(hideMortalityPopup());
      })
      .catch((error) => {
        // Error log
        toastError(id, error);
      });
  };
};

export const checkMortalityCount = (obj) => {
  return (dispatch) => {
    const request = new HttpRequest();

    const url = `?barn_id=${obj.barn_id}&cycle_id=${obj.cycle_id}&date=${obj.date}`;

    request
      .get(CHECK_MORTALITY_ENDPOINT + url)
      .then((res) => {
        // Log Success
        const state = { ...obj, mortality_number: res.mortality_count ?? 0 };
        dispatch(updateMortality(state));
      })
      .catch((error) => {
        // Error log
        notifyError(error.message);
      });
  };
};
