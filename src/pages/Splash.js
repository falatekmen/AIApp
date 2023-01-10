import { View, StyleSheet, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setKey } from '../redux/KeyRedux'
import { setLocalization } from '../redux/LocalizationRedux'
import { setAllModel } from '../redux/AllModelsRedux'
import { colors } from '../theme/Colors'
import { units } from '../theme/Units'
import { RemoteConfig } from '../firebase/RemoteConfig'
import { selectedModelSelector, setSelectedModel } from '../redux/SelectedModelRedux'
// import mobileAds from 'react-native-google-mobile-ads';
import { setAdFrequency } from '../redux/AdFrequencyRedux'
import CheckUpdate from '../utils/CheckUpdate'
import AppLovinMAX from "react-native-applovin-max";
import { setAiErrorMessage } from '../redux/AiErrorMessageRedux'
import messaging from "@react-native-firebase/messaging"
import { pushNotification } from '../firebase/PushNotification'



const remoteConfig = new RemoteConfig()

const Splash = ({ navigation }) => {

    const dispatch = useDispatch()
    const initialModel = useSelector(selectedModelSelector)

    const splash = async () => {
        
        // const allParams = remoteConfig.getAll()

        const key = await remoteConfig.getKey()
        const allModels = await remoteConfig.getModels()
        const adFrequency = await remoteConfig.getAdFrequency()
        const isForceUpdate = await remoteConfig.getForceUpdate() // güncellemeye zorlamak için
        const aiErrorMessage = await remoteConfig.getAiErrorMessage()

        if (allModels.length != 0) { //model gelmezse reduxtaki default model silinmesin
            dispatch(setAllModel(allModels))
            // default=true olan modeli default model yapar, yoksa kullanıcı son seçtiği modelden devam eder
            const defaultModel = allModels.find(e => e.default == true)
            const davinci = allModels.find(e => e.model == "text-davinci-003")
            if (defaultModel != undefined) { // eğer bir modelin default değeri true ise onu seçili model olarak belirler
                dispatch(setSelectedModel(defaultModel))
            } else if (davinci) {
                // alttaki amaç, uygulama ilk açıldığında firstOpen değeri true'dur ve remoteddaki davinci burada setlernir.
                // çünkü onun tokeni uzaktan belirlenir. 
                if (initialModel.firstOpen) {
                    dispatch(setSelectedModel(davinci)) // default true model yoksa, davinci yi seçili olarak berliler. 
                    //bunu eklemeyince defaultta reduxta belirtilen davinci seçili olur, onunda token sayısı 64
                }

            }
        }

        if (isForceUpdate == true) {
            CheckUpdate() // XNOTE: No info about this app. uyarısı geliyor iosta
        }

        dispatch(setAiErrorMessage(aiErrorMessage))
        dispatch(setAdFrequency(adFrequency))
        dispatch(setKey(key))
        dispatch(setLocalization("eng")) // NOTEX: info ile teli yerini çek
        navigation.navigate("MainScreen")
    }

    useEffect(() => {

 
        pushNotification()

        // applovin başlatıcısı
        // AppLovin recommends that you load ads during the window from 2–5 seconds after you initialize the SDK.
        AppLovinMAX.initialize("0h5xJAFXostbtQTKGweFkvQfI03rW63G9Xaz6PZlcLJrK2gDLmIkTLWZ8aRRM8yW0Vq9mLsGOWGuTBJe2JCofq", (configuration) => {
        });


        // remote config başlatıcısı
        remoteConfig.init()
        // versiyon kontrolü

        // //admob
        // //reklam başlatıcısı
        // mobileAds().initialize()
        //     .then(e => {
        //         setTimeout(async () => {
        //             await splash()
        //         }, 1000);
        //     })

        setTimeout(async () => {
            await splash()
        }, 2500);

    }, [])


    return (
        <View style={styles.container}>
            <Image
                source={require("../assets/image/app-icon.png")}
                style={styles.image}
            />
        </View>
    )
}

export default Splash

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.BLACK
    },
    image: {
        height: units.height / 4,
        width: units.height / 4
    }
})