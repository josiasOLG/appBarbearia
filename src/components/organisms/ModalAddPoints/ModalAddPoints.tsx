import React from 'react';
import {View, Text, StyleSheet, Modal, TouchableOpacity} from 'react-native';
import typography from '../../../styles/typographys/typography';

interface ModalAddPointsProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  themeColors: any;
  title: string;
  description: string;
  confirmText?: string;
}

const ModalAddPoints: React.FC<ModalAddPointsProps> = ({
  visible,
  onClose,
  onConfirm,
  themeColors,
  title,
  description,
  confirmText = 'Confirmar',
}) => {
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
              onPress={onConfirm}>
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

export default ModalAddPoints;
