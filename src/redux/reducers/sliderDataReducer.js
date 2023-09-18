import { SLIDER_DATA, USER_DATA } from "../constants";

const initialState = {};

const sliderDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SLIDER_DATA:
      const { payload } = action;
      //console.log("payload", payload);
      return { ...payload };
    default:
      return state;
  }
};

export default sliderDataReducer;
