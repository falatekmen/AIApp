// Initial State
const INITIAL_STATE = {
    modalIndex: 0,
};

// Selectors
export const infoModalIndexSelector = (state) => state.infoModal.modalIndex

// Action Types
export const SET_INFO_INDEX = "SET_INFO_INDEX";

// Action Creators
export const setInfoModalIndex = (index) => {
    return {
        type: SET_INFO_INDEX,
        payload: { index },
    };
}

export const infoModaleducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_INFO_INDEX:
            return {
                modalIndex: action.payload.index
            }
        default:
            return state;
    }
}