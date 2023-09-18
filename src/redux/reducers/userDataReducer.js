import { USER_DATA } from "../constants";

const initialState = {

};

const userDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_DATA:
      const { payload } = action;
      return { ...payload };
    default:
      return state;
  }
};

export default userDataReducer;
