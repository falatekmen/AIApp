import { InterstitialAd, TestIds, AdEventType } from 'react-native-google-mobile-ads';

// deev modda iken test idsi yayında iken gerçek reklam idsi kullan
const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-9947689607597373/6400781490';

// Create a new instance
const interstitialAd = InterstitialAd.createForAdRequest(adUnitId);


export const ShowInterstitialAd = () => {
    // Add event handlers
    interstitialAd.addAdEventsListener(({ type }) => {
        if (type === AdEventType.LOADED) {
            interstitialAd.show();
        }
    });
    // Load a new advert
    interstitialAd.load();
}

