import {
  END_LOADING,
  START_LOADING,
  FETCHING_SINGLE_BARN,
  EDIT_BARN_OVERVIEW,
  EDIT_CYCLE_DETAILS,
  HANDLE_AVERAGE_WEIGHT,
  UPDATE_AVERAGE_WEIGHT,
  SHOW_DOWNLOAD_POPUP,
  HIDE_DOWNLOAD_POPUP,
  GET_DOWNLOAD_URL,
  FETCHING_SINGLE_GRAPH,
  RESET_SINGLE_GRAPH,
} from "../constants/types/BarnDetailTypes";
import HttpRequest from "../services/api/HttpRequest";
import { downloadFile } from "../services/Helper";

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

export const editBarnOverview = () => {
  return {
    type: EDIT_BARN_OVERVIEW,
  };
};

export const editCycleDetails = () => {
  return {
    type: EDIT_CYCLE_DETAILS,
  };
};

export const updateSingleBarnDetails = (payload) => {
  return {
    type: FETCHING_SINGLE_BARN,
    payload: payload,
  };
};

export const updateSingleGraph = (payload) => {
  return {
    type: FETCHING_SINGLE_GRAPH,
    payload: payload,
  };
};

export const resetSingleGraph = (payload) => {
  return {
    type: RESET_SINGLE_GRAPH,
  };
};

export const handleAverageWeight = (payload) => {
  return {
    type: HANDLE_AVERAGE_WEIGHT,
    payload: payload,
  };
};

export const updateAverageWeight = (payload) => {
  return {
    type: UPDATE_AVERAGE_WEIGHT,
    payload: payload,
  };
};

export const getSingleBarnDetails = (id = null, cycle_id = null) => {
  return (dispatch) => {
    const request = new HttpRequest();

    dispatch(startLoading());

    dispatch(updateSingleBarnDetails({}));

    dispatch(resetSingleGraph());

    request.get(`dashboard/?barnId=${id}&cycleId=${cycle_id}`).then((res) => {
      dispatch(stopLoading());

      if (res.status) {
        dispatch(updateSingleBarnDetails(res));
      } else {
        console.error("Failed", res);
      }
    });
  };
};

export const getSingleBarnDetailsGraphs = (
  id = null,
  cycle_id = null,
  grapgh_name = null
) => {
  return (dispatch) => {
    const request = new HttpRequest();

    request
      .get(
        `dashboard/graphs/?barnId=${id}&cycleId=${cycle_id}&graphName=${grapgh_name}`
      )
      .then((res) => {
        if (res.status) {
          dispatch(updateSingleGraph(res));
        } else {
          console.error("Failed", res);
        }
      });
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

export const triggerDownload = (obj) => {
  return (dispatch) => {
    const request = new HttpRequest();

    request.post(`dashboard/download`, obj).then((res) => {
      if (res.status) {
        downloadFile(res.data.url);
        dispatch(hideDwnloadPopup());
      } else {
        console.error("Failed", res);
      }
    });
  };
};
