import { units } from './Units';

const type = {
  regular: '',
  bold: '',
};

const size = punto => {
  if (units.height / units.width < 1.79) {
    return units.height / (720 / punto)
  } else {
    return (units.height / (720 / punto)) * 0.85
  }
};

export default {
  type,
  size,
};
