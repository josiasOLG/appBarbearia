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
  const isApproved = appointment.statusAprovacao === 'aprovado';
  const isRejected = appointment.statusAprovacao === 'rejeitado';

  const completionTitle = isApproved
    ? 'Agendamento Aprovado'
    : isRejected
    ? 'Agendamento Rejeitado'
    : 'Agendamento Pendente';

  const completionDescription = isApproved
    ? 'Seu agendamento foi aprovado. Por favor, verifique os detalhes abaixo.'
    : isRejected
    ? 'Seu agendamento foi rejeitado. Por favor, verifique os detalhes abaixo.'
    : 'Seu agendamento está pendente de aprovação. Notificaremos você assim que for aprovado.';

  const formattedDate = moment(appointment.date).format(
    'DD [de] MMMM [de] YYYY',
  );
  const isPastAppointment = moment().isAfter(moment(appointment.date));

  const pastAppointmentTitle = 'Agendamento Passado';
  const pastAppointmentDescription =
    'Este agendamento já passou. Por favor, reagende se necessário.';

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

        <View
          style={[
            styles.completion,
            isApproved && {backgroundColor: themeColors.verde},
            isRejected && {backgroundColor: themeColors.vermelho},
          ]}>
          <View
            style={[
              styles.completionContainer,
              isPastAppointment && styles.pastAppointmentContainer,
              (isApproved || isRejected) && styles.approvedContainer,
            ]}>
            <Text
              style={[
                styles.completionTitle,
                typography.bold,
                {
                  color: isPastAppointment
                    ? '#ff0000'
                    : isApproved || isRejected
                    ? '#fff'
                    : themeColors.primary,
                },
              ]}>
              {isPastAppointment ? pastAppointmentTitle : completionTitle}
            </Text>
            <Text
              style={[
                styles.completionDescription,
                typography.regular,
                (isApproved || isRejected) && styles.approvedText,
              ]}>
              {isPastAppointment
                ? pastAppointmentDescription
                : completionDescription}
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
              description="Seu agendamento foi aprovado. Por favor, verifique os detalhes no topo da tela. O barbeiro agradece seu contato e está no aguardo da sua visita."
              isCompleted={true}
            />
          )}
          {isRejected && (
            <TimelineItem
              title="Agendamento Rejeitado"
              description={
                appointment.statusMensage
                  ? appointment.statusMensage
                  : 'Necessário realizar um reagendamento. O barbeiro não se encontra disponivel'
              }
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
    fontSize: 18,
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
    color: '#fff',
    textTransform: 'capitalize',
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
  pastAppointmentContainer: {
    borderColor: '#ff0000',
    borderWidth: 1,
  },
  approvedContainer: {
    backgroundColor: 'transparent',
  },
  completionTitle: {
    fontSize: 14,
  },
  completionDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
  },
  approvedText: {
    color: '#fff',
  },
  timelineContainer: {
    marginVertical: 20,
    marginHorizontal: 20,
  },
});

export default AppointmentDetailsScreen;
