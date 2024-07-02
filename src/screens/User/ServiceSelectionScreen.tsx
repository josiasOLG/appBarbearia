import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {useSelector} from 'react-redux';
import colors from '../../styles/colors/Colors';
import typography from '../../styles/typographys/typography';
import CustomIcon from '../../components/atoms/Icon/Icon';
import LinearGradient from 'react-native-linear-gradient';

const services = [
  {
    title: 'Corte de cabelo',
    description: 'Corte profissional de cabelo',
    icon: 'scissors',
  },
  {title: 'Barba', description: 'Aparar e modelar a barba', icon: 'user'},
  {title: 'Sobrancelha', description: 'Design de sobrancelhas', icon: 'eye'},
  {title: 'Tintura', description: 'Tintura de cabelo', icon: 'droplet'},
  {
    title: 'Hidratação',
    description: 'Tratamento de hidratação capilar',
    icon: 'droplet',
  },
];

const ServiceBarberSelectionScreen: React.FC = ({route, navigation}) => {
  const {date, time} = route.params;

  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const service = useSelector((state: any) => state.service);
  const userRole = service.selectedService?.toLowerCase() || 'user';
  const themeColors = colors[userRole] || colors.user;

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
    });
  };

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
            key={service.title}
            onPress={() => handleServiceToggle(service.title)}
            style={[
              styles.serviceButton,
              selectedServices.includes(service.title) && {
                backgroundColor: themeColors.primary,
              },
            ]}>
            <View style={styles.serviceContent}>
              <View style={styles.serviceTextContainer}>
                <Text
                  style={[
                    styles.serviceTitle,
                    selectedServices.includes(service.title) && {
                      color: themeColors.white,
                    },
                  ]}>
                  {service.title}
                </Text>
                <Text
                  style={[
                    styles.serviceDescription,
                    selectedServices.includes(service.title) && {
                      color: themeColors.white,
                    },
                  ]}>
                  {service.description}
                </Text>
              </View>
              <CustomIcon
                name={service.icon}
                color={
                  selectedServices.includes(service.title)
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
              size={10}
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
