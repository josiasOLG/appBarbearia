import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import CustomModal from '../../components/atoms/CustomModal/CustomModal';
import typography from '../../styles/typographys/typography';
import {useSelector} from 'react-redux';
import colors from '../../styles/colors/Colors';

const QRCodeScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {qrCodeUrl} = route.params;
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState({title: '', mensagem: ''});
  const user = useSelector((state: any) => state.user);
  const userRole = user.user.type?.toLowerCase() || 'user';
  const themeColors = colors[userRole] || colors.user;

  const handleCloseModal = () => {
    setModalVisible(false);
    navigation.navigate('HomeScreen');
  };

  const formatQRCode = (code: string) => {
    return code.split('').map((char, index) => (
      <Text key={index} style={styles.qrChar}>
        {char}
      </Text>
    ));
  };

  return (
    <View style={[styles.container, {backgroundColor: themeColors.secondary}]}>
      <View style={styles.containerBody}>
        <View style={styles.containerHeader}>
          <Text style={styles.title}>Scan QR Code</Text>
          <Text style={styles.subtitle}>Use seus pontos</Text>
          <Text style={styles.description}>
            Após a leitura do QR Code pelo barbeiro, seus pontos serão debitados
            e o serviço será liberado.
          </Text>
        </View>
        {qrCodeUrl ? (
          <View style={styles.qrCodeContainer}>{formatQRCode(qrCodeUrl)}</View>
        ) : (
          <ActivityIndicator size="large" color="#000" />
        )}
        {loading && <ActivityIndicator size="large" color="#000" />}
      </View>

      <CustomModal
        visible={modalVisible}
        message={modalMessage}
        onClose={handleCloseModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  containerBody: {
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingBottom: 80,
    paddingTop: 80,
    padding: 0,
    borderRadius: 20,
  },
  containerHeader: {
    padding: 20,
    backgroundColor: 'transparent',
    marginBottom: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    ...typography.bold,
  },
  subtitle: {
    marginBottom: 10,
    textAlign: 'center',
    ...typography.regular,
  },
  description: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
    ...typography.light,
  },
  qrCodeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 20,
  },
  qrChar: {
    fontSize: 40,
    textAlign: 'center',
    margin: 5,
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
  },
});

export default QRCodeScreen;
