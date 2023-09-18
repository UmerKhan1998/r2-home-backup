import {
  LAYOUT_CHANGE,
  TOKEN_AUTH,
  COURSE_TRAINING_REGISTERATION_LOV_DATA,
  USER_DATA,
  NOTIFICATION_COUNTS,
  SLIDER_DATA,
  SLIDER_DATA_TOTAL,
  MENU_SERVICE,
} from "../constants";

export const layoutChange = (data) => {
  return {
    type: LAYOUT_CHANGE,
    payload: data,
  };
};

export const tokenAuth = (data) => {
  return {
    type: TOKEN_AUTH,
    payload: data,
  };
};

export const courseTrainingRegisterationLovData = (data) => {
  return {
    type: COURSE_TRAINING_REGISTERATION_LOV_DATA,
    payload: data,
  };
};

export const userData = (data) => {
  return {
    type: USER_DATA,
    payload: data,
  };
};

export const sliderData = (data) => {
  //console.log("sliderData", data);
  return {
    type: SLIDER_DATA,
    payload: data,
  };
};
export const sliderDataTotal = (data) => {
  //console.log("sliderDataTotal", data);
  return {
    type: SLIDER_DATA_TOTAL,
    payload: data,
  };
};

export const notificationCounts = (data) => {
  return {
    type: NOTIFICATION_COUNTS,
    payload: data,
  };
};

export const menuService = (data) => {
  return {
    type: MENU_SERVICE,
    payload: data,
  };
};
