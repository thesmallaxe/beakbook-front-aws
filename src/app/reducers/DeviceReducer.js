import {
  START_LOADING,
  END_LOADING,
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

const initialState = {
  loading: false,
  error: {},
  success: {},
  all_devices: {},
  results: {},
  search: {
    search: null,
    current_page: 1,
    total_pages: 1,
  },
};

const DeviceReducer = (state = initialState, action) => {
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

    case UPDATE_PAGING:
      return {
        ...state,
        search: {
          ...state.search,
          current_page: action.payload,
        },
      };

    case FETCHING_DEVICES:
      return {
        ...state,
        results: action.payload,
        all_devices: action.payload.data,
        search: {
          ...state.search,
          total_pages: action.payload.meta.last_page,
        },
      };

    case UPDATE_DEVICES:
      return {
        ...state,
        results: action.payload,
        all_devices: [...state.all_devices, ...action.payload.data],
      };

    case RESET_DEVICE_DATA:
      return {
        ...state,
        results: {},
        all_devices: {},
      };

    case RESET_SEARCH:
      return {
        ...state,
        search: {
          search: null,
          current_page: 1,
          total_pages: 1,
        },
      };

    case UPDATE_SEARCH:
      return {
        ...state,
        search: {
          ...state.search,
          search: action.payload,
        },
      };

    default:
      return state;
  }
};

export default DeviceReducer;
