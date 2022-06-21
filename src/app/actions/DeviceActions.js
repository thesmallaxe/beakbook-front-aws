import {
  END_LOADING,
  START_LOADING,
  FETCHING_DEVICES,
  SHOW_ERROR,
  SHOW_SUCCESS,
  RESET_ALERT,
  RESET_DEVICE_DATA,
  RESET_SEARCH,
  UPDATE_SEARCH,
  UPDATE_DEVICES,
  UPDATE_PAGING,
} from "../constants/types/DeviceTypes";
import { toast } from "react-toastify";
import HttpRequest from "../services/api/HttpRequest";

// Constant variables
const DEVICE_FETCHING_URL = `getDevices`;
const DEVICE_CREATE_URL = `create/device`;

// Action Functions
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

export const updateDevices = (payload) => {
  return {
    type: FETCHING_DEVICES,
    payload: payload,
  };
};

export const updateMoreDevices = (payload) => {
  return {
    type: UPDATE_DEVICES,
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

export const resetDevices = () => {
  return {
    type: RESET_DEVICE_DATA,
  };
};

export const resetSearch = () => {
  return {
    type: RESET_SEARCH,
  };
};

export const setSearch = (payload) => {
  return {
    type: UPDATE_SEARCH,
    payload: payload,
  };
};

export const setCurrentPage = (payload) => {
  return {
    type: UPDATE_PAGING,
    payload: payload,
  };
};

export const searchDevices = (company_id = null, text = null, page = null) => {
  return (dispatch) => {
    // Initiate a request
    const request = new HttpRequest();

    // Starting laoding screen
    dispatch(startLoading());

    // Clear search data
    dispatch(resetSearch());

    // Clear search data
    dispatch(resetDevices());

    // Setting search
    dispatch(setSearch(text));

    let url = DEVICE_FETCHING_URL + `?companyId=${company_id}`;
    url += text !== null ? `&searchText=${text}` : "";
    url += page !== null ? `&page=${page}` : "&page=1";

    request
      .get(url)
      .then((res) => {
        //Set current page
        dispatch(setCurrentPage(page));

        // Set response to state
        dispatch(updateDevices(res));
      })
      .catch((error) => {
        // Error log
        if (error.json) {
          error.json().then((errorMessage) => {
            toast.error(errorMessage.message);
          });
        } else {
          // Error log
          toast.error("Something wen't wrong, Please try again later!");
        }
      })
      .finally(() => {
        // Ending laoding screen
        dispatch(stopLoading());
      });
  };
};

export const createDevice = (obj) => {
  return (dispatch) => {
    // Initiate a request
    const request = new HttpRequest();

    // Starting laoding screen
    dispatch(startLoading());

    // Emplty notification
    dispatch(resetAlerts());

    request
      .post(DEVICE_CREATE_URL, obj)
      .then((res) => {
        // Clear search data
        dispatch(resetSearch());
        //Clear barn data
        dispatch(resetDevices());
        // Set response to state
        dispatch(searchDevices(null));
        // Log Success
        dispatch(logSuccess(res));
      })
      .catch((error) => {
        // Error log
        if (error.json) {
          error.json().then((errorMessage) => {
            dispatch(logError(errorMessage));
          });
        } else {
          // Error log
          dispatch(logError("Something wen't wrong, Please try again later!"));
        }
      })
      .finally(() => {
        // Ending laoding screen
        dispatch(stopLoading());
      });
  };
};
