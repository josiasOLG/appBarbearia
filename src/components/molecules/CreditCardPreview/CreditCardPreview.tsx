// components/molecules/CreditCardPreview/CreditCardPreview.tsx
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import typography from '../../../styles/typographys/typography';

interface CreditCardPreviewProps {
  holderName: string;
  cardNumber: string;
  cardExpiry: string;
}

const CreditCardPreview: React.FC<CreditCardPreviewProps> = ({
  holderName,
  cardNumber,
  cardExpiry,
}) => {
  // Mascarar o número do cartão, mostrando apenas os últimos 4 dígitos
  const maskedCardNumber = cardNumber
    ? `**** **** **** ${cardNumber}`
    : '**** **** **** ****';

  return (
    <LinearGradient
      colors={['#4231a4', '#7d6cdf']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.cardPreview}>
      <Text style={[styles.cardHolderName, typography.regular]}>
        {holderName || 'HOLDER NAME'}
      </Text>
      <Text style={[styles.cardNumber, typography.bold]}>
        {maskedCardNumber}
      </Text>
      <View style={styles.row}>
        <Text style={[styles.cardExpiry, typography.regular]}>
          {cardExpiry + '/**' || 'MM/YYYY'}
        </Text>
      </View>
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
  cardHolderName: {
    fontSize: 20,
    marginBottom: 8,
    color: '#fff',
    width: '100%',
  },
  cardNumber: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 8,
  },
  cardExpiry: {
    fontSize: 16,
    color: '#fff',
    flex: 1,
    textAlign: 'left',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default CreditCardPreview;
