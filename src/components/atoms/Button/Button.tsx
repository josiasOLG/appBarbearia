import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  TouchableOpacityProps,
} from 'react-native';
import CustomIcon from '../Icon/Icon';

interface ButtonProps extends TouchableOpacityProps {
  title?: string;
  iconName?: string;
  iconType?: string;
  iconSize?: number;
  iconColor?: string;
  backgroundColor: string;
}

const Button: React.FC<ButtonProps> = ({
  title,
  iconName,
  iconType,
  iconSize = 20,
  iconColor = '#fff',
  backgroundColor,
  style,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor}, style]}
      {...props}>
      {iconName && (
        <CustomIcon
          name={iconName}
          size={iconSize}
          color={iconColor}
          type={iconType}
        />
      )}
      {title && <Text style={styles.buttonText}>{title}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 5,
  },
});

export default Button;
