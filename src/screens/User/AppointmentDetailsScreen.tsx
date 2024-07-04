import React from 'react';
import {View, ScrollView, StyleSheet, Text, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../styles/colors/Colors';
import typography from '../../styles/typographys/typography';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import TimelineItem from '../../components/molecules/TimelineItem/TimelineItem';
import EcoIcon from '../../assets/icons/eco.svg';
import moment from 'moment';
import 'moment/locale/pt-br'; // Importar o locale para português do Brasil

moment.locale('pt-br'); // Definir o locale para português do Brasil

const AppointmentDetailsScreen: React.FC = ({route}) => {
  const {appointment} = route.params;
  const user = useSelector((state: any) => state.user);
  const navigation = useNavigation();
  const userRole = user.user.type?.toLowerCase() || 'user';
  const themeColors = colors[userRole] || colors.user;

  const isPending = appointment.status === 'pending';
  const isApproved = appointment.statusAprovacao === 'approved';

  const completionTitle = isApproved
    ? 'Agendamento Aprovado'
    : 'Agendamento Pendente';
  const completionDescription = isApproved
    ? 'Seu agendamento foi aprovado. Por favor, verifique os detalhes abaixo.'
    : 'Seu agendamento está pendente de aprovação. Notificaremos você assim que for aprovado.';

  const formattedDate = moment(appointment.date).format('MMMM [de] YYYY');

  return (
    <LinearGradient colors={['#f1f6fa', '#d2e2ef']} style={styles.gradient}>
      <EcoIcon style={styles.iconBack} />
      <ScrollView contentContainerStyle={styles.container}>
        <View
          style={[
            styles.profileContainer,
            {backgroundColor: themeColors.primary},
          ]}>
          <Image
            source={{uri: 'https://via.placeholder.com/100'}} // Placeholder image, replace with actual source
            style={styles.profileImage}
          />
          <View style={styles.profileDetails}>
            <Text style={[styles.profileName, typography.bold]}>
              {appointment.barberName}
            </Text>
            <Text style={[styles.profileTime, typography.regular]}>
              {formattedDate}
            </Text>
            <Text style={[styles.profileTime, typography.regular]}>
              {appointment.time}
            </Text>
          </View>
        </View>

        <View style={styles.completion}>
          <View style={styles.completionContainer}>
            <Text
              style={[
                styles.completionTitle,
                typography.bold,
                {color: themeColors.primary},
              ]}>
              {completionTitle}
            </Text>
            <Text style={[styles.completionDescription, typography.regular]}>
              {completionDescription}
            </Text>
          </View>
        </View>
        <View style={styles.timelineContainer}>
          <TimelineItem
            title="Agendamento Marcado"
            description={`Seu agendamento com ${appointment.barberName} está marcado.`}
            isCompleted={true}
          />
          <TimelineItem
            title="Aprovação Pendente"
            description="Seu agendamento está pendente de aprovação. Notificaremos você assim que for aprovado."
            isCompleted={!isPending}
          />
          {isApproved && (
            <TimelineItem
              title="Agendamento Aprovado"
              description="Seu agendamento foi aprovado. Por favor, verifique os detalhes."
              isCompleted={true}
            />
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  iconBack: {
    position: 'absolute',
    opacity: 0.2,
    top: 0,
  },
  container: {
    padding: 0,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
    padding: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  profileDetails: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    color: '#fff',
  },
  profileTime: {
    fontSize: 14,
    color: '#fff',
  },
  completion: {
    padding: 20,
    backgroundColor: '#e3e3e3',
    marginBottom: 20,
  },
  completionContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  completionTitle: {
    fontSize: 16,
  },
  completionDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
  },
  timelineContainer: {
    marginVertical: 20,
    marginHorizontal: 20,
  },
});

export default AppointmentDetailsScreen;
