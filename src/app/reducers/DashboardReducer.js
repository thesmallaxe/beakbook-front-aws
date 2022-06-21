import {
  END_LOADING,
  FETCHING_FAV_BARNS,
  START_LOADING,
} from "../constants/types/DashboardTypes";

const initialState = {
  loading: false,
  favourite_barns: {},
  stats: {},
};

const DashboardReducer = (state = initialState, action) => {
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

    case FETCHING_FAV_BARNS:
      return {
        ...state,
        favourite_barns: action.payload.barnOverview,
        stats: action.payload.otherStatistics.statistics.allBarns,
      };

    default:
      return state;
  }
};

export default DashboardReducer;
