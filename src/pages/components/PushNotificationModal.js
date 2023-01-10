import React, { useEffect, useState } from "react";
import { Alert, BackHandler, Button, Linking, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RemoteConfig } from "../../firebase/RemoteConfig";
import { infoModalIndexSelector, setInfoModalIndex } from "../../redux/InfoModalRedux";
import { colors } from "../../theme/Colors";
import Fonts from "../../theme/Fonts";
import { units } from "../../theme/Units";



const PushNotificationModal = ({ message }) => {

    const [visibility, setVisibility] = useState(false)

    useEffect(() => {
        // gelen bildirimde notification parametresi dolu ise modal açılır
        // message.notification dolu hali = {"android": {}, "body": "Davinci is online", "title": "Hey"} 
        if (message.notification) {
            setVisibility(true)
        }
    }, [message]) // bağımlı değiikene message'yi ekleyerek her bildirim geldiğinde buranın tekrar çalışmasını sağlıyoruz

    const onPressClose = () => {
        setVisibility(false)
    }

    const onPressUrl = () => {
        Linking.openURL(message?.data?.url)
    }

    return (
        <Modal transparent visible={visibility}>
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.modalView}>
                    <Text style={styles.title}>{message?.notification?.title}</Text>
                    <Text style={styles.description}>{message?.notification?.body}</Text>

                    <View style={styles.buttonsWrapper}>
                        <TouchableOpacity style={styles.button} onPress={onPressClose}>
                            <Text style={styles.buttonText}>Close</Text>
                        </TouchableOpacity>
                        {message?.data?.url != undefined &&
                            <TouchableOpacity style={styles.button} onPress={onPressUrl}>
                                <Text style={styles.buttonText}>Go to page</Text>
                            </TouchableOpacity>
                        }
                    </View>
                </ScrollView>
            </View>
        </Modal>

    )
}

export default PushNotificationModal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.7)",
        width: units.width,
        height: units.height,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row" //alttaki scrollview'de alignSelf işe yarasında diye
    },
    modalView: {
        width: units.width / 1.05,
        backgroundColor: colors.WHITE,
        paddingVertical: units.height / 36,
        borderRadius: units.height / 72,
        paddingHorizontal: units.width / 17,
        alignSelf: "center"
    },
    title: {
        color: colors.BLACK,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: Fonts.size(17)
    },
    description: {
        color: colors.BLACK,
        marginTop: units.height / 70,
        fontSize: Fonts.size(17)
    },
    buttonsWrapper: {
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    button: {
        width: units.width / 3,
        paddingVertical: units.height / 288,
        justifyContent: "center",
        alignItems: "center",
        marginTop: units.height / 36,
        borderWidth: 1,
        borderColor: colors.BLACK,
        borderRadius: units.height / 72,
    },
    buttonText: {
        color: colors.BLACK,
        fontSize: Fonts.size(17)

    }
})