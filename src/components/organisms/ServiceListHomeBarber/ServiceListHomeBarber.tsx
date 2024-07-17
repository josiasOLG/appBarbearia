import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import typography from '../../../styles/typographys/typography';
import IconCalendar from '../../assets/icons/iconCalendar.svg';
import IconCheckList from '../../assets/icons/iconChecklist.svg';
import IconConfig from '../../assets/icons/iconConfig.svg';
import {useNavigation} from '@react-navigation/native';
import ServiceCard from '../../molecules/ServiceCard/ServiceCard';

interface ServiceListHomeBarberProps {
  themeColors: any;
}

const ServiceListHomeBarber: React.FC<ServiceListHomeBarberProps> = ({
  themeColors,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.bottomSection}>
      <Text style={[styles.cardTitle, typography.semiBold]}>
        Nossos serviços
      </Text>
      <View style={styles.row}>
        <ServiceCard
          title="Relatórios"
          text="Dados dos clientes"
          onPress={() => {}}
          themeColors={themeColors}
        />
        <ServiceCard
          title="Status"
          text="Agendamento"
          onPress={() => navigation.navigate('ConfirmationScreen')}
          themeColors={themeColors}
        />
      </View>
      <View style={styles.row}>
        <ServiceCard
          title="Fidelidade"
          text="Programa de pontos"
          onPress={() => navigation.navigate('SettingsScreen')}
          themeColors={themeColors}
        />
        <ServiceCard
          title="Configurações"
          text="E área do usuário"
          onPress={() => navigation.navigate('SettingsBarberScreen')}
          themeColors={themeColors}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomSection: {
    flex: 3,
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    flex: 1,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 10,
  },
});

export default ServiceListHomeBarber;
