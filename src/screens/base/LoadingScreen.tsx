import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ActivityIndicator, Modal} from 'react-native';

interface LoadingScreenProps {
  visible: boolean;
  message: string;
  onSuccess?: () => void;
  onError?: (errorMessage: string) => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  visible,
  message,
  onSuccess,
  onError,
}) => {
  useEffect(() => {
    if (visible) {
      // Simula uma operação assíncrona
      setTimeout(() => {
        if (Math.random() < 0.5) {
          onSuccess && onSuccess();
        } else {
          onError && onError('Ocorreu um erro. Por favor, tente novamente.');
        }
      }, 2000);
    }
  }, [visible]);

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.topSection}>
            <Text style={styles.loadingText}>{message || 'Carregando...'}</Text>
          </View>
          <View style={styles.middleSection}>
            <ActivityIndicator size="large" color="#624ED1" />
          </View>
          <View style={styles.bottomSection}>
            <Text style={styles.messageText}>Por favor, aguarde</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  topSection: {
    marginBottom: 30,
  },
  loadingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#624ED1',
  },
  middleSection: {
    marginBottom: 30,
  },
  bottomSection: {},
  messageText: {
    fontSize: 16,
    color: '#624ED1',
  },
});

export default LoadingScreen;
