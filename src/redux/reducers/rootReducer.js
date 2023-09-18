import { combineReducers } from "redux";
import layoutReducer from "./layoutReducer";
import tokenAuthReducer from "./tokenAuthReducer";
import courseTrainingLovDataReducer from "./courseTrainingLovDataReducer";
import userDataReducer from "./userDataReducer";
import notificationCountsReducer from "./notificationCountsReducer";
import sliderDataReducer from "./sliderDataReducer";
import sliderDataTotalReducer from "./sliderDataTotalReducer";
import menuServiceReducer from "./menuServiceReducer";

const rootReducer = combineReducers({
  layoutReducer,
  tokenAuthReducer,
  courseTrainingLovDataReducer,
  userDataReducer,
  notificationCountsReducer,
  sliderDataReducer,
  sliderDataTotalReducer,
  menuServiceReducer
});

export default rootReducer;
