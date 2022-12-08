import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Main from './pages/Main';
import Settings from './pages/Settings';

const Stack = createNativeStackNavigator();

function App() {
    return (
    <NavigationContainer>
        <Stack.Navigator
        //  screenOptions={{
        //    headerShown: false,
        //  }}
        >
            <Stack.Screen name="MainPage" component={Main} />
            <Stack.Screen name="SettingsPage" component={Settings} />
        </Stack.Navigator>
    </NavigationContainer>
    );
}

export default App;