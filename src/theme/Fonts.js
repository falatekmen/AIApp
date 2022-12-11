import { units } from './Units';

const type = {
  regular: '',
  bold: '',
};

const size = punto => units.height / (720 / punto);

export default {
  type,
  size,
};
