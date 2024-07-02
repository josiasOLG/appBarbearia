// components/molecules/ActionButton/ActionButton.tsx
import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import CustomIcon from '../../atoms/Icon/Icon';
import typography from '../../../styles/typographys/typography';

interface ActionButtonProps {
  onPress: () => void;
  text: string;
  iconName: string;
  errorMessage?: string;
  errorColor?: string;
  backgroundColor?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  onPress,
  text,
  iconName,
  errorMessage,
  errorColor,
  backgroundColor,
}) => {
  return (
    <View style={styles.container}>
      {errorMessage && (
        <Text
          style={[
            styles.errorMessage,
            {
              backgroundColor: errorColor || '#721c24',
            },
          ]}>
          {errorMessage}
        </Text>
      )}
      <TouchableOpacity
        style={[styles.button, {backgroundColor: backgroundColor || '#4231a4'}]}
        onPress={onPress}>
        <Text style={[styles.buttonTextLeft, typography.extraLightItalic]}>
          {text}
        </Text>
        <Text style={[styles.buttonTextRight, typography.boldItalic]}>
          <CustomIcon name={iconName} size={20} color="#fff" />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: '#4231a4',
    borderRadius: 50,
  },
  buttonTextLeft: {
    flex: 1,
    fontSize: 18,
    color: '#fff',
    textAlign: 'left',
  },
  buttonTextRight: {
    flex: 1,
    fontSize: 18,
    color: '#fff',
    textAlign: 'right',
  },
  errorMessage: {
    fontSize: 16,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
});

export default ActionButton;
