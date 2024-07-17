import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ServiceItem from '../../molecules/ServiceItem/ServiceItem';
import CustomIcon from '../../atoms/Icon/Icon';

interface Service {
  id: string;
  userId: any;
  userName: string;
  date: string;
  time: string;
  status: string;
  statusAprovacao: string;
  service: string[];
  notes: string;
  statusPoint?: boolean;
}

interface ServiceListProps {
  services: Service[];
  confirmService: (serviceId: string) => void;
  cancelService: (serviceId: string) => void;
  addPoints: (serviceId: string, userId: any) => void; // Adicionando a função addPoints
  themeColors: any;
}

const ServiceList: React.FC<ServiceListProps> = ({
  services,
  confirmService,
  cancelService,
  addPoints,
  themeColors,
}) => {
  return (
    <View style={styles.section}>
      {services.length === 0 ? (
        <View style={styles.noServiceContainer}>
          <CustomIcon
            name="calendar-times-o"
            size={50}
            type="font-awesome"
            color={themeColors.primary}
          />
          <Text style={[styles.noServiceText, {color: themeColors.primary}]}>
            Nenhum agendamento encontrado.
          </Text>
        </View>
      ) : (
        services.map(service => (
          <ServiceItem
            key={service.id}
            service={service}
            confirmService={confirmService}
            cancelService={cancelService}
            addPoints={addPoints}
            themeColors={themeColors}
          />
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
  },
  noServiceContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noServiceText: {
    fontSize: 18,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default ServiceList;
