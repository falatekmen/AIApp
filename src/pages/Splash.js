import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
import { setKey } from '../redux/KeyRedux'
import { setLocalization } from '../redux/LocalizationRedux'

const Splash = ({ navigation }) => {

    const dispatch = useDispatch()

    setTimeout(() => {
        dispatch(setLocalization("eng"))
        dispatch(setKey(""))
        dispatch(setModels)
        navigation.navigate("MainScreen")
    }, 500)

    return (
        <View style={styles.container}>
            <Text>UYGULAMA ICONU</Text>
        </View>
    )
}

export default Splash

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})