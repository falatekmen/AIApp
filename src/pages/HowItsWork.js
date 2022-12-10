import React, { useState } from "react";
import { SafeAreaView, TouchableOpacity, FlatList, View, Modal, StyleSheet, Text } from "react-native";

import { units } from "../theme/Units"
import Back from '../../src/assets/svgs/back.svg'


function Settings({ navigation }) {

    const [selectedCard, setSelectedCard] = useState({ "answer": "", "description": "", "question": "", "title": "" })
    console.log(selectedCard)
    const data = [
        {
            title: "Q&A",
            description: "Answer questions based on existing knowledge.",
            question: "Where is the Valley of Kings?",
            answer: "The Valley of Kings is located in Luxor, Egypt."
        },
        {
            title: "Grammar correction",
            description: "Corrects sentences into standard English.",
            question: "Correct this to standard English:\nShe no went to the market.",
            answer: "She did not go to the market."
        },
        {
            title: "Summarize for a 2nd grader",
            description: "Translates difficult text into simpler concepts",
            question: "Summarize this for a second-grade student:\nJupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass one-thousandth that of the Sun, but two-and-a-half times that of all the other planets in the Solar System combined. Jupiter is one of the brightest objects visible to the naked eye in the night sky, and has been known to ancient civilizations since before recorded history. It is named after the Roman god Jupiter.[19] When viewed from Earth, Jupiter can be bright enough for its reflected light to cast visible shadows,[20] and is on average the third-brightest natural object in the night sky after the Moon and Venus.",
            answer: "Jupiter is the fifth planet from the Sun and is very big and bright. It can be seen with our eyes in the night sky and it has been known since ancient times. Its name comes from the Roman god Jupiter. It is usually the third brightest object in the night sky after the Moon and Venus."
        },
        {
            title: "English to other languages",
            description: "Translates English text into French, Spanish and Japanese.",
            question: "Translate this into 1. French, 2. Spanish and 3. Japanese:\nWhat rooms do you have available?\n1.",
            answer: "Quels sont les chambres que vous avez disponibles?\n2. ¿Qué habitaciones tienes disponibles?\n3. どの部屋が利用可能ですか？"
        },
    ]

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

            <TouchableOpacity style={styles.backButton}
                onPress={() => {
                    navigation.goBack()
                }}>
                <Back width={'70%'} height={'70%'} />
            </TouchableOpacity>

            <FlatList
                data={data}
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

export default Settings;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    backButton: {
        height: units.height / 20,
        width: units.width / 10,
        alignSelf: 'flex-start',
        justifyContent: "center",
        alignItems: "center",
        marginLeft: units.height / 95,
        marginVertical: 5
    },
    cardContainer: {
        height: units.height / 9,
        width: units.width / 1.1,
        borderWidth: 1,
        borderColor: "#5ff736",
        borderRadius: units.height / 99,
        alignSelf: "center",
        marginVertical: 5
    },
    title: {
        fontSize: 20,
        textAlign: 'left',
        color: 'white',
        fontWeight: 'bold',
        marginHorizontal: 10,
        marginTop: 5,
    },
    description: {
        fontSize: 14,
        color: 'white',
        marginHorizontal: 10,
        marginTop: 5,
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
        backgroundColor: 'black',
        borderRadius: units.height / 99,
        minHeight: units.height / 6,
        width: units.width / 1.2,
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: '#5ff736',
        padding: units.height / 90,
    },
    questionText: {
        color: 'white',
        margin: units.width / 99,
    },
    answerBox: {
        margin: units.width / 99,
    },
    answerTag: {
        color: '#5ff736',
    },
    answerText: {
        color: 'white',
    },
})
