import React from "react";
import { SafeAreaView, TouchableOpacity, Image } from "react-native";


function Settings({ navigation }) {

    const data = [
        {
            title: "Q&A",
            description: "Answer questions based on existing knowledge.",
            image: require("../assets/images/QA.jpeg")
        },
        {
            title: "Grammar correction",
            description: "Corrects sentences into standard English.",
            image: require("../assets/images/Grammar.jpeg")
        },
        {
            title: "Summarize for a 2nd grader",
            description: "Translates difficult text into simpler concepts",
            image: require("../assets/images/Summarize.jpeg")
        },
    ]
    
    return (
        <SafeAreaView style={{ backgroundColor: 'black', flex: 1 }}>
            <TouchableOpacity style={{ backgroundColor: 'red', width: 30, height: 60 }}
                onPress={() => {
                    navigation.goBack()
                }}></TouchableOpacity>
            {/* <Image
                source={data[0].image}
            /> */}
        </SafeAreaView>
    );
}

export default Settings;
