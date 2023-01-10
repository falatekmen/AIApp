/**
 * @format
 */

 import {AppRegistry} from 'react-native';
 import App from './src/App';
 import {name as appName} from './app.json';
 import 'react-native-url-polyfill/auto'
 import messaging from '@react-native-firebase/messaging';

// Background & Quit state messages
// To setup a background handler (for push notification), we called the
// setBackgroundMessageHandler outside of your application logic 

messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

 AppRegistry.registerComponent(appName, () => App);
 