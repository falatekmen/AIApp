import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';

import { keyReducer } from './KeyRedux';
import { localizationReducer } from './LocalizationRedux';
import { modelsDataReducer } from './ModelsDataRedux';
import { selectedModelReducer } from './SelectedModelRedux';
import { adFrequencyReducer } from './AdFrequencyRedux';

const rootReducer = combineReducers({
    key: keyReducer,
    locale: localizationReducer,
    modelsData: modelsDataReducer,
    selectedModel: selectedModelReducer,
    adFrequency : adFrequencyReducer
});

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    // teli kapatıp açınca en son seçtiği model kayıtlı kalmasın, reduxtaki initial model seçili olsun
    // blacklist: ["selectedModel"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
