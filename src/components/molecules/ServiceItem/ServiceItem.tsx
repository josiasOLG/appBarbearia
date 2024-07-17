import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import typography from '../../../styles/typographys/typography';
import Button from '../../atoms/Button/Button';

interface ServiceItemProps {
  service: {
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
  };
  confirmService: (serviceId: string) => void;
  cancelService: (serviceId: string) => void;
  addPoints: (serviceId: string, userId: any) => void; // New function for adding points
  themeColors: any;
}

const ServiceItem: React.FC<ServiceItemProps> = ({
  service,
  confirmService,
  cancelService,
  addPoints,
  themeColors,
}) => {
  const navigation = useNavigation();

  return (
    <View
      style={[
        styles.service,
        {
          backgroundColor:
            service.status === 'aprovado'
              ? '#cfffbb'
              : service.status === 'rejeitado'
              ? '#ffbdbd'
              : '#fff',
        },
      ]}>
      <View style={styles.iconContainer}>
        <Text style={styles.dateText}>{new Date(service.date).getDate()}</Text>
        <Text style={styles.monthText}>
          {new Date(service.date).toLocaleString('default', {
            month: 'short',
          })}
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={[styles.serviceText, typography.bold]}>
          {service.userName}
        </Text>
        <Text style={styles.serviceSubText}>{service.service.join(', ')}</Text>
        <Text style={styles.serviceSubText}>{service.time}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.topButtons}>
          <Button
            backgroundColor={
              service.status === 'aprovado' ? 'green' : themeColors.primary
            }
            iconName={service.status === 'aprovado' ? 'check-circle' : 'check'}
            iconType="feather"
            onPress={() => confirmService(service.id)}
            disabled={service.status === 'aprovado'}
          />
          <Button
            backgroundColor={service.status === 'rejeitado' ? 'red' : '#d9534f'}
            iconName={service.status === 'rejeitado' ? 'x-circle' : 'x'}
            iconType="feather"
            onPress={() => cancelService(service.id)}
            disabled={service.status === 'rejeitado'}
          />
        </View>
        {!service.statusPoint && (
          <View style={styles.bottomButton}>
            <Button
              backgroundColor={themeColors.primary}
              iconName="star"
              iconType="feather"
              onPress={() => {
                addPoints(service.id, service.userId);
              }}
              title="Adicionar"
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  service: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: '#4F6D7A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  dateText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  monthText: {
    fontSize: 14,
    color: '#fff',
  },
  infoContainer: {
    flex: 1,
  },
  serviceText: {
    fontSize: 16,
    color: '#333',
  },
  serviceSubText: {
    fontSize: 14,
    color: '#666',
  },
  buttonsContainer: {
    flexDirection: 'column',
    gap: 10,
  },
  topButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 0,
    gap: 10,
  },
  bottomButton: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default ServiceItem;
