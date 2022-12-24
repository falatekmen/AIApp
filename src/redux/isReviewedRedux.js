// Initial State
const INITIAL_STATE = {
    isReviewed: false,
};

// Selectors
export const isReviewedSelector = (state) => state.review.isReviewed

// Action Types
export const SET_IS_REVIEWED = "SET_IS_REVIEWED";

// Action Creators
export const setIsReviewed = (value) => {
    return {
        type: SET_IS_REVIEWED,
        payload: { value },
    };
}

export const isReviewedReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_IS_REVIEWED:
            return {
                isReviewed: action.payload.value
            }
        default:
            return state;
    }
}