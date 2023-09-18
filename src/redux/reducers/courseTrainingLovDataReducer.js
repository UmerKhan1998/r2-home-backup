import { LAYOUT_CHANGE, TOKEN_AUTH, COURSE_TRAINING_REGISTERATION_LOV_DATA } from "../constants";

const initialState = {
    // token: "",
    // menuId: "",
};

const courseTrainingLovDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case COURSE_TRAINING_REGISTERATION_LOV_DATA:
            const { payload } = action;
            return { ...state, ...payload };
        default:
            return state;
    }
};

export default courseTrainingLovDataReducer;
