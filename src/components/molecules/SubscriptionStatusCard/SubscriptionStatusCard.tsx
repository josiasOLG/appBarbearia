// components/molecules/SubscriptionStatusCard/SubscriptionStatusCard.tsx
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import typography from '../../../styles/typographys/typography';

interface SubscriptionStatusCardProps {
  title: string;
  status: string;
}

const SubscriptionStatusCard: React.FC<SubscriptionStatusCardProps> = ({
  title,
  status,
}) => {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Ativa':
        return {color: 'white'};
      case 'OVERDUE':
        return {color: 'white'};
      case 'Cancelada':
        return {color: 'white'};
      default:
        return {color: 'white'};
    }
  };

  const translateStatus = (status: string) => {
    switch (status) {
      case 'OVERDUE':
        return 'Atrasado';
      case 'ACTIVE':
        return 'Ativa';
      case 'PENDING':
        return 'Pendente';
      case 'SUSPENDED':
        return 'Suspensa';
      case 'CANCELED':
        return 'Cancelada';
      default:
        return status;
    }
  };

  return (
    <LinearGradient
      colors={['#422680', '#280659']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.cardPreview}>
      <Text
        style={[styles.cardStatus, typography.bold, getStatusStyle(status)]}>
        {translateStatus(status)}
      </Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  cardPreview: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 8,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 20,
    marginBottom: 8,
    color: '#fff',
    width: '100%',
  },
  cardStatus: {
    fontSize: 18,
    color: '#fff',
  },
});

export default SubscriptionStatusCard;
