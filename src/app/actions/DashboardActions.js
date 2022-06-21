import {
  END_LOADING,
  START_LOADING,
  FETCHING_FAV_BARNS,
} from "../constants/types/DashboardTypes";
import HttpRequest from "../services/api/HttpRequest";
import { toast } from "react-toastify";

const DASHBOARD_API_ENDPOINT = "dashboard/favourites";

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

export const updateDashboardData = (payload) => {
  return {
    type: FETCHING_FAV_BARNS,
    payload: payload,
  };
};

export const fetchDashboardData = () => {
  return (dispatch) => {
    dispatch(startLoading());

    // Initiate a request
    const request = new HttpRequest();

    request
      .get(DASHBOARD_API_ENDPOINT)
      .then((res) => {
        // Ending laoding screen
        dispatch(stopLoading());

        if (res.status) {
          dispatch(updateDashboardData(res));
        } else {
          console.error("Failed", res);
        }
      })
      .catch((error) => {
        // Error log
        console.error(error);

        if (error.json) {
          error.json().then((errorMessage) => {
            toast.error(errorMessage.message);
          });
        } else {
          // Error log
          toast.error("Something wen't wrong, Please try again later!");
        }
      });
  };
};
