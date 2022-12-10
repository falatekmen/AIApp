import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList, SafeAreaView, KeyboardAvoidingView, Platform, Modal, ScrollView } from 'react-native'
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import LottieView from 'lottie-react-native'

import Settings from '../../src/assets/svgs/settings.svg'
import Send from '../../src/assets/svgs/send.svg'
import { units } from "../theme/Units"
import { getCompletion } from '../api/ai'
import ModelModal from './components/ModelModal'
import { keySelector } from '../redux/KeyRedux'
import { colors } from '../theme/Colors';



const MainScreen = ({ navigation }) => {

    const [text, setText] = useState("")
    const [conversation, setConversation] = useState([])
    const [loading, setLoading] = useState(false)

    const flatListRef = useRef()
    const inputRef = useRef()

    const apiKey = useSelector(keySelector)

    const onPress = async () => {
        if (text) { //bir meitn girmeden aşağıdaki işlemlerin yapılmaması için
            inputRef.current.clear() // text inputu temizlemek için
            setLoading(true)
            setConversation(prev => [...prev, text])
            // console.log([...conversation, text])
            flatListRef.current.scrollToEnd() // mesaj gönderince son giden mesajı yukarı kaydırır

            let response = await getCompletion(text, apiKey) // api çağrısı
            setConversation(prev => [...prev, response]) // öncekiler ile beraber yapay zekanın yazdığını setler
            setLoading(false)

            setText("")
            flatListRef.current.scrollToEnd() // mesaj gönderince son giden mesajı yukarı kaydırır
        }
    }


    const renderChat = ({ item, index }) => {
        if (index % 2 == 0) {
            return (
                <Text
                    selectable={true}
                    style={{ color: "white", marginHorizontal: units.width / 72, marginTop: units.height / 120 }}>
                    {">"} {item}
                </Text>
            )
        } else {
            return (
                <Text
                    selectable={true}
                    style={{ color: colors.GREEN, marginHorizontal: units.width / 72 }} >
                    {"⦿>"} <Text style={{ color: "white" }} >{item} </Text>
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
                        navigation.navigate("HowItsWork")
                    }}>
                    <Settings width={'70%'} height={'70%'} />
                </TouchableOpacity>
                <View style={styles.chatArea}>
                    <FlatList
                        data={conversation}
                        renderItem={renderChat}
                        ref={flatListRef} // flatlisti aşağı kaydırma için gerekli
                        ListFooterComponent={() => { // flatlist'in en altında boşluk olmasını sağlamak için
                            return (
                                <View style={{ flex: 1, height: units.height / 10, marginBottom: 5 }}>
                                    {
                                        loading && <LottieView
                                            source={require('../assets/animation/loading.json')} autoPlay loop />
                                    }
                                </View>
                            )
                        }} />
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
                <ModelModal />
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default MainScreen

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
        minHeight: units.height / 4, // bazen klavye açılınca bu alanlarda bir bug oluşum küçücük oluyor, burası engelliyor
        height: units.height / 1,
        width: units.width / 1.125,
        borderWidth: 1,
        borderColor: colors.GREEN,
        borderRadius: units.height / 99,
        alignSelf: "center",
        flexShrink: 1,
    },
    inputWrapper: {
        maxHeight: units.height / 8,
        minHeight: units.height / 17, // bazen klavye açılınca bu alanlarda bir bug oluşum küçücük oluyor, burası engelliyor
        width: units.width / 1.125,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: colors.GREEN,
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
        borderColor: colors.GREEN,
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


