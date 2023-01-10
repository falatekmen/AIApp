import { Alert, Linking } from "react-native";
import messaging from '@react-native-firebase/messaging'

// Aşağıdaki dosyada pushNotification fonksiyonu ile push notification almak için kullanıcıyı firebase cloud messagin’e subscribe ediyoruz. Bunu yapmak zorundayız. Ayrıca notification ile link gönderme işlemleride aşağıda mevcut.
export const pushNotification = () => {

  // subscribing to fcm for receive push notification
  messaging()
    // users topic’ine subscribe yaptık 
    .subscribeToTopic('users')
    .then(() => console.log('Subscribed to topic!'));

  // for send a link with push notification, in step 5 (additional options). 
  // in sending cloud messaging from firebase custom data key must be "url" 
  // and value must be a link.

  messaging()
    // allows to open the link sent when clicking the notification 
    // while the app is in the background
    .onNotificationOpenedApp(remoteMessage => {
      if (remoteMessage.data.url) {
        Linking.openURL(remoteMessage.data.url)
      }
    });

  messaging()
    // allows to open the link sent when clicking the notification 
    // while the app is in closed
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        if (remoteMessage.data.url) {
          Linking.openURL(remoteMessage.data.url)
        }
      }
    });

}

// this alert pops up before notification permissions
export const alertBeforeNotificationPermission = async () => {
  const pushNotificationAPNsPermissions = async () => {
    if (Platform.OS === "ios") {
      const authStatus = await messaging().requestPermission()
    }
  }

  if (Platform.OS === "ios") {
    const alertShowed = true
    if (alertShowed ) {
      Alert.alert("", "iOS Bildirim İzni Mesajı", [{ text: "Tamam", onPress: pushNotificationAPNsPermissions }])
      // AsyncStorage.setItem("alert", "true")
    }
  }
}
