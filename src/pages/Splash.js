import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setKey } from '../redux/KeyRedux'
import { setLocalization } from '../redux/LocalizationRedux'
import { setModelsData } from '../redux/ModelsDataRedux'
import AppIcon from '../assets/svgs/app-icon.svg'
import { colors } from '../theme/Colors'
import { units } from '../theme/Units'
import { RemoteConfig } from '../firebase/RemoteConfig'

const remoteConfig = new RemoteConfig()


const Splash = ({ navigation }) => {

    const dispatch = useDispatch()


    const data = [
        {
            name: "Davinci",
            model: "text-davinci-003",
            description: "Most capable GPT-3 model. Can do any task the other models can do, often with higher quality, longer output and better instruction-following. Also supports inserting completions within text.",
            image: "https://user-images.githubusercontent.com/81239267/206864938-6388036c-93c5-4c96-9047-1bbbf32b46d8.png"
        },
        {
            name: "Curie",
            model: "text-curie-001",
            description: "Very capable, but faster and lower cost than Davinci.",
            image: "https://user-images.githubusercontent.com/81239267/206865339-ab7407b1-0d9d-44f0-856f-658709357262.png"

        },
        {
            name: "Babbage",
            model: "text-babbage-001",
            description: "Capable of straightforward tasks, very fast, and lower cost.",
            image: "https://user-images.githubusercontent.com/81239267/206865992-90cce3b4-6685-4273-8136-c9fe44de2e7e.png"

        },
        {
            name: "Ada",
            model: "text-ada-001",
            description: "Capable of very simple tasks, usually the fastest model in the GPT-3 series, and lowest cost.",
            image: "https://user-images.githubusercontent.com/81239267/206866218-653e2419-214c-41b3-af2f-e85e288c0c77.png"
        }
    ]




    useEffect(() => {

        remoteConfig.init()


        const splash = () => {
            setTimeout(async () => {
                //message to be shown in the alert
                const message = await remoteConfig.getKey()
                console.log(message)


                dispatch(setLocalization("eng")) // NOTEX: info ile teli yerini çek
                dispatch(setKey(""))
                dispatch(setModelsData(data))
                navigation.navigate("MainScreen")
            }, 500);
        }

        splash()
    }, [])




    return (
        <View style={styles.container}>
            <AppIcon height={units.height / 8} width={units.height / 8} />
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
    }
})