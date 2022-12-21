import { View, Text, StyleSheet, Image, Alert, BackHandler, Linking } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setKey } from '../redux/KeyRedux'
import { setLocalization } from '../redux/LocalizationRedux'
import { setModelsData } from '../redux/ModelsDataRedux'
import { colors } from '../theme/Colors'
import { units } from '../theme/Units'
import { RemoteConfig } from '../firebase/RemoteConfig'
import { setSelectedModel } from '../redux/SelectedModelRedux'
import mobileAds from 'react-native-google-mobile-ads';
import { setAdFrequency } from '../redux/AdFrequencyRedux'
import CheckUpdate from '../utils/CheckUpdate'


const remoteConfig = new RemoteConfig()

const Splash = ({ navigation }) => {

    const dispatch = useDispatch()

    const splash = async () => {
        const key = await remoteConfig.getKey()
        const models = await remoteConfig.getModels()
        const adFrequency = await remoteConfig.getAdFrequency()

        if (models.length != 0) { //model gelmezse reduxtaki default model silinmesin
            dispatch(setModelsData(models))
            // default=true olan modeli default model yapar, yoksa kullanıcı son seçtiği modelden devam eder
            const defaultModel = models.find(e => e.default == true)
            if (defaultModel != undefined) {
                dispatch(setSelectedModel(defaultModel))
            }
        }
        dispatch(setAdFrequency(adFrequency))
        dispatch(setKey(key))
        dispatch(setLocalization("eng")) // NOTEX: info ile teli yerini çek
        navigation.navigate("MainScreen")
    }


    useEffect(() => {

        // remote config başlatıcısı
        remoteConfig.init()
        // versiyon kontrolü
        CheckUpdate()
        //reklam başlatıcısı
        mobileAds().initialize()
            .then(e => {
                setTimeout(async () => {
                    await splash()
                }, 1000);
            })
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