// Initial State
const INITIAL_STATE = {
    message: "The system is currently under maintenance. Please restart the application after waiting a few minutes."
};

// Selectors
export const aiErrorMessageSelector = (state) => state.aiErrorMessage.message


// Action Types
const SET_AI_ERROR_MESSAGE = "SET_AI_ERROR_MESSAGE";


// Action Creators
export const setAiErrorMessage = (text) => {
    return {
        type: SET_AI_ERROR_MESSAGE,
        payload: { text },
    };
}

// Reducer 
export const aiErrorMessageReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_AI_ERROR_MESSAGE:
            return {
                message: action.payload.text
            }
        default:
            return state;
    }
};