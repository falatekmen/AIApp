import {useSelector} from 'react-redux';
import {localizationSelector} from '../redux/LocalizationRedux';

import {turkish} from '../localization/Turkish';
import {english} from '../localization/English';
// import useAnalytics from './useAnalytics';

//XNOTE: analytics ekle
export function useLocalization() {
  const language = useSelector(localizationSelector);
  // const analytics = useAnalytics();

  switch (language) {
    case 'eng':
      // analytics.useCustomAnalytics('language', 'eng');
      return english;
    default:
      // analytics.useCustomAnalytics('language', 'tr');
      return turkish;
  }
}
