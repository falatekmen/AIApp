import remoteConfig from '@react-native-firebase/remote-config';


export class RemoteConfig {

    // fetches the remote config data from firebase
    async init() {
        remoteConfig().fetch(1).then(() => {
            remoteConfig().activate()
        })
            .catch(error => { })
    }

    getAll() {
        const allParams = remoteConfig().getAll()
        return allParams
    }


    async getKey() {

        const defaultData = ""
        const remoteData = await remoteConfig().getValue("keyz")._value

        if (remoteData !== "") {
            return JSON.parse(remoteData)
        }

        return defaultData
    }

    async getModels() {

        const defaultData = []

        const remoteData = await remoteConfig().getValue("models")._value

        if (remoteData !== "") {
            return JSON.parse(remoteData)
        }

        return defaultData
    }

    async getAdFrequency() {

        const defaultData = 5

        const remoteData = await remoteConfig().getValue("ad_frequency")._value

        if (remoteData !== "") {
            return JSON.parse(remoteData)
        }

        return defaultData
    }


    async getForceUpdate() {
        const defaultData = false

        const remoteData = await remoteConfig().getValue("force_update")._value

        if (remoteData !== "") {
            return JSON.parse(remoteData)
        }
        return defaultData
    }

    async getInfoModal() {
        const remoteData = await remoteConfig().getValue("info_modal")._value

        const defaultData = { visibility: true, index: 0, title: "Welcome", description: "Please contact us by email ekmendev@gmail.com for the errors you encounter in the application and the features you want to be added." }

        if (remoteData !== "") {
            return JSON.parse(remoteData)
        }
        return defaultData
    }

    async getAiErrorMessage() {
        const remoteData = await remoteConfig().getValue("ai_error_message")._value

        if (remoteData !== "") {
            return JSON.parse(remoteData)
        }
        return "The system is currently under maintenance. Please restart the application after waiting a few minutes."
    }

    // getAdvertWithPhotoParameters() {

    //     const defaultData = {
    //         backgroundColor: "#F5F5F5",
    //         textColor: "#000000",
    //         ctaTextColor: "#957DAD",
    //         text: "Sevcan Gökmen Konuşarak Öğren ile İngilizce Konuşuyor.",
    //         ctaText: "Sıra sende",
    //     }

    //     const remoteData = remoteConfig().getValue("advert_with_photo")._value

    //     // 'status' prop sending to advert at the bottom for image
    //     if (remoteData !== "") {
    //         return { data: JSON.parse(remoteData), status: true }
    //     }

    //     return { data: defaultData, status: false }
    // }



}
