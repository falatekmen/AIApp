import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, FlatList, SafeAreaView, KeyboardAvoidingView, Platform, BackHandler } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import LottieView from 'lottie-react-native'

import Brain from '../../src/assets/svgs/brain.svg'
import QuestionMark from '../../src/assets/svgs/questionMark.svg'
import Send from '../../src/assets/svgs/send.svg'
import { units } from "../theme/Units"
import { getCompletion } from '../api/modelApi'
import { keySelector } from '../redux/KeyRedux'
import { colors } from '../theme/Colors';
import { selectedModelSelector } from '../redux/SelectedModelRedux';

const MainScreen = ({ navigation }) => {

    //Kullanıcının bu ekrayken geri tuşuna basıp splash ekranında kalmaması için.
    //Telefonun geri tuşunu bu ekranda iptal ediyor.
    useEffect(() => {
        const backHandler = BackHandler.addEventListener("hardwareBackPress", () => true)
        return () => backHandler.remove()
    }, [])

    const [text, setText] = useState("")
    const [conversation, setConversation] = useState([])
    const [loading, setLoading] = useState(false)
    const [modalVisibility, setModalVisibility] = useState(false)
    const flatListRef = useRef()
    const inputRef = useRef()

    const selectedModelInRedux = useSelector(selectedModelSelector)
    const apiKey = useSelector(keySelector)

    const onPress = async () => {
        if (text) { //bir meitn girmeden aşağıdaki işlemlerin yapılmaması için
            inputRef.current.clear() // text inputu temizlemek için
            setLoading(true)
            setConversation(prev => [...prev, text])
            flatListRef.current.scrollToEnd() // mesaj gönderince son giden mesajı yukarı kaydırır

            // api çağrısı
            let response = await getCompletion(
                text,
                apiKey,
                selectedModelInRedux.temperature,
                selectedModelInRedux.model
            )
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
                    {">"} <Text style={{ color: "white" }} >{item} </Text>
                </Text>
            )
        }
    }

    return (
        <>
            <SafeAreaView style={styles.topSafeArea} />
            <SafeAreaView style={styles.safeArea} >
                <StatusBar barStyle="light-content" backgroundColor="black" />
                <KeyboardAvoidingView
                    behavior={Platform.OS == "android" ? "height" : "padding"}
                    style={styles.container}
                >
                    <View style={styles.topButtonsWrapper}>
                        <TouchableOpacity style={styles.modelModalButton}
                            onPress={() => {
                                navigation.navigate("ChanceModel")
                            }}>
                            <Brain width={'90%'} height={'90%'} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.howItsWorkButton}
                            onPress={() => {
                                navigation.navigate("HowItsWork")
                            }}>
                            <QuestionMark width={'95%'} height={'95%'} />
                        </TouchableOpacity>
                    </View>

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
                            style={styles.sendButton}
                            onPress={onPress}
                            onLongPress={() => { setConversation([]) }}
                        >
                            <Send width={units.width / 20} height={units.width / 20} alignSelf={'center'} />
                        </TouchableOpacity>
                    </View>

                </KeyboardAvoidingView>
            </SafeAreaView>
        </>
    )
}

export default MainScreen

const styles = StyleSheet.create({
    topSafeArea: {
        flex: 0,
        backgroundColor: colors.BLACK,
    },
    safeArea: {
        flex: 1,
        backgroundColor: colors.BLACK,
    },
    container: {
        flex: 1,
        backgroundColor: colors.BLACK,
    },
    topButtonsWrapper: {
        flexDirection: "row",
        height: units.height / 20,
        marginVertical: units.height / 80,
        justifyContent: 'flex-end',
        marginHorizontal: units.width / 20,
    },
    modelModalButton: {
        height: units.height / 20,
        width: units.height / 20
    },
    howItsWorkButton: {
        height: units.height / 20,
        width: units.height / 20,
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
        backgroundColor: colors.BLACK,
        borderTopLeftRadius: units.height / 99,
        borderBottomLeftRadius: units.height / 99,
        marginBottom: units.height / 12,
        borderTopRightRadius: units.height / 99,
        borderBottomRightRadius: units.height / 99,
        alignSelf: "center"
    },
    input: {
        width: units.width / 1.125 - units.width / 10 - 1,
        color: colors.WHITE,
        paddingVertical: units.height / 200,
    },
    sendButton: {
        minHeight: units.height / 18,
        width: units.width / 10,
        borderColor: colors.GREEN,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        borderLeftWidth: 1
    },
})


