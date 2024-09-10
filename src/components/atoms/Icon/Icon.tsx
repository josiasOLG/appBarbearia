import React from 'react';
import {StyleSheet, TextStyle} from 'react-native';
import {Icon} from 'react-native-elements';

type IconProps = {
  name: string;
  size?: number;
  color?: string;
  style?: TextStyle;
  type?: 'font-awesome' | 'material' | 'feather';
};

const CustomIcon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = 'black',
  style,
  type = 'font-awesome',
}) => {
  return (
    <Icon name={name} size={size} color={color} type={type} style={style} />
  );
};

const styles = StyleSheet.create({
  icon: {},
});

export default CustomIcon;
