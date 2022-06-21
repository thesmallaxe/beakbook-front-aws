import { startLoading, stopLoading } from "./BarnActions";
import { toast } from "react-toastify";
import HttpRequest from "../services/api/HttpRequest";

export const BARN_FAVOURITE_URL = `create/favorite/barn`;
export const BARN_FAVOURITE_REMOVE_URL = `remove/favorite/barn`;


export const addToFavourite = (obj) => {
  return (dispatch) => {
    // Initiate a request
    const request = new HttpRequest();

    // Starting laoding screen
    dispatch(startLoading());

    request
      .post(BARN_FAVOURITE_URL, obj)
      .then((res) => {
        // Set response to state
        toast.success(res.message);
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

export const removeFromFavourite = (obj) => {
  return (dispatch) => {
    // Initiate a request
    const request = new HttpRequest();

    // Starting laoding screen
    dispatch(startLoading());

    request
      .post(BARN_FAVOURITE_REMOVE_URL, obj)
      .then((res) => {
        // Set response to state
        toast.success(res.message);
      })
      .catch((error) => {
        // Error log
        if (error.json) {
          error.json().then((errorMessage) => {
            toast.error(errorMessage.message);
          });
        } else {
          // Error log
          dispatch(
            toast.error("Something wen't wrong, Please try again later!")
          );
        }
      })
      .finally(() => {
        // Ending laoding screen
        dispatch(stopLoading());
      });
  };
};
