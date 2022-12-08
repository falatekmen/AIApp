import { View, Text, Button, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList } from 'react-native'
import React, { useState } from 'react'
import { Configuration, OpenAIApi } from "openai"

import { units } from "./theme/Units"

const App = () => {

    const [text, setText] = useState("")
    const [conversation, setConversation] = useState("")
    const [loading, setLoading] = useState(false)

    // https://beta.openai.com/docs/api-reference/authentication ->const response = await openai.listEngines();


    // burdaki sorudada daha iyi kullanılmış https://www.reddit.com/r/reactnative/comments/ykhja6/anyone_used_openai_with_react_native_before_im/
    const configuration = new Configuration({
        apiKey: "",
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
        <View style={styles.container}>
            <TextInput
                value={text}
                onChangeText={setText}
                style={styles.input}
            />
            <View style={styles.chatArea}>
                <FlatList
                    data={conversation}
                    renderItem={({item}) => {
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

            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text style={{
                    color: "white",
                }}>Gönder</Text>
            </TouchableOpacity>

        </View>
    )
}

export default App

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black"
    },
    input: {
        color: "gray",
        borderWidth: 1,
        borderColor: "white",
        marginTop: units.height / 30,
        marginHorizontal: units.width / 36
    },
    chatArea: {
        backgroundColor: "black",
        height: units.height / 2,
        width: units.width / 1.125,
        borderWidth: 1,
        borderColor: "white",
        borderRadius: units.height / 72,
        alignSelf: "center",
        marginTop: units.height / 20,
        padding: units.height / 72,
    },
    button: {
        width: units.width / 3,
        height: units.height / 20,
        borderWidth: 1,
        borderColor: "white",
        marginTop: units.height / 15,
        alignSelf: "center",
        borderRadius: units.height / 72,
        justifyContent: "center",
        alignItems: "center"

    }
})


