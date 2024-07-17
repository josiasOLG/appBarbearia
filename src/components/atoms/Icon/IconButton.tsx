import React from 'react';
import {TouchableOpacity, Text, StyleSheet, ViewStyle} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import typography from '../../../styles/typographys/typography';
import {useSelector} from 'react-redux';
import colors from '../../../styles/colors/Colors';

interface IconButtonProps {
  onPress: () => void;
  text: string;
  iconName: string;
  style?: ViewStyle; // Adicionando prop para estilos personalizados
  textColor?: string; // Adicionando prop para cor do texto
}

const IconButton: React.FC<IconButtonProps> = ({
  onPress,
  text,
  iconName,
  style,
  textColor = '#333', // Valor padrão para a cor do texto
}) => {
  return (
    <TouchableOpacity
      style={StyleSheet.flatten([styles.button, style])}
      onPress={onPress}>
      {/* <Icon name={iconName} size={20} color={textColor} /> */}
      <Text style={[styles.text, typography.bold, {color: textColor}]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e7e7e7b3',
    padding: 25,
    borderRadius: 10,
  },
  text: {
    marginLeft: 10,
    fontSize: 14,
    textTransform: 'uppercase',
  },
});

export default IconButton;
