import { Alert, BackHandler, Linking } from "react-native";
import VersionCheck from "react-native-version-check";

// test etmek için build alırken versiyon numarasını store'dakinden bir düşük yap(büyük yapınca çalışmaz)
export default CheckUpdate = async () => {

    await VersionCheck.needUpdate()
        .then((response) => {  // {"currentVersion": "1.0.1", "isNeeded": false, "latestVersion": "1.0.1", "storeUrl": "https://play.google.com/store/apps/details?id=com.ekmen.aiapp&hl=en&gl=US"}
            if (response && response.isNeeded) {
                Alert.alert(
                    "Please Update",
                    "The new version of the application is ready.\n\nIf you don't see the new app in the store, please wait a few minutes and try again later.",
                    [
                        {
                            text: "Update",
                            onPress: () => {
                                BackHandler.exitApp();
                                Linking.openURL(response.storeUrl)
                            }
                        }
                    ]
                )
            }
        })
}