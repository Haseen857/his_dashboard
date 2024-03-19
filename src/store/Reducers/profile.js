import * as types from "../Constants";

export const profileReducer = (state = {}, action) => {
    switch (action.type) {
        case types.RETRIEVE_PROFILE_SUCCESS:
            return { ...state, getUserProfileRes: action.payload };
        case types.RETRIEVE_PROFILE_FAILURE:
            if (action.payload.response === "undefined") {
                window.location.assign("/profile");
            }
        default:
            return state;
    }
};
