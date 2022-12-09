// Initial State. uygulama ilk açıldığındaki başlangıç değeri
const INITIAL_STATE = {
    favorited: []
};

// Selectors. diğer ekranlarda reduxtaki değeri almak için kullanılır
export const favoritedSelector = (state) => state.favoritedState.favorited


// Action. Ekranlada reduxı güncellemek için
// Action Types
const SET_FAVORITED = "user/set_favorited";
const DELETE_FAVORITED = "user/delete_favorited";


// Action Creators
export const setFavorited = (status) => {
    return {
        type: SET_FAVORITED,
        payload: { status },
    };
}
export const deleteFavorited = (status) => {
    return {
        type: DELETE_FAVORITED,
        payload: { status },
    };
}


// Reducer 
export const favoritedReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_FAVORITED:
            const status = action.payload.status;
            const newState = [status].concat(state.favorited)
            return {
                favorited: newState
            }
        case DELETE_FAVORITED:
            const deleteFavorited = action.payload.status;
            const newState2 = state.favorited.filter(function (e) {
                return e != deleteFavorited;
            })
            return {
                favorited: newState2
            }
        default:
            return state;
    }
};