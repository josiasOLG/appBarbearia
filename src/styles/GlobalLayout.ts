import {PixelRatio, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const scaleLayout = (size: number): number =>
  PixelRatio.getPixelSizeForLayoutSize(size);

interface LayoutSizes {
  screenWidth: number;
  screenHeight: number;
  paddingSmall: number;
  paddingMedium: number;
  paddingLarge: number;
}

const layout: LayoutSizes = {
  screenWidth: width,
  screenHeight: height,
  paddingSmall: scaleLayout(8),
  paddingMedium: scaleLayout(16),
  paddingLarge: scaleLayout(24),
};

export default layout;
