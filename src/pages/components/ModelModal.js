import { View, Text, Modal, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'

import { units } from '../../theme/Units'
import { useDispatch, useSelector } from 'react-redux'
import Fonts from '../../theme/Fonts'
import { modelsDataSelector } from '../../redux/ModelsDataRedux'
import Slider from '@react-native-community/slider';
import { colors } from '../../theme/Colors'
import { selectedModelSelector, setSelectedModel } from '../../redux/SelectedModelRedux'


export default function ModelModal() {

    const dispatch = useDispatch()

    const models = useSelector(modelsDataSelector)
    const selectedModelInRedux = useSelector(selectedModelSelector)

    const [selectedAI, setSelectedAI] = useState(selectedModelInRedux)
    const [temperature, setTemperature] = useState(0.6)

    const onPressSave = () => {
        // seçilen model içerisine seçilen temperature'e eklenerek reduxa gönderilir
        dispatch(setSelectedModel({ temperature, ...selectedAI }))

    }

    const renderModels = ({ item, index }) => {
        return (
            <TouchableOpacity style={styles.modelWrapper} key={index} onPress={() => {
                setSelectedAI(item)
                // dispatch(item)
            }} >
                <View style={[
                    styles.modelImageWrapper,
                    item.name == selectedAI.name && { borderWidth: units.height / 200, borderColor: colors.DARKGREEN, }
                ]}>
                    <Image
                        style={styles.modelImage}
                        source={{ uri: item.image }}
                    />
                </View>
                <Text style={styles.modelName}>{item.name}</Text>
            </TouchableOpacity>

        )
    }

    return (
        <Modal visible animationType="slide">
            <View style={styles.container}>
                <Text style={styles.title}>Models</Text>
                <Text style={styles.description}>
                    GPT-3 models can understand and generate natural language. There are few main models with different levels of power suitable for different tasks.
                </Text>
                <View style={styles.flatListWrapper}>
                    <FlatList
                        data={models}
                        renderItem={renderModels}
                        horizontal
                        contentContainerStyle={styles.flatListContainer}
                    />
                </View>
                <Text style={styles.title}>Description</Text>
                <Text style={styles.description}>{selectedAI.description}</Text>
                <Text style={styles.title}>Temperature</Text>
                <Text style={styles.description}>
                    Lowering temperature means it will take fewer risks, and completions will be more accurate and deterministic. Increasing temperature will result in more diverse completions. Try 1 for a more creative answer, and 0 for a well-defined answer.
                </Text>
                <Text style={styles.temperatureValue}>{temperature}</Text>
                <View style={styles.temperatureWrapper}>
                    <Text style={styles.temperatureMaxMin}>0</Text>
                    <Slider
                        style={styles.slider}
                        minimumValue={0}
                        maximumValue={1}
                        minimumTrackTintColor="#FFFFFF"
                        maximumTrackTintColor="#d3d3d3"
                        onSlidingComplete={(value) => { // onValueChange, anlık olarak seçilen değeri gösteriyor ama bug var
                            // seçilen rakan 0.6000000089 şeklinde geliyor. 
                            // toFixed ile onun ilk 2 hanesini alırı yani 0.6 elde ederiz.
                            // + eklememizin sebebi, toFixed number'i string'e çeviriyor. + koyarak onun tekrar number
                            // olmasını sağlıyoruz
                            setTemperature(+value.toFixed(1))
                        }}
                        value={temperature}
                        step={0.1} // kaçar kaçar artacağı
                    />
                    <Text style={styles.temperatureMaxMin}>1</Text>
                </View>
                <TouchableOpacity onPress={onPressSave}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            </View>
        </Modal >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BLACK,
        paddingTop: units.height / 25,
        paddingHorizontal: units.width / 36
    },
    title: {
        color: colors.DARKGREEN,
        fontSize: Fonts.size(18),
        fontWeight: "bold",
    },
    description: {
        color: colors.WHITE,
        fontSize: Fonts.size(17),
        marginBottom: units.height / 36
    },
    flatListWrapper: {
        marginBottom: units.height / 36
    },
    flatListContainer: {
        flexGrow: 1,
        justifyContent: 'center'
    },
    modelWrapper: {
        alignItems: "center"
    },
    modelImageWrapper: {
        width: units.height / 8.5,
        height: units.height / 8.5,
        backgroundColor: "white",
        borderRadius: units.height / 72,
        marginHorizontal: units.width / 72,
        justifyContent: "center",
        alignItems: "center"
    },
    modelImage: {
        width: units.height / 9.5,
        height: units.height / 9.5
    },
    modelName: {
        color: "white",
        fontSize: Fonts.size(17)
    },
    temperatureValue: {
        color: colors.WHITE,
        alignSelf: "center",
        fontSize: Fonts.size(19),
    },
    temperatureWrapper: {
        flexDirection: "row",
        marginTop: units.height / 40,
        justifyContent: "center"
    },
    slider: {
        width: units.width / 1.2
    },
    temperatureMaxMin: {
        color: colors.WHITE,
        fontSize: Fonts.size(20)
    },
    buttonText: {
        color: colors.DARKGREEN,
        fontSize: Fonts.size(35),
        alignSelf: "center",
        fontWeight: "bold",
        marginTop: units.height / 20
    }
})