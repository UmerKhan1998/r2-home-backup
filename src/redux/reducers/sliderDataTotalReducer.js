import { SLIDER_DATA, SLIDER_DATA_TOTAL, USER_DATA } from "../constants";

const initialState = {
  counts: 0,
};

const sliderDataTotalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SLIDER_DATA_TOTAL:
      return { ...state, counts: action.payload };
    default:
      return state;
  }
};

export default sliderDataTotalReducer;
