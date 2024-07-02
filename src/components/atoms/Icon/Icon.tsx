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
  const iconStyle = [styles.icon, {fontSize: size, color}, style];

  return <Icon name={name} color={color} type={type} style={iconStyle} />;
};

const styles = StyleSheet.create({
  icon: {},
});

export default CustomIcon;
