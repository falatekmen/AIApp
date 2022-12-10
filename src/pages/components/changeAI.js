import { View, Text, Modal, ScrollView, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useState } from 'react'
import { units } from '../../theme/Units'
import { SvgUri } from 'react-native-svg'
import A from '../../assets/svgs/a.svg'
import { useSelector } from 'react-redux'
import Fonts from '../../theme/Fonts'
// modeller:https://beta.openai.com/docs/models/gpt-3
export default function ChangeAIModal() {

    const [selectedAI, setSelectedAI] = useState("Davinci")


    // const data = useSelector()

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


    const renderModels = ({ item, index }) => {
        console.log(item)
        return (
            <TouchableOpacity style={{ alignItems: "center" }} onPress={() => setSelectedAI(item)} key={index}>
                <View style={[{
                    width: units.height / 8.5,
                    height: units.height / 8.5,
                    backgroundColor: "white",
                    borderRadius: units.height / 72,
                    marginHorizontal: units.width / 72,
                    justifyContent: "center",
                    alignItems: "center"
                }, item.name == selectedAI.name && { borderWidth: units.height / 200, borderColor: "green", }

                ]}>
                    <Image
                        style={{ width: units.height / 9.5, height: units.height / 9.5, }}
                        source={{ uri: item.image }}
                    />
                </View>
                <Text style={{ color: "white", fontSize: Fonts.size(17) }}>{item.name}</Text>
            </TouchableOpacity>

        )
    }

    return (
        <Modal visible animationType="slide">
            <View style={{ flex: 1, backgroundColor: "black", paddingVertical: units.height / 18, paddingHorizontal: units.width / 36 }}>
                <Text style={{ color: "white", fontSize: Fonts.size(17) }}>
                    GPT-3 models can understand and generate natural language. There are few main models with different levels of power suitable for different tasks.
                </Text>
                <View style={{ marginTop: units.height / 36, }}>
                    <FlatList
                        data={data}
                        renderItem={renderModels}
                        horizontal
                        contentContainerStyle={{
                            // bu iki stillendirme ile flatlistin ortalanması sağlanır
                            flexGrow: 1,
                            justifyContent: 'center'
                        }}
                    />

                </View>
                <Text style={{ color: "white", marginTop: units.height / 36, fontSize: Fonts.size(17) }}>Description</Text>
                <Text style={{ color: "white", fontSize: Fonts.size(17) }}>{selectedAI.description}</Text>
            </View>
        </Modal >
    )
}