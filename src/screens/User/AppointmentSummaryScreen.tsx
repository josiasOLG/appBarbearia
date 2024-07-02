import React, {useState} from 'react';
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

const AppointmentSummaryScreen: React.FC = ({route, navigation}) => {
  const {selectedServices, date, time, address} = route.params;
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
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <ProfileCard />
          <View>
            <View style={styles.row}>
              <InfoCard icon="calendar" label="Data" value={date} />
              <InfoCard icon="clock" label="Hora" value={time} />
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
  buttonIcon: {
    marginLeft: 10,
  },
});

export default AppointmentSummaryScreen;
