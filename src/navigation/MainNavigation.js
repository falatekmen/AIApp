import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import MainScreen from '../pages/Main';
import HowItsWork from '../pages/HowItsWork';
import Splash from "../pages/Splash";
import ChangeModel from "../pages/ChangeModel";
import Settings from "../pages/Settings";

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
                <Stack.Screen name="ChangeModel" component={ChangeModel} options={{
                    animationTypeForReplace: 'push',
                    animation: 'slide_from_right'
                }} />
                <Stack.Screen name="Settings" component={Settings} options={{
                    animationTypeForReplace: 'push',
                    animation: 'slide_from_right'
                }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default MainNavigation;