import {
  SHOW_CYCLE_CLOSE,
  SHOW_CYCLE_OPEN,
  SHOW_ERROR,
  SHOW_MORTALITY_CLOSE,
  SHOW_MORTALITY_OPEN,
  SHOW_SUCCESS,
  UPDATE_MORTALITY,
} from "../constants/types/CycleTypes";

const initialState = {
  loading: false,
  success: {},
  error: {},
  cycle_modal: false,
  mortality_modal: false,
  mortality: {
    barn_id: 0,
    cycle_id: 0,
    date: "",
    mortality_number: "",
    selected_date: null,
  },
  cycle: {
    breed: "",
    origin: "",
    starting_age: "",
    sex: "",
    population_number: "",
    harvest_weight: "",
    selected_start_date: null,
    starting_date: "",
    selected_end_date: null,
    end_date: "",
  },
};

const CycleReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_CYCLE_OPEN:
      return { ...state, cycle_modal: true };

    case SHOW_CYCLE_CLOSE:
      return { ...state, cycle_modal: false };

    case SHOW_MORTALITY_OPEN:
      return { ...state, mortality_modal: true };

    case SHOW_MORTALITY_CLOSE:
      return { ...state, mortality_modal: false };

    case UPDATE_MORTALITY:
      return { ...state, mortality: action.payload };

    case SHOW_SUCCESS:
      return { ...state, success: action.payload };

    case SHOW_ERROR:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

export default CycleReducer;
