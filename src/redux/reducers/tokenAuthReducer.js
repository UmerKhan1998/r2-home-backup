import { LAYOUT_CHANGE, TOKEN_AUTH } from "../constants";

const initialState = {
  token: "",
  menuId: "",
};

const courseTrainingLovDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOKEN_AUTH:
      const { payload } = action;
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default courseTrainingLovDataReducer;
