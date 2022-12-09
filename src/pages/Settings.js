import React from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";


function Settings({navigation}) {
    return (
        <SafeAreaView style={{backgroundColor: 'black', flex: 1}}>
            <TouchableOpacity style={{backgroundColor: 'red', width: 30, height: 60}}
                    onPress={() => {
                        navigation.goBack()
                    }}></TouchableOpacity>
        </SafeAreaView>
    );
}

export default Settings;
