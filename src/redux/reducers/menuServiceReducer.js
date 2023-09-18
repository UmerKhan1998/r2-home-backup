import { MENU_SERVICE } from "../constants";

const initialState = {
  departmentId: "",
  departmentName: "",
  serviceId: "",
  serviceName: "",
};

const menuServiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case MENU_SERVICE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default menuServiceReducer;
