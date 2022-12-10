// Initial State
const INITIAL_STATE = {
    language: "eng",
};

// Selectors
export const localizationSelector = (state) => state.locale.language

// Action Types
export const CHANGE_LOCALE = "localization/change_locale";

// Action Creators
export const setLocalization = (language) => {
    return {
        type: CHANGE_LOCALE,
        payload: { language },
    };
}

export const localizationReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHANGE_LOCALE:
            return {
                language: action.payload.language
            }
        default:
            return state;
    }
}