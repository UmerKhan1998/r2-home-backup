import { NOTIFICATION_COUNTS } from "../constants";

const initialState = {
  counts: 0,
};

const notificationCountsReducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTIFICATION_COUNTS:
      return { ...state, counts: action.payload };
    default:
      return state;
  }
};

export default notificationCountsReducer;
