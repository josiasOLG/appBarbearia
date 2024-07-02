import React from 'react';
import {View, StyleSheet, Animated, Easing, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: number;
  marginBottom?: number;
  marginTop?: number;
  marginLeft?: number;
  marginRight?: number;
  backgroundColor?: string;
  shimmerColors?: string[];
  children?: React.ReactNode;
}

const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 20,
  borderRadius = 4,
  marginBottom = 0,
  marginTop = 0,
  marginLeft = 0,
  marginRight = 0,
  backgroundColor = '#e0e0e0',
  shimmerColors = ['#e0e0e0', '#f0f0f0', '#e0e0e0'],
  children,
}) => {
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const screenWidth = Dimensions.get('window').width;

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [animatedValue]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-screenWidth, screenWidth],
  });

  return (
    <View
      style={[
        styles.container,
        {
          width,
          height,
          borderRadius,
          marginBottom,
          marginTop,
          marginLeft,
          marginRight,
          backgroundColor,
        },
      ]}>
      <Animated.View
        style={[
          styles.shimmerWrapper,
          {
            transform: [{translateX}],
          },
        ]}>
        <LinearGradient
          colors={shimmerColors}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}
          style={[styles.shimmer, {width: screenWidth * 2, height}]}
        />
      </Animated.View>
      {children && <View style={styles.content}>{children}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    position: 'relative',
  },
  shimmerWrapper: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  shimmer: {
    height: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Skeleton;
