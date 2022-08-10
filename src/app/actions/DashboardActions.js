import {
  END_LOADING,
  START_LOADING,
  FETCHING_FAV_BARNS,
} from "../constants/types/DashboardTypes";
import { toast } from "react-toastify";
import axios from "../hooks/axios";

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
    axios
      .get(DASHBOARD_API_ENDPOINT)
      .then((res) => {
        // Ending laoding screen
        dispatch(stopLoading());

        if (res.data.status) {
          dispatch(updateDashboardData(res.data));
        } else {
          console.error("Failed", res.data);
        }
      })
      .catch((error) => {
        // Error log
        console.log(error);

        if (error.response?.data) {
          toast.error(error.response?.data.message);
        } else {
          // Error log
          toast.error("Something wen't wrong, Please try again later!");
        }
      });
  };
};
