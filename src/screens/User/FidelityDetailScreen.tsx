import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import colors from '../../styles/colors/Colors';
import typography from '../../styles/typographys/typography';
import ServiceCardDetailFidelity from '../../components/molecules/ServiceCardDetailFidelity/ServiceCardDetailFidelity';
import {BarberService} from '../../api/BarberService';

import {useNavigation} from '@react-navigation/native';
import {QRCodeServices} from '../../api/QrCodeService';

const FidelityDetailScreen: React.FC = ({route}) => {
  const {points, barberId} = route.params;
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const user = useSelector((state: any) => state.user);
  const userRole = user.user.type?.toLowerCase() || 'user';
  const themeColors = colors[userRole] || colors.user;

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await BarberService.getServices(barberId);
        setServices(response.data);
      } catch (error) {
        console.error('Failed to fetch services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [barberId]);

  const handleRedeem = async (service: string) => {
    try {
      console.log(1);
      const response = await QRCodeServices.createQRCode(
        user.user.id,
        barberId,
      );
      const qrCodeUrl = response.data.code;
      navigation.navigate('QRCodeScreen', {qrCodeUrl});
    } catch (error) {
      console.error('Failed to generate QR Code:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={themeColors.secondary} />
      </View>
    );
  }

  return (
    <LinearGradient colors={['#ffffff', '#ffffff']} style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={themeColors.secondary}
      />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <Text style={[styles.balanceTitle, typography.regular]}>
            Seu Saldo de pontos
          </Text>
          <Text style={[styles.balancePoints, typography.light]}>
            {points} pontos
          </Text>
        </View>
        {services.map((service: any) => (
          <ServiceCardDetailFidelity
            key={service.id}
            service={service.name}
            points={service.points}
            description="ATENÇÂO: Pontos não acumulam"
            userPoints={points}
            onRedeem={() => handleRedeem(service.name)}
            themeColors={themeColors}
          />
        ))}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  balanceTitle: {
    color: '#333',
  },
  balancePoints: {
    fontSize: 18,
    color: '#333',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FidelityDetailScreen;
