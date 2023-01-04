import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, FlatList, SafeAreaView, KeyboardAvoidingView, Platform, BackHandler, Button } from 'react-native'
import React, { useRef, useState, useEffect, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
import LottieView from 'lottie-react-native'

import BrainIcon from '../../src/assets/svgs/brain.svg'
import SettingsIcon from '../../src/assets/svgs/settings.svg'
import QuestionMarkIcon from '../../src/assets/svgs/questionMark.svg'
import SendIcon from '../../src/assets/svgs/send.svg'
import { units } from "../theme/Units"
import { getCompletion } from '../api/modelApi'
import { keySelector } from '../redux/KeyRedux'
import { colors } from '../theme/Colors';
import { selectedModelSelector } from '../redux/SelectedModelRedux';
import { adFrequencySelector } from '../redux/AdFrequencyRedux';
import { isFirstLaunchSelector, setIsFirstLaunch } from '../redux/isFirstLaunchRedux';
import Fonts from '../theme/Fonts';
import { DefaultConversationText } from '../localization/StaticTexts';
import ReviewRequest from '../utils/ReviewRequest';
import { isReviewedSelector } from '../redux/isReviewedRedux';


// admob
// import { InterstitialAd, TestIds, AdEventType, useInterstitialAd } from 'react-native-google-mobile-ads';

// admob
// deev modda iken test idsi yayında iken gerçek reklam idsi kullan
// const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-9947689607597373/6400781490';

 



const MainScreen = ({ navigation }) => {

    // admob
    // const { isLoaded, isClosed, load, show } = useInterstitialAd(adUnitId);


    const selectedModelInRedux = useSelector(selectedModelSelector)
    const apiKey = useSelector(keySelector)
    const adFrequency = useSelector(adFrequencySelector)
    const isFirstLaunch = useSelector(isFirstLaunchSelector)
    const isReviewed = useSelector(isReviewedSelector)


    const [text, setText] = useState("")
    const [conversation, setConversation] = useState([])
    const [loading, setLoading] = useState(false)
    const [countOfRequests, setCountOfRequests] = useState(0)

    const flatListRef = useRef()
    const inputRef = useRef()

    const dispatch = useDispatch()

    // telefonun geri tuşuna basıldığında splash ekranına dönemsini engeller
    useFocusEffect(
        useCallback(() => {
            const backAction = () => {
                return true;
            };
            const backHandler = BackHandler.addEventListener(
                'hardwareBackPress',
                backAction,
            );
            return () => backHandler.remove();
        }, []),
    );

    // mesajı gönder buttonu
    const onPressSend = async () => {
        if (text) { //bir metin girmeden aşağıdaki işlemlerin yapılmaması için
            dispatch(setIsFirstLaunch(false))// ilk mesajını gönderdikten sonra artık default mesajın görünmemesi için
            setCountOfRequests(prev => prev + 1) // 
            inputRef.current.clear() // text inputu temizlemek için
            setLoading(true)
            setConversation(prev => [...prev, text]) // öncekiler ile beraber kullanıcının yazdığını setler
            flatListRef.current.scrollToEnd() // mesaj gönderince son giden mesajı yukarı kaydırır
            let response = await getCompletion( // api çağrısı
                text,
                apiKey,
                selectedModelInRedux.temperature,
                selectedModelInRedux.model,
                selectedModelInRedux.max_token,
                selectedModelInRedux.stop,
            )
            setConversation(prev => [...prev, response]) // öncekiler ile beraber yapay zekanın yazdığını setler
            setLoading(false)
            setText("")
            flatListRef.current.scrollToEnd() // mesaj gönderince son giden mesajı yukarı kaydırır
        }
    }


 
    useEffect(() => {
        //XNOTE REF
        if (!isReviewed && countOfRequests == 10) {
            ReviewRequest() //storeda yorum yaptırmak için
        } else {
            if (countOfRequests != 0 && countOfRequests % adFrequency == 0) {
                // //admob
                // showAd()
            }
        }

    }, [countOfRequests])


    // useEffect(() => {
    //     // ilk reklamın yüklenmesi, bura toplamda 2 kere çalışır
    //     load();
    // }, [load]);

    // useEffect(() => {
    //     // reklam kapandıktan sonra yeni reklam hazırlanır
    //     if (isClosed) {
    //         load()
    //     }
    // }, [isClosed]);

    // const showAd = () => {
    //     if (isLoaded) {
    //         show();
    //     } else {
    //         console.log("reklam hazır değil");
    //     }
    // }

    //mesajların render edilmesi
    const renderChat = ({ item, index }) => {
        if (index % 2 == 0) {
            return (
                <View key={index}>
                    <Text
                        selectable={true}
                        style={{ color: colors.WHITE, marginHorizontal: units.width / 72, marginTop: units.height / 120, fontSize: Fonts.size(17) }}>
                        {">"} {item}
                    </Text>
                </View>
            )
        } else {
            return (
                <View key={index}  >
                    <Text
                        selectable={true}
                        style={{ color: colors.GREEN, marginHorizontal: units.width / 72, marginTop: units.height / 120, fontSize: Fonts.size(17) }} >
                        {">"} <Text style={{ color: colors.WHITE }} >{item} </Text>
                    </Text>
                </View>
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
                        <View style={styles.topLeftButtonsWrapper}>
                            <TouchableOpacity style={styles.settingsButton}
                                onPress={() => {
                                    navigation.navigate("Settings")
                                }}>
                                <SettingsIcon width={'97%'} height={'97%'} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.topRightButtonsWrapper}>
                            <TouchableOpacity style={styles.modelModalButton}
                                onPress={() => {
                                    navigation.navigate("ChangeModel")
                                }}>
                                <BrainIcon width={'90%'} height={'90%'} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.howItsWorkButton}
                                onPress={() => {
                                    navigation.navigate("HowDoesItWork")
                                }}>
                                <QuestionMarkIcon width={'95%'} height={'95%'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.chatArea}>
                        {/* kullanıcı uygulamaya ilk defa girdiyse default mesaj gösterilir */}
                        {isFirstLaunch && <DefaultConversationText />}
                        <FlatList
                            removeClippedSubviews={false} // bunu eklemeyince, app kapanıp açıldıktan sonra metinler seçilebilir olmuyordu
                            data={conversation}
                            renderItem={renderChat}
                            ref={flatListRef} // flatlisti aşağı kaydırma için gerekli
                            ListFooterComponent={() => { // flatlist'in en altında loading olması için
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
                            onPress={onPressSend}
                            onLongPress={() => { setConversation([]) }}
                        >
                            <SendIcon width={units.width / 20} height={units.width / 20} alignSelf={'center'} />
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
        justifyContent: 'space-between',
    },
    topLeftButtonsWrapper: {
        height: units.height / 20,
        marginVertical: units.height / 80,
        marginHorizontal: units.width / 20,
        justifyContent: 'flex-start',
    },
    settingsButton: {
        height: units.height / 20,
        width: units.height / 20,
        display: "none"
    },
    topRightButtonsWrapper: {
        flexDirection: "row",
        height: units.height / 20,
        marginVertical: units.height / 80,
        marginHorizontal: units.width / 20,
        alignSelf: 'flex-end',
    },
    modelModalButton: {
        height: units.height / 20,
        width: units.height / 20,
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
        marginBottom: units.height / 20,
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


