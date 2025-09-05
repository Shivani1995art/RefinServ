import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { moderateScale } from 'react-native-size-matters';

export const fs = (size: number, factor: number = 0.5) => {
  return moderateScale(size, factor);
};

export { wp, hp };
