// Initial State
const INITIAL_STATE = {
    isFirstLaunch: true,
};

// Selectors
export const isFirstLaunchSelector = (state) => state.launch.isFirstLaunch

// Action Types
export const SET_IS_FIRST_LAUNCH = "SET_IS_FIRST_LAUNCH";

// Action Creators
export const setIsFirstLaunch = (value) => {
    return {
        type: SET_IS_FIRST_LAUNCH,
        payload: { value },
    };
}

export const isFirstLaunchReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_IS_FIRST_LAUNCH:
            return {
                count: action.payload.value
            }
        default:
            return state;
    }
}