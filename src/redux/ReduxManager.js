import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';

import { keyReducer } from './KeyRedux';
import { localizationReducer } from './LocalizationRedux';
import { allModelsReducer } from './AllModelsRedux';
import { selectedModelReducer } from './SelectedModelRedux';
import { adFrequencyReducer } from './AdFrequencyRedux';
import { isFirstLaunchReducer } from './isFirstLaunchRedux';
import { isReviewedReducer } from './isReviewedRedux';
import { infoModaleducer } from './InfoModalRedux';
import { aiErrorMessageReducer } from './AiErrorMessageRedux';

const rootReducer = combineReducers({
    key: keyReducer,
    locale: localizationReducer,
    models: allModelsReducer,
    selectedModel: selectedModelReducer,
    adFrequency: adFrequencyReducer,
    launch: isFirstLaunchReducer,
    review: isReviewedReducer,
    infoModal: infoModaleducer,
    aiErrorMessage: aiErrorMessageReducer
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
