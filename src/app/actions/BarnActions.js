import {
  END_LOADING,
  START_LOADING,
  FETCHING_BARNS,
  SHOW_DOWNLOAD_POPUP,
  HIDE_DOWNLOAD_POPUP,
  GET_DOWNLOAD_URL,
  SHOW_ERROR,
  SHOW_SUCCESS,
  RESET_ALERT,
  RESET_BARN_DATA,
  RESET_SEARCH,
  UPDATE_SEARCH,
  UPDATE_BARNS,
  UPDATE_PAGING,
} from "../constants/types/BarnTypes";
import HttpRequest from "../services/api/HttpRequest";
import { downloadFile } from "../services/Helper";
import { toast } from "react-toastify";
import { createToast, toastError, toastSuccess } from "../services/ToastHelper";

// Constant variables
const BARN_FETCHING_URL = `getBarns`;
const BARN_DWONLOAD_URL = `dashboard/download`;
const BARN_CREATE_URL = `create/barn`;
const BARN_RENAME_URL = `update/barn`;
const ERROR_MESSAGE = "Something wen't wrong, Please try again later!";

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

export const updateBarns = (payload) => {
  return {
    type: FETCHING_BARNS,
    payload: payload,
  };
};

export const updateMoreBarns = (payload) => {
  return {
    type: UPDATE_BARNS,
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

export const resetBarns = () => {
  return {
    type: RESET_BARN_DATA,
  };
};

export const resetSearch = () => {
  return {
    type: RESET_SEARCH,
  };
};

export const showDownloadPopup = (payload) => {
  return {
    type: SHOW_DOWNLOAD_POPUP,
    payload: payload,
  };
};

export const hideDwnloadPopup = () => {
  return {
    type: HIDE_DOWNLOAD_POPUP,
  };
};

export const getDownload = (payload) => {
  return {
    type: GET_DOWNLOAD_URL,
    payload: payload,
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

export const searchBarns = (farm_id = null, text = null, page = null) => {
  return (dispatch) => {
    const request = new HttpRequest();

    // Starting laoding screen
    dispatch(startLoading());

    // Clear search data
    dispatch(resetSearch());

    // Clear search data
    dispatch(resetBarns());

    // Setting search
    dispatch(setSearch(text));

    //Set current page
    dispatch(setCurrentPage(page));

    let url = BARN_FETCHING_URL + "?farmId=" + farm_id;
    url += text !== null ? `&searchText=${text}` : "";
    url += page !== null ? `&page=${page}` : "&page=1";

    request
      .get(url)
      .then((res) => {
        // Set response to state
        dispatch(updateBarns(res));
      })
      .catch((error) => {
        // Error log
        if (error.json) {
          error.json().then((errorMessage) => {
            toast.error(errorMessage.message);
          });
        } else {
          // Error log
          toast.error(ERROR_MESSAGE);
        }
      })
      .finally(() => {
        // Ending laoding screen
        dispatch(stopLoading());
      });
  };
};

export const loadMoreBarns = (text = null, page = null) => {
  return (dispatch) => {
    const request = new HttpRequest();

    const searchText = text !== null ? `?searchText=${text}` : null;
    const url =
      searchText !== null && page !== null
        ? searchText + `&page=${page}`
        : `?page=${page}`;

    //Clear barn data
    dispatch(resetBarns());

    // Starting laoding screen
    dispatch(startLoading());

    request
      .get(BARN_FETCHING_URL + url)
      .then((res) => {
        //Set current page
        dispatch(setCurrentPage(page));
        // Set response to state
        dispatch(updateBarns(res));
      })
      .catch((error) => {
        // Error log
        if (error.json) {
          error.json().then((errorMessage) => {
            toast.error(errorMessage.message);
          });
        } else {
          // Error log
          toast.error(ERROR_MESSAGE);
        }
      })
      .finally(() => {
        // Ending laoding screen
        dispatch(stopLoading());
      });
  };
};

export const createBarn = (obj) => {
  return (dispatch) => {
    const request = new HttpRequest();

    const id = createToast();

    request
      .post(BARN_CREATE_URL, obj)
      .then((res) => {
        //Clear barn data
        dispatch(resetBarns());
        // Set response to state
        dispatch(searchBarns(obj.farm_id, null));
        // Log Success
        toastSuccess(id, res);
      })
      .catch((error) => {
        // Error log
        toastError(id, error);
      });
  };
};

export const triggerDownload = (obj) => {
  return (dispatch) => {
    const request = new HttpRequest();

    request.post(BARN_DWONLOAD_URL, obj).then((res) => {
      if (res.status) {
        downloadFile(res.data.url);
        dispatch(hideDwnloadPopup());
      } else {
        console.error("Failed", res);
      }
    });
  };
};

export const renameBarnAction = (obj) => {
  return (dispatch) => {
    const request = new HttpRequest();

    // Starting laoding screen
    const id = createToast();

    request
      .post(BARN_RENAME_URL, obj)
      .then((res) => {
        // Set response to state
        toastSuccess(id, res);

        // Set response to state
        dispatch(searchBarns(obj.farm_id, null));
      })
      .catch((error) => {
        // Error log
        toastError(id, error);
      });
  };
};
