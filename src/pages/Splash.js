import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Splash = ({ navigation }) => {

    setTimeout(() => {
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
        flex:1,
        justifyContent: "center",
        alignItems: "center",
    }
})