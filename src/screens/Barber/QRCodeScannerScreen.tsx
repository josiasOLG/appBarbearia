import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {RNCamera} from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import {hideLoading, showLoading} from '../../store/reducers/loading.reducer';

const QRCodeScannerScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [scanned, setScanned] = useState(false);

  const handleQRCodeRead = async (e: any) => {
    if (scanned) return;
    setScanned(true);
    const qrCodeValue = e.data;

    try {
      dispatch(showLoading('Processing QR Code...'));
      await axios.post('https://your-api-endpoint.com/endpoint', {
        qrCode: qrCodeValue,
      });
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'QR Code processed successfully!',
      });
      navigation.navigate('HomeScreen');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to process QR Code. Please try again.',
      });
    } finally {
      dispatch(hideLoading());
      setScanned(false);
    }
  };

  return (
    <View style={styles.container}>
      <QRCodeScanner
        onRead={handleQRCodeRead}
        flashMode={RNCamera.Constants.FlashMode.auto}
        topContent={
          <Text style={styles.centerText}>Scan the QR Code to proceed</Text>
        }
        bottomContent={
          <TouchableOpacity
            style={styles.buttonTouchable}
            onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  centerText: {
    fontSize: 18,
    color: '#777',
  },
  buttonTouchable: {
    padding: 16,
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
});

export default QRCodeScannerScreen;
