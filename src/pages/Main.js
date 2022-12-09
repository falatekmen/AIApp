import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useRef, useState } from 'react'
import { Configuration, OpenAIApi } from "openai"
import Settings from '../../src/assets/svgs/settings.svg'
import Send from '../../src/assets/svgs/send.svg'
import LottieView from 'lottie-react-native'

import { useDispatch, useSelector } from "react-redux";
import { favoritedSelector, setFavorited } from "../redux/FavoritedRedux";

import { units } from "../theme/Units"

const Main = ({ navigation }) => {

    const [text, setText] = useState("")
    const [conversation, setConversation] = useState([])
    const [loading, setLoading] = useState(false)
    const [list, setList] = useState()
    const flatListRef = useRef()
    const inputRef = useRef()

    const dispatch = useDispatch()

    // https://beta.openai.com/docs/api-reference/authentication ->const response = await openai.listEngines();


    const configuration = new Configuration({
        apiKey: "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",
    });

    const openai = new OpenAIApi(configuration);

    const onPress = async () => {
        inputRef.current.clear() // text inputu temizlemek için
        setLoading(true)
        setConversation(prev => [...prev, text])
        flatListRef.current.scrollToEnd() // mesaj gönderince son giden mesajı yukarı kaydırır

        await openai.createCompletion({
            model: "text-davinci-003",
            prompt: text,
            temperature: 0.7,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        }).then((response) => {
            setConversation(prev => [...prev, response.data.choices[0].text.trim()])
            setLoading(false)
        })

        setText("")
        flatListRef.current.scrollToEnd() // mesaj gönderince son giden mesajı yukarı kaydırır
    }

    const listelee = async () => {

        const response = await openai.listModels()
        setList(response.data)
    }

    console.log(list)

    const renderChat = ({ item, index }) => {
        if (index % 2 == 0) {
            return (
                <Text
                    selectable={true}
                    style={{ color: "white", marginLeft: units.width / 72, marginTop: units.height / 120 }}>
                    {">"} {item}
                </Text>
            )
        } else {
            return (
                <Text
                    selectable={true}
                    style={{ color: "#5ff736", marginLeft: units.width / 72 }} >
                    {">"} <Text style={{ color: "white" }} >{item} </Text>
                </Text>
            )
        }
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS == "android" ? "height" : "padding"}
                style={styles.container}
            >
                <TouchableOpacity style={styles.settingsButton}
                    onPress={() => {
                        // navigation.navigate("SettingsPage")
                        listelee()
                    }}>
                    <Settings width={'70%'} height={'70%'} />
                </TouchableOpacity>
                <View style={styles.chatArea}>
                    <FlatList
                        data={conversation}
                        renderItem={renderChat}
                        ref={flatListRef} //
                        ListFooterComponent={() => { // flatlist'in en altında boşluk olmasını sağlamak için
                            return (
                                <View style={{ flex: 1, height: units.height / 10, marginBottom: 5 }}>
                                    {
                                        loading && <LottieView
                                            source={require('../assets/animation/loading.json')} autoPlay loop />
                                    }
                                </View>

                            )
                        }}
                    />

                </View>
                <View style={styles.inputWrapper}>
                    <TextInput
                        value={text}
                        onChangeText={setText}
                        style={styles.input}
                        multiline
                        ref={inputRef}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={onPress}
                        onLongPress={() => { setConversation([]) }}
                    >
                        <Send width={units.width / 20} height={units.width / 20} alignSelf={'center'} />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
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
    chatArea: {
        height: units.height / 1,
        width: units.width / 1.125,
        borderWidth: 1,
        borderColor: "#5ff736",
        borderRadius: units.height / 99,
        alignSelf: "center",
        flexShrink: 1,
    },
    inputWrapper: {
        maxHeight: units.height / 8,
        width: units.width / 1.125,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: "#5ff736",
        marginTop: units.height / 90,
        backgroundColor: 'black',
        borderTopLeftRadius: units.height / 99,
        borderBottomLeftRadius: units.height / 99,
        marginBottom: units.height / 12,
        borderTopRightRadius: units.height / 99,
        borderBottomRightRadius: units.height / 99,
        alignSelf: "center"
    },
    input: {
        width: units.width / 1.125 - units.width / 10 - 1,
        color: 'white',
        paddingVertical: units.height / 200,
    },
    button: {
        minHeight: units.height / 18,
        width: units.width / 10,
        borderColor: "#5ff736",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        borderLeftWidth: 1
    },
    settingsButton: {
        height: units.height / 20,
        width: units.width / 10,
        alignSelf: 'flex-end',
        justifyContent: "center",
        alignItems: "center",
        borderRadius: units.height / 99,
        marginVertical: units.height / 95,
        marginEnd: units.height / 50,
    },
})


