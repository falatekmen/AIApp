import { Alert, BackHandler, Linking } from "react-native";
import VersionCheck from "react-native-version-check";

// test etmek için build alırken versiyon numarasını store'dakinden bir düşük yap(büyük yapınca çalışmaz)
export default CheckUpdate = async () => {
    
    await VersionCheck.needUpdate()
        .then((response) => {  // {"currentVersion": "1.0.1", "isNeeded": false, "latestVersion": "1.0.1", "storeUrl": "https://play.google.com/store/apps/details?id=com.ekmen.aiapp&hl=en&gl=US"}
            if (response && response.isNeeded) {
                Alert.alert(
                    "Please Update",
                    "You will have to update your app to the latest version to continue using it.",
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