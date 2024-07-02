import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator, Modal} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

interface LoadingScreenProps {
  visible: boolean;
  onSuccess: () => void;
  onError: (errorMessage: string) => void;
  successScreen: string;
  errorScreen: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  visible,
  onSuccess,
  onError,
  successScreen,
  errorScreen,
}) => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (visible) {
      // Simula uma operação assíncrona
      setTimeout(() => {
        setIsLoading(false);
        if (Math.random() < 0.5) {
          onSuccess();
        } else {
          onError('Ocorreu um erro. Por favor, tente novamente.');
        }
      }, 2000);
    }
  }, [visible]);

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.topSection}>
            <Text style={styles.loadingText}>Carregando...</Text>
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
