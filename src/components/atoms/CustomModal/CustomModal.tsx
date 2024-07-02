import React from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import typography from '../../../styles/typographys/typography';
import IconButton from '../Icon/IconButton';
import CustomIcon from '../Icon/Icon';

interface CustomModalProps {
  visible: boolean;
  title: string;
  message: any;
  showInput?: boolean;
  inputType?: 'email' | 'password' | 'text';
  inputValue?: string;
  onChangeInput?: (value: string) => void;
  onClose: () => void;
  onSubmit?: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  message,
  showInput = false,
  inputType = 'text',
  inputValue = '',
  onChangeInput,
  onClose,
  onSubmit,
}) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.container}>
        <View style={styles.modal}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <CustomIcon name="close" size={24} color="#000" type="material" />
          </TouchableOpacity>
          <Text style={[styles.title, typography.bold]}>{message.title}</Text>
          <Text style={[styles.message, typography.light]}>
            {message.mensagem}
          </Text>
          {showInput && (
            <TextInput
              style={styles.input}
              onChangeText={onChangeInput}
              value={inputValue}
              keyboardType={inputType === 'email' ? 'email-address' : 'default'}
              secureTextEntry={inputType === 'password'}
            />
          )}
          <IconButton
            iconName="map-marker"
            text="Enviar email"
            onPress={onSubmit || onClose}
            style={styles.button}
            textColor="#fff"
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modal: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  title: {
    color: '#7b67e9',
    fontSize: 24,
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
  button: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#7b67e9',
    borderRadius: 5,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CustomModal;
