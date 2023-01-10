import Clipboard from '@react-native-clipboard/clipboard';
import messaging from '@react-native-firebase/messaging';

export async function CopyFirebaseToken() {
    await messaging().getToken().then(e => {
        Clipboard.setString(e);
    })

}

