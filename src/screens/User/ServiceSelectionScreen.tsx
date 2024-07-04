import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import colors from '../../styles/colors/Colors';
import typography from '../../styles/typographys/typography';
import CustomIcon from '../../components/atoms/Icon/Icon';
import LinearGradient from 'react-native-linear-gradient';
import {BarberService} from '../../api/BarberService';

const ServiceBarberSelectionScreen: React.FC = ({route, navigation}) => {
  const {date, time, barber} = route.params;

  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const user = useSelector((state: any) => state.user);
  const userRole = user.user.type?.toLowerCase() || 'user';
  const themeColors = colors[userRole] || colors.user;

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await BarberService.getAllServicePerfils(barber.id);
        setServices(response.data);
      } catch (error) {
        console.error('Failed to fetch services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [barber.id]);

  const handleServiceToggle = (service: string) => {
    setSelectedServices(prev =>
      prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service],
    );
  };

  const handleContinue = () => {
    navigation.navigate('AppointmentSummaryScreen', {
      selectedServices,
      date,
      time,
      barber,
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={themeColors.primary} />
      </View>
    );
  }

  return (
    <LinearGradient
      colors={[themeColors.primary, themeColors.secondary]}
      style={styles.gradient}>
      <StatusBar backgroundColor={themeColors.primary} />
      <View style={styles.container}>
        <Text style={[styles.title, typography.bold]}>
          Selecione os Serviços
        </Text>
        {services.map(service => (
          <TouchableOpacity
            key={service._id}
            onPress={() => handleServiceToggle(service.name)}
            style={[
              styles.serviceButton,
              selectedServices.includes(service.name) && {
                backgroundColor: themeColors.primary,
              },
            ]}>
            <View style={styles.serviceContent}>
              <View style={styles.serviceTextContainer}>
                <Text
                  style={[
                    styles.serviceTitle,
                    selectedServices.includes(service.name) && {
                      color: themeColors.white,
                    },
                  ]}>
                  {service.name}
                </Text>
                <Text
                  style={[
                    styles.serviceDescription,
                    selectedServices.includes(service.name) && {
                      color: themeColors.white,
                    },
                  ]}>
                  {service.description || 'Descrição não disponível'}
                </Text>
              </View>
              <CustomIcon
                name="scissors"
                color={
                  selectedServices.includes(service.name)
                    ? themeColors.white
                    : themeColors.primary
                }
                size={24}
                type="feather"
                style={styles.serviceIcon}
              />
            </View>
          </TouchableOpacity>
        ))}
        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: themeColors.secondary}]}
            onPress={handleContinue}>
            <Text style={[styles.buttonTextLeft, typography.boldItalic]}>
              Continue
            </Text>
            <CustomIcon
              name="arrow-right"
              color={'#FFF'}
              size={20}
              type="feather"
              style={[styles.buttonTextRight, typography.extraLightItalic]}
            />
          </TouchableOpacity>
        </View>
      </View>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff',
  },
  serviceButton: {
    backgroundColor: '#ddd',
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
  },
  serviceContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  serviceTextContainer: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: 18,
    textAlign: 'left',
  },
  serviceDescription: {
    fontSize: 14,
    textAlign: 'left',
    color: '#666',
  },
  serviceIcon: {
    marginLeft: 10,
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
});

export default ServiceBarberSelectionScreen;
