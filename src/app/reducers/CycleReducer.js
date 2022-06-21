import {
  SHOW_CYCLE_CLOSE,
  SHOW_CYCLE_OPEN,
} from "../constants/types/CycleTypes";

const initialState = {
  show: false,
  loading: false,
  cycle: {
    breed: "",
    origin: "",
    starting_age: "",
    starting_date: "",
    sex: "",
    end_date: "",
    population: "",
    desired_weight: "",
  },
};

const CycleReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_CYCLE_OPEN:
      return { ...state, show: true };

    case SHOW_CYCLE_CLOSE:
      return { ...state, show: false };

    default:
      return state;
  }
};

export default CycleReducer;
