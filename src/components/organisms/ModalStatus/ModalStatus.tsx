import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import typography from '../../../styles/typographys/typography';

interface ModalStatusProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (reason?: string) => void;
  themeColors: any;
  title: string;
  description: string;
  showInput?: boolean;
  confirmText?: string;
}

const ModalStatus: React.FC<ModalStatusProps> = ({
  visible,
  onClose,
  onConfirm,
  themeColors,
  title,
  description,
  showInput = true,
  confirmText = 'Confirmar',
}) => {
  const [reason, setReason] = useState('');

  const handleConfirm = () => {
    onConfirm(showInput ? reason : undefined);
    setReason('');
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={[styles.modalView, {backgroundColor: themeColors.white}]}>
          <Text
            style={[
              styles.modalText,
              {color: themeColors.primary},
              typography.bold,
            ]}>
            {title}
          </Text>
          <Text
            style={[
              styles.modalDescription,
              {color: themeColors.primary},
              typography.light,
            ]}>
            {description}
          </Text>
          {showInput && (
            <TextInput
              style={[styles.input, {backgroundColor: themeColors.primary}]}
              placeholder="Digite o motivo"
              placeholderTextColor={themeColors.white}
              value={reason}
              onChangeText={setReason}
            />
          )}
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.button, {backgroundColor: themeColors.cancel}]}
              onPress={onClose}>
              <Text
                style={[
                  styles.buttonText,
                  {color: themeColors.buttonText},
                  typography.bold,
                ]}>
                Cancelar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, {backgroundColor: themeColors.primary}]}
              onPress={handleConfirm}>
              <Text
                style={[
                  styles.buttonText,
                  {color: themeColors.white},
                  typography.bold,
                ]}>
                {confirmText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 20,
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 14,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    color: '#fff',
    height: 100,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    borderRadius: 10,
    padding: 10,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
  },
});

export default ModalStatus;
