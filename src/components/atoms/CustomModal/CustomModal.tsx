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
import CustomIcon from '../Icon/Icon';

interface CustomModalProps {
  visible?: boolean;
  title?: string;
  message?: any;
  showInput?: boolean;
  inputType?: 'email' | 'password' | 'text';
  inputValue?: string;
  onChangeInput?: (value: string) => void;
  onClose?: () => void;
  onSubmit?: () => void;
  closeButtonText?: string;
  submitButtonText?: string;
}

const CustomModal: React.FC<CustomModalProps> = ({
  visible = false,
  message = {title: '', mensagem: ''},
  showInput = false,
  inputType = 'text',
  inputValue = '',
  onChangeInput,
  onClose,
  onSubmit,
  closeButtonText,
  submitButtonText = 'Submit',
}) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.container}>
        <View style={styles.modal}>
          {closeButtonText && (
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <CustomIcon
                name="close"
                size={24}
                color="#FFFFFF"
                type="material"
              />
            </TouchableOpacity>
          )}
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
          <View style={styles.buttonContainer}>
            {closeButtonText && (
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={onClose}>
                <Text style={styles.buttonText}>{closeButtonText}</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[
                styles.button,
                styles.deleteButton,
                !closeButtonText && styles.singleButton, // Ajuste de estilo para um único botão
              ]}
              onPress={onSubmit || onClose}>
              <Text style={styles.buttonText}>{submitButtonText}</Text>
            </TouchableOpacity>
          </View>
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
    backgroundColor: '#1C1C1C',
    borderRadius: 10,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 10,
  },
  message: {
    color: '#B0B0B0',
    fontSize: 14,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    color: '#FFFFFF', // Texto do input
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#343434',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  singleButton: {
    width: '100%', // Largura 100% quando há apenas um botão
  },
});

export default CustomModal;
