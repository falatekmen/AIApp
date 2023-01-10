import { useEffect } from 'react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setKey } from '../redux/KeyRedux'
import { setLocalization } from '../redux/LocalizationRedux'
import { setAllModel } from '../redux/AllModelsRedux'
import { RemoteConfig } from '../firebase/RemoteConfig'
import { selectedModelSelector, setSelectedModel } from '../redux/SelectedModelRedux'
// import mobileAds from 'react-native-google-mobile-ads';
import { setAdFrequency } from '../redux/AdFrequencyRedux'
import CheckUpdate from '../utils/CheckUpdate'
import AppLovinMAX from "react-native-applovin-max";
import { setAiErrorMessage } from '../redux/AiErrorMessageRedux'
import { pushNotification } from '../firebase/PushNotification'
import { Text, TouchableOpacity, View } from 'react-native'
import { units } from '../theme/Units'
import { colors } from '../theme/Colors'
import Fonts from '../theme/Fonts'



const remoteConfig = new RemoteConfig()

const SplashLogics = ({ }) => {

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
    }



    const onPress = () => {
        pushNotification()

        AppLovinMAX.initialize("0h5xJAFXostbtQTKGweFkvQfI03rW63G9Xaz6PZlcLJrK2gDLmIkTLWZ8aRRM8yW0Vq9mLsGOWGuTBJe2JCofq", (configuration) => {
        });


        remoteConfig.init()

        setTimeout(async () => {
            await splash()
        }, 2500);

    }



    return (
        <View style={{
            width: units.width / 1.5,
            paddingVertical: units.height / 72,
            backgroundColor: "white",
            alignSelf: "center",
            alignItems: "center",
            borderWidth: 1,
            borderRadius: units.height / 72,
            marginTop: units.height / 72,
            paddingHorizontal: units.width / 100
        }}>
            <Text style={{
                color: colors.BLACK,
                fontSize: Fonts.size(17),
                textAlign: "center"
            }}
            > Can't connect to the network. Please check your internet connection.</Text>
            <TouchableOpacity style={{
                width: units.width / 3,
                paddingVertical: units.height / 288,
                justifyContent: "center",
                alignItems: "center",
                marginTop: units.height / 72,
                borderWidth: 1,
                borderColor: colors.BLACK,
                borderRadius: units.height / 72,
            }}
                onPress={onPress}
            >
                <Text style={{
                    color: colors.BLACK,
                    fontSize: Fonts.size(17),
                }}>Try Again</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SplashLogics
