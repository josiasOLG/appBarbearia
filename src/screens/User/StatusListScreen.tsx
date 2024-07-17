import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Text,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import CustomIcon from '../../components/atoms/Icon/Icon'; // Use CustomIcon here
import StatusCard from '../../components/organisms/StatusCard/StatusCard';
import colors from '../../styles/colors/Colors';
import {AppointmentService} from '../../api/AppointmentService';
import EcoIcon from '../../assets/icons/eco.svg';
import moment from 'moment';

interface Appointment {
  barberId: string;
  barberName: string;
  date: string;
  time: string;
  status: string;
  statusAprovacao: string;
  statusMensage?: string;
  userId: string;
  notes: string;
  service: string[];
  userIcons: string[];
  statusPoint?: boolean;
}

const StatusListScreen: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state: any) => state.user);
  const navigation = useNavigation();
  const userRole = user.user.type?.toLowerCase() || 'user';
  const themeColors = colors[userRole] || colors.user;

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await AppointmentService.getAllAppointamentUserId(
          user.user.id,
        );
        if (response) {
          setAppointments(response);
        }
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [user.user.id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const handleCardPress = (appointment: Appointment) => {
    navigation.navigate('AppointmentDetailsScreen', {appointment});
  };

  return (
    <LinearGradient colors={['#f1f6fa', '#d2e2ef']} style={styles.gradient}>
      <EcoIcon style={styles.iconBack} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <CustomIcon
            name="calendar-check-o"
            size={20}
            type="font-awesome"
            color={themeColors.primary}
          />
          <Text style={[styles.headerText, {color: themeColors.black}]}>
            Meus Agendamentos
          </Text>
          <Text style={styles.subHeaderText}>
            Acompanhe o status dos seus agendamentos e clique para ver mais
            detalhes.
          </Text>
        </View>
        <View style={styles.cardsContainer}>
          {appointments.map((appointment, index) => {
            const isPastAppointment = moment().isAfter(
              moment(appointment.date),
            );
            return (
              <TouchableOpacity
                key={index}
                onPress={() => handleCardPress(appointment)}
                style={styles.cardWrapper}>
                <StatusCard
                  barberName={appointment.barberName}
                  date={appointment.date}
                  time={appointment.time}
                  status={appointment.status}
                  statusAprovacao={appointment.statusAprovacao}
                  userIcons={appointment.userIcons || []}
                  themeColors={themeColors}
                  isPastAppointment={isPastAppointment} // Passing this prop to StatusCard
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    padding: 20,
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  subHeaderText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  cardWrapper: {
    width: Dimensions.get('window').width / 2 - 30,
    marginBottom: 20,
  },
  iconBack: {
    position: 'absolute',
    opacity: 0.2,
  },
});

export default StatusListScreen;
