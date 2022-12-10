// Initial State
const INITIAL_STATE = {
    selectedModel: {
        tempeture: 0.6,
        description: "Very capable, but faster and lower cost than Davinci.",
        image: "https://user-images.githubusercontent.com/81239267/206865339-ab7407b1-0d9d-44f0-856f-658709357262.png",
        model: "text-curie-001",
        name: "Curie"
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