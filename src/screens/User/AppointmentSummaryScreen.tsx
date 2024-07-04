import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import {useSelector} from 'react-redux';
import colors from '../../styles/colors/Colors';
import typography from '../../styles/typographys/typography';
import CustomIcon from '../../components/atoms/Icon/Icon';
import LinearGradient from 'react-native-linear-gradient';
import ProfileCard from '../../components/molecules/ProfileCard/ProfileCard';
import InfoCard from '../../components/molecules/InfoCard/InfoCard';
import ConfirmationModal from '../../components/organisms/ConfirmationModal/ConfirmationModal';
import {formatDateToBrazilianPortuguese} from '../../utils/utils';
import {AddressService} from '../../api/AddressService';
import {AppointmentService} from '../../api/AppointmentService';
import {CommonActions} from '@react-navigation/native';

const AppointmentSummaryScreen: React.FC = ({route, navigation}) => {
  const {selectedServices, date, time, barber} = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [address, setAddress] = useState('');
  const user = useSelector((state: any) => state.user);
  const userRole = user.user.type?.toLowerCase() || 'user';
  const themeColors = colors[userRole] || colors.user;

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const fetchedAddress = await AddressService.getAddressByUserId(
          barber.id,
        );
        setAddress(fetchedAddress);
      } catch (error) {
        console.error('Failed to fetch address:', error);
      }
    };
    fetchAddress();
  }, [barber.id]);

  const handleConfirm = async () => {
    try {
      const appointmentData = {
        userId: user.user.id,
        barberId: barber.id,
        date,
        time,
        service: selectedServices,
        notes: '',
      };

      const response = await AppointmentService.createAppointment(
        appointmentData,
      );
      if (response) {
        setModalVisible(false);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'HomeScreen'}],
          }),
        );
      }
    } catch (error) {
      console.error('Failed to create appointment:', error);
    }
  };

  const formattedDate = formatDateToBrazilianPortuguese(date);

  return (
    <LinearGradient colors={['#d2e2ef', '#f1f6fa']} style={styles.gradient}>
      <StatusBar backgroundColor={themeColors.primary} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <ProfileCard barber={barber} />
          <View>
            <View style={styles.row}>
              <InfoCard icon="calendar" label="Data" value={formattedDate} />
              <InfoCard icon="clock" label="Hora" value={time} width="150" />
            </View>
          </View>
          <InfoCard icon="map-pin" label="Endereço" value={address} />
          <View>
            <View style={styles.row}>
              {selectedServices.map((service, index) => (
                <InfoCard
                  key={index}
                  icon="scissors"
                  label={`Serviço ${index + 1}`}
                  value={service}
                  width="48%"
                />
              ))}
            </View>
          </View>
          <Text style={styles.infoText}>
            Por favor, verifique as informações acima antes de confirmar seu
            agendamento. Certifique-se de que todos os detalhes estão corretos.
          </Text>
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
                size={20}
                type="feather"
                style={styles.buttonIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <ConfirmationModal
        visible={modalVisible}
        onConfirm={handleConfirm}
        onCancel={() => setModalVisible(false)}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 20,
  },
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  column: {
    flex: 1,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    marginVertical: 20,
    textAlign: 'center',
  },
  bottomButtonContainer: {
    padding: 0,
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
  buttonIcon: {
    marginLeft: 10,
  },
});

export default AppointmentSummaryScreen;
