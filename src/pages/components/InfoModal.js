import React, { useEffect, useState } from "react";
import { Alert, BackHandler, Button, Linking, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RemoteConfig } from "../../firebase/RemoteConfig";
import { infoModalIndexSelector, setInfoModalIndex } from "../../redux/InfoModalRedux";
import { colors } from "../../theme/Colors";
import Fonts from "../../theme/Fonts";
import { units } from "../../theme/Units";


const remoteConfig = new RemoteConfig()

const InfoModal = () => {

    const [infoData, setInfoData] = useState({})
    const [dontRemindChecked, setDontRemindChecked] = useState(false)

    const index = useSelector(infoModalIndexSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            const informationData = await remoteConfig.getInfoModal()
            // uygulama açıldığında gelen infonun indexi reduxtaki indexten büyükse modal açılır
            if (informationData.index > index) {
                setInfoData(informationData)
            } else {
                setInfoData({ visibility: false })
            }
        })()
    }, [])

    const onPressClose = () => {
        // tekrar hatırlatmaya tıklayıp okay e basarsa, info'nun indexi reduxa atılır,
        // bu sayede uygulama kapatılıp açıldığında bildirim tekrar çıkmaz
        if (dontRemindChecked) {
            dispatch(setInfoModalIndex(infoData.index))
            setInfoData({ visibility: false })
        } else {
            setInfoData({ visibility: false })
        }
    }

    const onPressUrl = () => {
        Linking.openURL(infoData.url)
    }

    return (
        <Modal transparent visible={infoData.visibility}>
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.modalView}>
                    <Text style={styles.title}>{infoData.title}</Text>
                    <Text style={styles.description}>{infoData.description}</Text>
                    <TouchableOpacity
                        style={styles.dontRemindButton}
                        onPress={() => setDontRemindChecked(!dontRemindChecked)}
                    >
                        <View style={styles.check}>
                            {
                                dontRemindChecked &&
                                <>
                                    <View style={styles.crossLine1} />
                                    <View style={styles.crossLine2} />
                                </>
                            }
                        </View>
                        <Text style={styles.dontRemindButtonText}>Don't remind me again</Text>
                    </TouchableOpacity>
                    <View style={styles.buttonsWrapper}>
                        <TouchableOpacity style={styles.button} onPress={onPressClose}>
                            <Text style={styles.buttonText}>Close</Text>
                        </TouchableOpacity>
                        {infoData.url != "" &&
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

export default InfoModal

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
    dontRemindButton: {
        paddingVertical: units.height / 288,
        marginTop: units.height / 36,
        borderColor: colors.BLACK,
        alignSelf: "flex-start",
        flexDirection: "row",
        alignItems: "center"
    },
    check: {
        height: units.height / 50,
        width: units.height / 50,
        borderWidth: 1,
        borderColor: colors.BLACK,
        marginRight: units.width / 72,
        justifyContent: "center",
        alignItems: "center",
    },
    crossLine1: {
        backgroundColor: colors.BLACK,
        height: units.height / 50,
        width: 1,
        transform: [{ rotate: "45deg" }]
    },
    crossLine2: {
        backgroundColor: colors.BLACK,
        height: 1,
        width: units.height / 50,
        position: "absolute",
        transform: [{ rotate: "45deg" }]
    },
    dontRemindButtonText: {
        color: colors.BLACK
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