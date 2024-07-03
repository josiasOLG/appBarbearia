import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import colors from '../../styles/colors/Colors';
import typography from '../../styles/typographys/typography';
import LinearGradient from 'react-native-linear-gradient';
import {GlobalLayoutStyles} from '../../styles/GlobalLayoutStyles';
import CustomIcon from '../../components/atoms/Icon/Icon';

interface ConfirmationScreenProps {
  navigation: any;
}

const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({
  navigation,
}) => {
  const user = useSelector((state: any) => state.user);
  const userRole = user?.user.type?.toLowerCase() || 'user';
  const themeColors = colors[userRole] || colors.user;

  const [services, setServices] = useState([
    {
      id: 1,
      clientName: 'João Silva',
      service: 'Corte de cabelo',
      date: '2024-07-01',
      confirmed: false,
    },
    {
      id: 2,
      clientName: 'Maria Oliveira',
      service: 'Tintura de cabelo',
      date: '2024-07-01',
      confirmed: false,
    },
    {
      id: 3,
      clientName: 'Pedro Sousa',
      service: 'Corte de cabelo',
      date: '2024-07-01',
      confirmed: false,
    },
  ]);

  const confirmService = (serviceId: number) => {
    setServices(
      services.map(service =>
        service.id === serviceId ? {...service, confirmed: true} : service,
      ),
    );
  };

  return (
    <LinearGradient
      colors={[themeColors.primary, themeColors.primary]}
      style={styles.gradient}>
      <StatusBar backgroundColor={themeColors.primary} />
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.container}>
          <Text style={[styles.title, typography.semiBold]}>
            Confirmação de Agendamentos
          </Text>

          <View style={styles.section}>
            {services.map(service => (
              <View key={service.id} style={styles.service}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ClientDetailsScreen', {
                      clientName: service.clientName,
                    })
                  }>
                  <Text style={styles.serviceText}>
                    {service.clientName} - {service.service} - {service.date}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.confirmButton,
                    {
                      backgroundColor: service.confirmed
                        ? 'grey'
                        : themeColors.primary,
                    },
                  ]}
                  onPress={() => confirmService(service.id)}
                  disabled={service.confirmed}>
                  <CustomIcon
                    name="check"
                    size={20}
                    color="#fff"
                    type="feather"
                  />
                  <Text style={styles.confirmButtonText}>
                    {service.confirmed ? 'Confirmado' : 'Confirmar'}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
    padding: 20,
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  service: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  serviceText: {
    fontSize: 16,
    color: '#333',
  },
  confirmButton: {
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 5,
  },
});

export default ConfirmationScreen;
