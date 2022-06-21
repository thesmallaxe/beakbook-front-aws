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

let remember = localStorage.getItem("remember_me") ?? false;
let token =
  remember && localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : JSON.parse(sessionStorage.getItem("token")) ?? null;
let user =
  remember && localStorage.getItem("user_data")
    ? JSON.parse(localStorage.getItem("user_data"))
    : JSON.parse(sessionStorage.getItem("user_data")) ?? {};
let farm_details =
  remember && localStorage.getItem("farm_data")
    ? JSON.parse(localStorage.getItem("farm_data"))
    : JSON.parse(sessionStorage.getItem("farm_data")) ?? {};
let is_logged = token !== null;

const initialState = {
  loading: false,
  access_token: token,
  farm_details: farm_details,
  remember: remember,
  user: user,
  error: {},
  success: {},
  is_logged: is_logged,
  forgot_password: {
    token: null,
    email: null,
  },
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        loading: true,
      };

    case END_LOADING:
      return {
        ...state,
        loading: false,
      };

    case AUTHENTICATE_USER:
      return {
        ...state,
        user: action.payload.user_details,
        farm_details: action.payload.farm_details,
        access_token: action.payload.access_token,
        is_logged: true,
        error: {},
      };

    case SHOW_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case SHOW_SUCCESS:
      return {
        ...state,
        success: action.payload,
      };

    case RESET_ALERT:
      return {
        ...state,
        error: {},
        success: {},
      };

    case LOGOUT_USER:
      return {
        ...state,
        user: {},
        access_token: null,
        is_logged: false,
        remember: false,
      };

    case FORGOT_USER:
      return {
        ...state,
        forgot_password: {
          ...state.forgot_password,
          ...action.payload,
        },
      };

    default:
      return state;
  }
};

export default UserReducer;
