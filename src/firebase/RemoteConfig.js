import remoteConfig from '@react-native-firebase/remote-config';


export class RemoteConfig {
    
    // fetches the remote config data from firebase
    async init() {
        remoteConfig().fetch(0).then(() => {
            remoteConfig().activate()
        })
            .catch(error => { })
    }

   async getKey() {
        // default data for store review screen
        const defaultData = ""

        // get data for store review screen from remote config
        const remoteData = await remoteConfig().getValue("key")._value

        // if the data was taken from the remote config, return remoteData
        if (remoteData !== "") {
            return JSON.parse(remoteData)
        }

        // if data is not retrieved from remote config, nothing returns on top, 
        // default data return on the bottom
        return defaultData
    }

    // getAdvertAtTopParameters() {

    //     const defaultData = {
    //         textColor: "#FFFFFF",
    //         logoBackgroundColor: "#E5DFEB",
    //         textBackgroundColor: "#957DAD",
    //         text: "Akıcı İngilizce Konuş",
    //     }

    //     const remoteData = remoteConfig().getValue("advert_at_top")._value

    //     if (remoteData !== "") {
    //         return JSON.parse(remoteData)
    //     }

    //     return defaultData
    // }

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