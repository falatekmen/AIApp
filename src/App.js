import React from "react";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/ReduxManager';
import MainNavigation from './navigation/MainNavigation'
import { LogBox } from "react-native";

//XNOT: Bu hatalar çözüelcek

const ignoreWarns = [
  "Require cycle",
];

LogBox.ignoreLogs(ignoreWarns);

function App() {
    return (
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <MainNavigation />
        </PersistGate>
    </Provider>
    );
}

export default App;