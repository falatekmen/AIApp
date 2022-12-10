import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { keyReducer } from './KeyRedux';

import { localizationReducer } from './LocalizationRedux';
import { modelsDataReducer } from './ModelsDataRedux';
import { selectedModelReducer } from './SelectedModelRedux';

const rootReducer = combineReducers({
    key: keyReducer,
    locale: localizationReducer,
    modelsData: modelsDataReducer,
    selectedModel: selectedModelReducer
});

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
