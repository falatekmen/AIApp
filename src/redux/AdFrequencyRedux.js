// Initial State
const INITIAL_STATE = {
    count: 5,
};

// Selectors
export const adFrequencySelector = (state) => state.adFrequency.count

// Action Types
export const SET_AD_FREQUENCY = "SET_AD_FREQUENCY";

// Action Creators
export const setAdFrequency = (count) => {
    return {
        type: SET_AD_FREQUENCY,
        payload: { count },
    };
}

export const adFrequencyReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_AD_FREQUENCY:
            return {
                count: action.payload.count
            }
        default:
            return state;
    }
}