import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { Configuration, OpenAIApi } from "openai"
import Settings from '../../src/assets/svgs/settings.svg'
import Send from '../../src/assets/svgs/send.svg'

import { units } from "../theme/Units"

const Main = ({ navigation }) => {

    const [text, setText] = useState("")
    const [conversation, setConversation] = useState("")
    const [loading, setLoading] = useState(false)

    // https://beta.openai.com/docs/api-reference/authentication ->const response = await openai.listEngines();


    // burdaki sorudada daha iyi kullanılmış https://www.reddit.com/r/reactnative/comments/ykhja6/anyone_used_openai_with_react_native_before_im/
    const configuration = new Configuration({
        apiKey: "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",
    });
    const openai = new OpenAIApi(configuration);


    const onPress = async () => {
        setLoading(true)
        setConversation(prev => [...prev, text])
        await openai.createCompletion({
            model: "text-davinci-003",
            prompt: text,
            temperature: 0.7,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        }).then((response) => {
            setLoading(false)
            return JSON.parse(response.request._response)
        }).then((response) => {
            console.log(response.choices[0].text)
            setConversation(prev => [...prev, response.choices[0].text.trim()])
            console.log(conversation)
        })


        // setConversation(response)
        // console.log(response)
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.settingsButton}
                    onPress={() => {
                        navigation.navigate("SettingsPage")
                    }}>
                    <Settings width={'70%'} height={'70%'} />
                </TouchableOpacity>
                <View style={styles.wrapperContainer}>
                    <TextInput
                        value={text}
                        onChangeText={setText}
                        style={styles.input}
                    />
                    <TouchableOpacity style={styles.button} onPress={onPress}>
                        <Send width={'60%'} height={'60%'} />
                    </TouchableOpacity>

                </View>

                <View style={styles.chatArea}>
                    <FlatList
                        data={conversation}
                        renderItem={({ item }) => {
                            console.log(item)
                            return (
                                <Text style={{
                                    color: "white",
                                }}>
                                    {item}
                                </Text>
                            )
                        }}
                    />
                    <ActivityIndicator size={"large"} color={"white"} animating={loading} />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Main

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "black"
    },
    container: {
        flex: 1,
        backgroundColor: "black"
    },
    settingsButton: {
        height: units.height / 20,
        width: units.width / 10,
        borderWidth: 1,
        borderColor: "#5ff736",
        alignSelf: 'flex-end',
        justifyContent: "center",
        alignItems: "center",
        borderRadius: units.height / 99,
        marginVertical: units.height / 95,
        marginEnd: units.height / 50,
        
    },
    wrapperContainer: {
        flexDirection: 'row',
        alignSelf: 'center'
    },
    input: {
        borderLeftWidth:1,
        borderBottomWidth:1,
        borderTopWidth: 1,
        borderColor: "#5ff736",
        marginTop: units.height / 90,
        alignSelf: "center",
        height: units.height / 20,
        width: units.width / 1.25,
        backgroundColor: 'black',
        borderTopLeftRadius: units.height / 99,
        borderBottomLeftRadius: units.height / 99,
        color: 'white'
    },
    button: {
        height: units.height / 20,
        width: units.width / 10,
        borderWidth: 1,
        borderColor: "#5ff736",
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        marginTop: units.height / 90,
        borderTopRightRadius: units.height / 99,
        borderBottomRightRadius: units.height / 99,
    },
    chatArea: {
        backgroundColor: "black",
        height: units.height / 1.6,
        width: units.width / 1.125,
        borderWidth: 1,
        borderColor: "#5ff736",
        borderRadius: units.height / 99,
        alignSelf: "center",
        marginTop: units.height / 20,
        padding: units.height / 72,
    },
})


