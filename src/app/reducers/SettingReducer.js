import {
  START_LOADING,
  END_LOADING,
  UPDATE_FEEDBACK,
  RESET_ALERT,
  SHOW_ERROR,
  SHOW_SUCCESS,
} from "../constants/types/SettingTypes";

const initialState = {
  loading: false,
  feedback: "",
  success: {},
  error: {},
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

    case UPDATE_FEEDBACK:
      return {
        ...state,
        feedback: action.payload,
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

    default:
      return state;
  }
};

export default UserReducer;
