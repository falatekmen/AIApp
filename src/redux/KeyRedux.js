// Initial State. uygulama ilk açıldığındaki başlangıç değeri
const INITIAL_STATE = {
    key: ""
};

// Selectors. diğer ekranlarda reduxtaki değeri almak için kullanılır
export const keySelector = (state) => state.key.key


// Action. Ekranlada reduxı güncellemek için
// Action Types
const SET_KEY = "user/set_key";


// Action Creators
export const setKey = (value) => {
    return {
        type: SET_KEY,
        payload: { value },
    };
}

// Reducer 
export const keyReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_KEY:
            return {
                key: action.payload.value
            }
        default:
            return state;
    }
};