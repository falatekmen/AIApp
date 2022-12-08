import React from "react";
import { SafeAreaView, Text, TouchableOpacity } from "react-native";

import LottieView from 'lottie-react-native'

function Settings({navigation}) {
    return (
        <SafeAreaView style={{backgroundColor: 'black', flex: 1}}>
            <TouchableOpacity style={{backgroundColor: 'red', width: 60, height: 60}}
                    onPress={() => {
                        navigation.goBack()
                    }}></TouchableOpacity>
                    <LottieView 
                    source={require('../assets/animation/loading.json')} autoPlay loop />
        </SafeAreaView>
    );
}

export default Settings;
