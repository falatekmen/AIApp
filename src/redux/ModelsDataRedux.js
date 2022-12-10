// Initial State
const INITIAL_STATE = {
    allModels: [{
        name: "Ada",
        model: "text-ada-001",
        description: "Capable of very simple tasks, usually the fastest model in the GPT-3 series, and lowest cost.",
        image: "https://user-images.githubusercontent.com/81239267/206866218-653e2419-214c-41b3-af2f-e85e288c0c77.png"
    }],
};

// Selectors
export const modelsDataSelector = (state) => state.modelsData.allModels

// Action Types
export const SET_MODELS = "ai_set_models";

// Action Creators
export const setModelsData = (allModels) => {
    return {
        type: SET_MODELS,
        payload: { allModels },
    };
}

export const modelsDataReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_MODELS:
            return {
                allModels: action.payload.allModels
            }
        default:
            return state;
    }
}