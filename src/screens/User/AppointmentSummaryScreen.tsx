import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
  StatusBar,
} from 'react-native';
import {useSelector} from 'react-redux';
import colors from '../../styles/colors/Colors';
import typography from '../../styles/typographys/typography';
import CustomIcon from '../../components/atoms/Icon/Icon';
import LinearGradient from 'react-native-linear-gradient';

const AppointmentSummaryScreen: React.FC = ({route, navigation}) => {
  const {selectedServices} = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const service = useSelector((state: any) => state.service);
  const userRole = service.selectedService?.toLowerCase() || 'user';
  const themeColors = colors[userRole] || colors.user;

  const handleConfirm = () => {
    setModalVisible(false);
    navigation.navigate('ConfirmationScreen');
  };

  return (
    <LinearGradient colors={['#d2e2ef', '#f1f6fa']} style={styles.gradient}>
      <StatusBar backgroundColor={themeColors.primary} />
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require('../../assets/images/barber.jpg')}
            style={styles.barberImage}
          />
          <Text style={[styles.barberName, typography.bold]}>
            Josias Oliveira
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={[styles.label, typography.bold]}>Data:</Text>
          <Text style={styles.value}>2024-07-01</Text>
          <Text style={[styles.label, typography.bold]}>Hora:</Text>
          <Text style={styles.value}>10:00</Text>
          <Text style={[styles.label, typography.bold]}>Endereço:</Text>
          <Text style={styles.value}>Rua Exemplo, 123</Text>
          <Text style={[styles.label, typography.bold]}>Serviços:</Text>
          {selectedServices.map(service => (
            <Text key={service} style={styles.value}>
              {service}
            </Text>
          ))}
        </View>
        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: themeColors.primary}]}
            onPress={() => setModalVisible(true)}>
            <Text style={[styles.buttonTextLeft, typography.boldItalic]}>
              Agendar
            </Text>
            <CustomIcon
              name="check"
              color={'#FFF'}
              size={10}
              type="feather"
              style={[styles.buttonTextRight, typography.extraLightItalic]}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={[styles.modalText, typography.bold]}>
              Confirmar Agendamento?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[
                  styles.modalButton,
                  {backgroundColor: themeColors.primary},
                ]}
                onPress={handleConfirm}>
                <Text style={[styles.modalButtonText, typography.bold]}>
                  Confirmar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.modalButton,
                  {backgroundColor: themeColors.secondary},
                ]}
                onPress={() => setModalVisible(false)}>
                <Text style={[styles.modalButtonText, typography.bold]}>
                  Cancelar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  barberImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  barberName: {
    fontSize: 24,
  },
  infoContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    marginBottom: 5,
  },
  bottomButtonContainer: {
    padding: 16,
    marginTop: 'auto',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 20,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AppointmentSummaryScreen;
