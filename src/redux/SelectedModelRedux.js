// Initial State
const INITIAL_STATE = {
    selectedModel: {
        name: "Davinci",
        model: "text-davinci-003",
        description: "Most capable GPT-3 model. Can do any task the other models can do, often with higher quality, longer output and better instruction-following. Also supports inserting completions within text.",
        image: "https://user-images.githubusercontent.com/81239267/206864938-6388036c-93c5-4c96-9047-1bbbf32b46d8.png",
        max_token: 64,
        stop: null,
        temperature: 0.3,
        default: false
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