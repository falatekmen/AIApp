// Initial State
const INITIAL_STATE = {
    selectedModel: {
        name: "Ada",
        model: "text-ada-001",
        description: "Capable of very simple tasks, usually the fastest model in the GPT-3 series, and lowest cost.",
        image: "https://user-images.githubusercontent.com/81239267/206866218-653e2419-214c-41b3-af2f-e85e288c0c77.png",
        tempeture: 0,
        max_token: 64,
        stop: null,
    }
};

// Selectors
export const selectedModelSelector = (state) => state.selectedModel.selectedModel

// Action Types
export const SET_SELECTED_MODEL = "ai_set_selected_model";

// Action Creators
export const setSelectedModel = (selectedModel) => {
    return {
        type: SET_SELECTED_MODEL,
        payload: { selectedModel },
    };
}

export const selectedModelReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_SELECTED_MODEL:
            return {
                selectedModel: action.payload.selectedModel
            }
        default:
            return state;
    }
}