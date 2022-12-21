import React, { useState } from "react";
import { SafeAreaView, TouchableOpacity, FlatList, View, Modal, StyleSheet, Text } from "react-native";

import { units } from "../theme/Units"
import LeftArrowIcon from '../../src/assets/svgs/left-arrow.svg'
import Fonts from "../theme/Fonts";
import { colors } from '../theme/Colors'
import { HowDoesItWorkText } from "../localization/StaticTexts";


const HowDoesItWork = ({ navigation }) => {

    const [selectedCard, setSelectedCard] = useState({ "answer": "", "description": "", "question": "", "title": "" })
    const [modal, setModal] = useState(false)

    const renderFlatlistItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.cardContainer}
                onPress={() => {
                    setSelectedCard(item)
                    setModal(true)
                }}>

                <View>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => { navigation.goBack() }}>
                <LeftArrowIcon width={'100%'} height={'100%'} />
            </TouchableOpacity>
            <FlatList
                data={HowDoesItWorkText}
                renderItem={renderFlatlistItem}
            />
            <Modal
                style={styles.modal}
                visible={modal}
                transparent
                animationType='none'
            >
                <TouchableOpacity style={styles.modal_container} onPress={() => { setModal(false) }} >
                    <TouchableOpacity style={styles.modal_box} activeOpacity={1}>
                        <View >
                            <Text style={styles.questionText}>{">"} {selectedCard.question}</Text>
                            <View style={styles.answerBox}>
                                <Text
                                    style={styles.answerTag} >
                                    {">"} <Text style={styles.answerText} >{selectedCard.answer} </Text>
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>
        </SafeAreaView>
    );
}

export default HowDoesItWork;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BLACK,
    },
    backButton: {
        height: units.height / 19,
        width: units.width / 10,
        marginLeft: units.height / 95,
        marginVertical: units.width / 80,
    },
    cardContainer: {
        minHeight: units.height / 9,
        width: units.width / 1.1,
        borderWidth: 1,
        borderColor: colors.GREEN,
        borderRadius: units.height / 99,
        alignSelf: "center",
        marginVertical: units.width / 80,
        paddingBottom: units.width / 70,
    },
    title: {
        fontSize: Fonts.size(19),
        textAlign: 'left',
        color: colors.WHITE,
        fontWeight: 'bold',
        marginHorizontal: units.width / 36,
        marginTop: units.height / 200,
    },
    description: {
        fontSize: Fonts.size(13),
        color: colors.WHITE,
        marginHorizontal: units.width / 36,
        marginTop: units.height / 200,
    },
    modal: {
        flex: 1,
    },
    modal_container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal_box: {
        backgroundColor: colors.BLACK,
        borderRadius: units.height / 99,
        minHeight: units.height / 6,
        width: units.width / 1.2,
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: colors.GREEN,
        padding: units.height / 90,
    },
    questionText: {
        color: colors.WHITE,
        margin: units.width / 99,
        fontSize: Fonts.size(13),
    },
    answerBox: {
        margin: units.width / 99,
    },
    answerTag: {
        color: colors.GREEN,
    },
    answerText: {
        color: colors.WHITE,
        fontSize: Fonts.size(13),
    },
})
