import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import typography from '../../../styles/typographys/typography';
import LinearGradient from 'react-native-linear-gradient';

interface StatusCardProps {
  barberName: string;
  date: string;
  time: string;
  status: string;
  statusAprovacao: string;
  userIcons: string[];
  themeColors: any;
  isPastAppointment: boolean; // New prop for past appointment check
}

const formatDateTime = (date: string, time: string): string => {
  if (!date || !time) return '';
  const [year, month, day] = date.split('T')[0].split('-');
  return `${day}/${month}/${year}`;
};

const StatusCard: React.FC<StatusCardProps> = ({
  barberName,
  date,
  time,
  status,
  statusAprovacao,
  userIcons,
  themeColors,
  isPastAppointment,
}) => {
  let cardColor = themeColors.primary; // Default to primary color

  if (isPastAppointment) {
    cardColor = '#ff0000'; // Red for past appointments
  } else if (statusAprovacao === 'rejeitado') {
    cardColor = '#ff0000'; // Red for rejected
  } else if (statusAprovacao === 'aprovado') {
    cardColor = themeColors.verde; // Green for approved
  } else if (status === 'pending') {
    cardColor = themeColors.primary; // Primary color for pending
  }

  return (
    <LinearGradient
      colors={[themeColors?.white, themeColors?.white]}
      style={styles.gradient}>
      <View
        style={[styles.card, isPastAppointment && styles.pastAppointmentCard]}>
        <View style={styles.header}>
          <View style={[styles.dot, {backgroundColor: cardColor}]} />
          <Text style={[styles.status, typography.bold, {color: cardColor}]}>
            {isPastAppointment
              ? 'Passado'
              : statusAprovacao === 'rejeitado'
              ? 'Rejeitado'
              : statusAprovacao === 'aprovado'
              ? 'Aprovado'
              : 'Pendente'}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={[styles.title, typography.bold]}>{barberName}</Text>
          <Text style={[styles.subtitle, typography.regular]}>
            {formatDateTime(date, time)} - {time}
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    borderRadius: 10,
    shadowColor: '#333',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    elevation: 2,
    shadowRadius: 10,
  },
  card: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 0,
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  pastAppointmentCard: {
    borderColor: '#ff0000',
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 100,
  },
  status: {
    fontSize: 14,
  },
  infoContainer: {
    marginTop: 50,
  },
  title: {
    fontSize: 16,
    marginVertical: 5,
    color: '#333',
    textTransform: 'capitalize',
  },
  subtitle: {
    fontSize: 14,
    color: '#333',
  },
  userIconsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  userIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 5,
  },
});

export default StatusCard;
