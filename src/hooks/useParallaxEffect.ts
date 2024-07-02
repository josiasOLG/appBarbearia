import {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

const HEADER_HEIGHT = 300;

export const useParallaxEffect = () => {
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, HEADER_HEIGHT],
        [HEADER_HEIGHT, 60],
        Extrapolate.CLAMP,
      ),
      opacity: interpolate(
        scrollY.value,
        [0, HEADER_HEIGHT],
        [1, 0],
        Extrapolate.CLAMP,
      ),
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [0, HEADER_HEIGHT],
            [0, -HEADER_HEIGHT / 2],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  });

  const fixedHeaderAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [HEADER_HEIGHT - 50, HEADER_HEIGHT],
        [0, 1],
        Extrapolate.CLAMP,
      ),
    };
  });

  return {
    scrollHandler,
    headerAnimatedStyle,
    fixedHeaderAnimatedStyle,
  };
};
