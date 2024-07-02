import {PixelRatio} from 'react-native';

const scaleImage = (size: number): number =>
  PixelRatio.getPixelSizeForLayoutSize(size);

interface IconSizes {
  width: number;
  height: number;
}

interface ImageSizes {
  smallIcon: IconSizes;
  mediumIcon: IconSizes;
  largeIcon: IconSizes;
}

const GlobalImages: ImageSizes = {
  smallIcon: {
    width: scaleImage(20),
    height: scaleImage(20),
  },
  mediumIcon: {
    width: scaleImage(60),
    height: scaleImage(60),
  },
  largeIcon: {
    width: scaleImage(80),
    height: scaleImage(80),
  },
};

export default GlobalImages;
