import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet, ScrollView, SafeAreaView } from 'react-native'
import React, { useState } from 'react'

import { units } from '../theme/Units'
import { useDispatch, useSelector } from 'react-redux'
import Fonts from '../theme/Fonts'
import { modelsDataSelector } from '../redux/ModelsDataRedux'
import Slider from '@react-native-community/slider';
import { colors } from '../theme/Colors'
import { selectedModelSelector, setSelectedModel } from '../redux/SelectedModelRedux'
import Back from '../assets/svgs/back.svg'
import { InterstitialAd, TestIds, AdEventType } from 'react-native-google-mobile-ads';

// deev modda iken test idsi yayında iken gerçek reklam idsi kullan
const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-9947689607597373/6400781490';

// Create a new instance
const interstitialAd = InterstitialAd.createForAdRequest(adUnitId);


export default function ChanceModel({ navigation }) {

    const dispatch = useDispatch()

    const models = useSelector(modelsDataSelector)
    const selectedModelInRedux = useSelector(selectedModelSelector)

    const [selectedAI, setSelectedAI] = useState(selectedModelInRedux)
    const [temperature, setTemperature] = useState(selectedModelInRedux.temperature)

    console.log(selectedAI, temperature)
    const onPressSave = () => {
        // seçilen model içerisine seçilen temperature'e eklenerek reduxa gönderilir
        dispatch(setSelectedModel({ ...selectedAI, temperature }))
        navigation.goBack()
    }

    const renderModels = ({ item, index }) => {
        return (
            <TouchableOpacity style={styles.modelWrapper} key={index} onPress={() => {
                setSelectedAI(item)
                // dispatch(item)
            }} >
                <View style={[
                    styles.modelImageWrapper,
                    item.name == selectedAI.name && { borderWidth: units.height / 200, borderColor: colors.GREEN, }
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

    const testAdd = () => {
        // Add event handlers
        interstitialAd.addAdEventsListener(({ type }) => {
            if (type === AdEventType.LOADED) {
                interstitialAd.show();
            }
        });
        // Load a new advert
        interstitialAd.load();
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <TouchableOpacity style={styles.backButton}
                        onPress={() => {
                            navigation.goBack()
                        }}>
                        <Back width={'70%'} height={'70%'} />
                    </TouchableOpacity>
                    {
                        selectedAI.name == "Ada" && temperature == "0.8" &&
                        <TouchableOpacity
                            style={{ height: 20, width: 20, backgroundColor: "black" }}
                            onPress={testAdd}
                        />
                    }
                </View>
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
                <View style={{ minHeight: units.height / 8.6 }}>
                    <Text style={styles.description}>{selectedAI.description}</Text>
                </View>
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
                        thumbTintColor={colors.GREEN}
                    />
                    <Text style={styles.temperatureMaxMin}>1</Text>
                </View>
                <TouchableOpacity onPress={onPressSave}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BLACK,
        paddingTop: units.height / 36,
        paddingHorizontal: units.width / 36
    },
    backButton: {
        height: units.height / 20,
        width: units.width / 10,
        alignSelf: 'flex-start',
    },
    title: {
        color: colors.GREEN,
        fontSize: Fonts.size(19),
        fontWeight: "bold",
        marginHorizontal: units.height / 70
    },
    description: {
        color: colors.WHITE,
        fontSize: Fonts.size(15),
        marginBottom: units.height / 70,
        marginHorizontal: units.height / 70,
    },
    flatListWrapper: {
        marginBottom: units.height / 70
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
        backgroundColor: colors.WHITE,
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
        color: colors.WHITE,
        fontSize: Fonts.size(14)
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
        color: colors.GREEN,
        fontSize: Fonts.size(27),
        alignSelf: "center",
        padding: units.width / 95,
        marginVertical: units.height / 50,
    }
})