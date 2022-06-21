import {
  START_LOADING,
  END_LOADING,
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

const initialState = {
  loading: false,
  error: {},
  success: {},
  all_barns: {},
  results: {},
  search: {
    search: null,
    current_page: 1,
    total_pages: 1,
  },
  download: {
    show: false,
    cycles: {},
    download: {},
  },
};

const BarnReducer = (state = initialState, action) => {
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

    case FETCHING_BARNS:
      return {
        ...state,
        results: action.payload,
        all_barns: action.payload.data,
        search: {
          ...state.search,
          total_pages: action.payload.meta.last_page,
        },
      };

    case UPDATE_BARNS:
      const barns = action.payload.data;
      return {
        ...state,
        results: action.payload,
        all_barns: [...state.all_barns, ...barns],
      };

    case SHOW_DOWNLOAD_POPUP:
      return {
        ...state,
        download: {
          show: true,
          cycles: action.payload,
        },
      };

    case HIDE_DOWNLOAD_POPUP:
      return {
        ...state,
        download: {
          show: false,
        },
      };

    case RESET_BARN_DATA:
      return {
        ...state,
        results: {},
        all_barns: {},
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

    case GET_DOWNLOAD_URL:
      return {
        ...state,
        download: {
          ...state.download,
          download: action.payload.data,
        },
      };

    default:
      return state;
  }
};

export default BarnReducer;
