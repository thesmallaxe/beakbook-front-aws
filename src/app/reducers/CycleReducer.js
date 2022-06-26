import {
  SHOW_CYCLE_CLOSE,
  SHOW_CYCLE_OPEN,
  SHOW_ERROR,
  SHOW_MORTALITY_CLOSE,
  SHOW_MORTALITY_OPEN,
  SHOW_SUCCESS,
} from "../constants/types/CycleTypes";

const initialState = {
  loading: false,
  success: {},
  error: {},
  cycle_modal: false,
  mortality_modal: false,
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

    case SHOW_SUCCESS:
      return { ...state, success: action.payload };

    case SHOW_ERROR:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

export default CycleReducer;
