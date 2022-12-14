import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setKey } from '../redux/KeyRedux'
import { setLocalization } from '../redux/LocalizationRedux'
import { setModelsData } from '../redux/ModelsDataRedux'
import { colors } from '../theme/Colors'
import { units } from '../theme/Units'
import { RemoteConfig } from '../firebase/RemoteConfig'
import { setSelectedModel } from '../redux/SelectedModelRedux'
// import VersionCheck from "react-native-version-check"
import mobileAds from 'react-native-google-mobile-ads';
import { setAdFrequency } from '../redux/AdFrequencyRedux'


const remoteConfig = new RemoteConfig()

const Splash = ({ navigation }) => {

    const dispatch = useDispatch()

    
    // Freedashboard 
    // const appVersionCheck = () => {
    //     VersionCheck.needUpdate()
    //         .then(async res => {
    //             console.log(res.isNeeded);    // true
    //             if (res.isNeeded) {
    //                 Linking.openURL(res.storeUrl);  // open store if update is needed.
    //             }
    //         })
    // }

    useEffect(() => {

        remoteConfig.init()
        // appVersionCheck()

        mobileAds().initialize() // Initialize the Google Mobile Ads SDK

        const splash = () => {

            setTimeout(async () => {
                const key = await remoteConfig.getKey()
                const models = await remoteConfig.getModels()
                const adFrequency = await remoteConfig.getAdFrequency()

                if (models.length != 0) { // olaki hiç model gelmese, reduxtaki default modeli silmesin diyr
                    dispatch(setModelsData(models))
                    // default=true olan modeli default model yapar
                    const defaultModel = models.find(e => e.default == true)
                    dispatch(setSelectedModel(defaultModel))
                }
                dispatch(setAdFrequency(adFrequency))
                dispatch(setKey(key))
                dispatch(setLocalization("eng")) // NOTEX: info ile teli yerini çek
                navigation.navigate("MainScreen")

            }, 1000);
        }

        splash()
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