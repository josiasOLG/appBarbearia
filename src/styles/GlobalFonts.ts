import {PixelRatio} from 'react-native';

const scaleFont = (size: number): number => size * PixelRatio.getFontScale();

interface FontSizes {
  title: number;
  body: number;
  caption: number;
}

const fonts: FontSizes = {
  title: scaleFont(24),
  body: scaleFont(16),
  caption: scaleFont(12),
};

export default fonts;
