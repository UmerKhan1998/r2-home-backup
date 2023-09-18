import { LAYOUT_CHANGE } from "../constants";

const initialState = {
  layoutChange: "",
};

const layoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case LAYOUT_CHANGE:
      return { ...state, layoutChange: action.payload };
    default:
      return state;
  }
};

export default layoutReducer;
