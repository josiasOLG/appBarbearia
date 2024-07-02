// components/organisms/SubscriptionStatus/SubscriptionStatus.tsx
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SubscriptionStatusCard from '../../molecules/SubscriptionStatusCard/SubscriptionStatusCard';
import CreditCardPreview from '../../molecules/CreditCardPreview/CreditCardPreview';
import ActionButton from '../../molecules/ActionButton/ActionButton';
import typography from '../../../styles/typographys/typography';
import {CommonActions, useNavigation} from '@react-navigation/native';

interface SubscriptionStatusProps {
  status: string;
  cardDetails: {
    holderName: string;
    cardLastFourDigits: string;
    expiryMonth: string;
  };
  onActionPress: (action: string) => void;
}

const SubscriptionStatus: React.FC<SubscriptionStatusProps> = ({
  status,
  cardDetails,
  onActionPress,
}) => {
  const navigation = useNavigation();
  const renderActionButton = (status: string) => {
    switch (status) {
      case 'OVERDUE':
        return (
          <ActionButton
            onPress={() => onActionPress('UpdateCardDetails')}
            text="Atualizar Cartão"
            iconName="credit-card"
            errorMessage="Sua assinatura está atrasada devido a um problema com o pagamento. O PagSeguro tentará processar o pagamento novamente. Por favor, verifique os detalhes do seu cartão de crédito."
            errorColor="#f8d7da"
          />
        );
      case 'ACTIVE':
        return (
          <ActionButton
            onPress={() => onActionPress('CancelSubscription')}
            text="Cancelar Assinatura"
            iconName="credit-card"
          />
        );
      case 'PENDING':
        return (
          <ActionButton
            onPress={() => onActionPress('CompletePayment')}
            text="Completar Pagamento"
            iconName="credit-card"
          />
        );
      case 'SUSPENDED':
        return (
          <ActionButton
            onPress={() => onActionPress('ReactivateSubscription')}
            text="Reativar Assinatura"
            iconName="credit-card"
          />
        );
      case 'CANCELED':
        return (
          <ActionButton
            onPress={() => onActionPress('RenewSubscription')}
            text="Renovar Assinatura"
            iconName="credit-card"
          />
        );
      default:
        return null;
    }
  };

  const reAssinar = () => {
    onActionPress('ReAssinar');
  };

  return (
    <View>
      <View style={styles.statusContainer}>
        <Text style={[styles.header, typography.bold]}>Status</Text>
        <Text style={[styles.statusLabel, typography.light]}>
          Status em que assinatura se encontra
        </Text>
      </View>
      <SubscriptionStatusCard
        title="Status da Assinatura"
        status={status || 'Desconhecido'}
      />
      <View style={styles.statusContainer}>
        <Text style={[styles.header, typography.bold]}>Cartão de crédito</Text>
        <Text style={[styles.statusLabel, typography.light]}>
          Cartão de crédito utilizado na assinatura
        </Text>
      </View>
      <CreditCardPreview
        holderName={cardDetails.holderName || 'HOLDER NAME'}
        cardNumber={cardDetails.cardLastFourDigits || '0000'}
        cardExpiry={cardDetails.expiryMonth || 'MM/YYYY'}
      />
      {renderActionButton(status)}
      <ActionButton
        onPress={reAssinar}
        text="Assinar"
        iconName="credit-card"
        backgroundColor="#422680"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  statusContainer: {
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 0,
    color: '#666',
  },
});

export default SubscriptionStatus;
