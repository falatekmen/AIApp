import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import MainScreen from '../pages/MainScreen';
import HowItsWork from '../pages/HowItsWork';
import Splash from "../pages/Splash";

const Stack = createNativeStackNavigator();

function MainNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="Splash" component={Splash} />
                <Stack.Screen name="MainScreen" component={MainScreen} />
                <Stack.Screen name="HowItsWork" component={HowItsWork} options={{
                    animationTypeForReplace: 'push',
                    animation: 'slide_from_right'
                }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default MainNavigation;