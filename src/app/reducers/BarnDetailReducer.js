import {
  START_LOADING,
  END_LOADING,
  EDIT_BARN_OVERVIEW,
  UPDATE_BARN_OVERVIEW,
  EDIT_CYCLE_DETAILS,
  FETCHING_SINGLE_BARN,
  HANDLE_AVERAGE_WEIGHT,
  UPDATE_AVERAGE_WEIGHT,
  SHOW_DOWNLOAD_POPUP,
  HIDE_DOWNLOAD_POPUP,
  GET_DOWNLOAD_URL,
  FETCHING_SINGLE_GRAPH,
  RESET_SINGLE_GRAPH,
  SHOW_GRAPH_MODAL,
  CLOSE_GRAPH_MODAL,
  UPDATE_BARN_VISIBILITY,
  UPDATE_CYCLE_DETAILS,
} from "../constants/types/BarnDetailTypes";

const initialState = {
  loading: false,
  graph_addition: {
    show_modal: false,
    graphs: {},
  },
  barn_overview: {
    edit: true,
    update: false,
    read_only: true,
    data: {},
  },
  cycle_details: {
    edit: true,
    update: false,
    read_only: true,
    data: {},
  },
  average_weight: {
    current: "barn",
    data: {},
  },
  barn_details: {
    graphs: [],
  },
  download: {
    show: false,
    cycles: {},
    download: {},
  },
};

const BarnDetailReducer = (state = initialState, action) => {
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

    case HANDLE_AVERAGE_WEIGHT:
      return {
        ...state,
        average_weight: {
          current: action.payload,
        },
      };

    case UPDATE_AVERAGE_WEIGHT:
      return {
        ...state,
        average_weight: {
          data: action.payload,
        },
      };

    case RESET_SINGLE_GRAPH:
      return {
        ...state,
        barn_details: {
          ...state.barn_details,
          graphs: [],
        },
      };

    case EDIT_BARN_OVERVIEW:
      return {
        ...state,
        barn_overview: {
          ...state.barn_overview,
          edit: false,
          update: true,
          read_only: false,
        },
      };

    case UPDATE_BARN_OVERVIEW:
      return {
        ...state,
        barn_overview: {
          ...state.barn_overview,
          edit: true,
          update: false,
          read_only: true,
          data: [action.payload],
        },
      };

    case EDIT_CYCLE_DETAILS:
      return {
        ...state,
        cycle_details: {
          edit: false,
          update: true,
          read_only: false,
        },
      };

    case UPDATE_CYCLE_DETAILS:
      return {
        ...state,
        cycle_details: {
          ...state.barn_overview,
          edit: true,
          update: false,
          read_only: true,
          data: action.payload,
        },
      };

    case FETCHING_SINGLE_BARN:
      return {
        ...state,
        barn_details: { ...state.barn_details, ...action.payload },
        graph_addition: {
          ...state.graph_addition,
          graphs: action.payload.graphVisibility,
        },
        barn_overview: {
          ...state.barn_overview,
          edit: true,
          update: false,
          read_only: true,
          data: action.payload.barnOverview,
        },
        cycle_details: {
          ...state.barn_overview,
          edit: true,
          update: false,
          read_only: true,
          data: action.payload.cycleDetails,
        },
      };

    case FETCHING_SINGLE_GRAPH:
      let graphs = state.barn_details.graphs;
      graphs.push(action.payload.graphs);
      return {
        ...state,
        barn_details: {
          ...state.barn_details,
          graphs: graphs,
        },
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

    case GET_DOWNLOAD_URL:
      return {
        ...state,
        download: {
          ...state.download,
          download: action.payload.data,
        },
      };

    case SHOW_GRAPH_MODAL:
      return {
        ...state,
        graph_addition: {
          ...state.graph_addition,
          show_modal: true,
        },
      };

    case CLOSE_GRAPH_MODAL:
      return {
        ...state,
        graph_addition: {
          ...state.graph_addition,
          show_modal: false,
        },
      };

    case UPDATE_BARN_VISIBILITY:
      return {
        ...state,
        graph_addition: {
          ...state.graph_addition,
          graphs: action.payload,
        },
      };

    default:
      return state;
  }
};

export default BarnDetailReducer;
