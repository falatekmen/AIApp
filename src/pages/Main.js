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

    const data = 123

    const dispatch = useDispatch()

    const reduxOnPress = () => {
        dispatch(setFavorited(data))
    }

    console.log(useSelector(favoritedSelector))







    const [text, setText] = useState("")
    const [conversation, setConversation] = useState([])
    const [loading, setLoading] = useState(false)


    const flatListRef = useRef()
    const inputRef = useRef()
    // https://beta.openai.com/docs/api-reference/authentication ->const response = await openai.listEngines();


    // burdaki sorudada daha iyi kullanılmış https://www.reddit.com/r/reactnative/comments/ykhja6/anyone_used_openai_with_react_native_before_im/
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
            setLoading(false)
            return JSON.parse(response.request._response)
        }).then((response) => {
            console.log(response.choices[0].text)
            setConversation(prev => [...prev, response.choices[0].text.trim()])
        })
        flatListRef.current.scrollToEnd() // mesaj gönderince son giden mesajı yukarı kaydırır
    }


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
                        navigation.navigate("SettingsPage")
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
                                <View style={{ flex: 1, height: units.height / 17 }} />
                            )
                        }}
                    />
                    {
                        loading && <LottieView
                            source={require('../assets/animation/loading.json')} autoPlay loop />
                    }
                </View>
                <View style={styles.wrapperContainer}>
                    <TextInput
                        value={text}
                        onChangeText={setText}
                        style={styles.input}
                        multiline
                        ref={inputRef}
                    />
                    <TouchableOpacity style={styles.button} onPress={onPress}>
                        <Send width={'60%'} height={'60%'} alignSelf={'center'} />
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
    wrapperContainer: {
        flexDirection: 'row',
        alignSelf: 'center'
    },
    button: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderRightWidth: 1,
        height: units.height / 18,
        width: units.width / 10,
        borderColor: "#5ff736",
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        marginTop: units.height / 90,
        borderTopRightRadius: units.height / 99,
        borderBottomRightRadius: units.height / 99,
        marginBottom: 50
    },
    input: {
        borderWidth: 1,
        borderColor: "#5ff736",
        marginTop: units.height / 90,
        alignSelf: "center",
        height: units.height / 18,
        width: units.width / 1.25,
        backgroundColor: 'black',
        borderTopLeftRadius: units.height / 99,
        borderBottomLeftRadius: units.height / 99,
        color: 'white',
        marginBottom: 50,
        paddingTop: 5
    },
    chatArea: {
        backgroundColor: "black",
        height: units.height / 1,
        width: units.width / 1.125,
        borderWidth: 1,
        borderColor: "#5ff736",
        borderRadius: units.height / 99,
        alignSelf: "center",
        marginTop: units.height / 95,
        flexShrink: 1,
    },
})


