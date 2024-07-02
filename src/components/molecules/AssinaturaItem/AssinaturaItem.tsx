// components/molecules/AssinaturaItem/AssinaturaItem.tsx
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {parse, format} from 'date-fns';
import {ptBR} from 'date-fns/locale';
import currency from 'currency.js';

interface Assinatura {
  id: string;
  status: string;
  createdAt: string;
  amount: string;
}

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

const formatDate = (dateString: string) => {
  try {
    const date = parse(dateString, 'M/d/yyyy', new Date());
    return format(date, 'dd/MM/yyyy', {locale: ptBR});
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Data inválida';
  }
};

const formatAmount = (amount: string) => {
  try {
    const value = parseFloat(amount.replace('BRL ', '')) / 100;
    return currency(value, {
      symbol: 'R$',
      decimal: ',',
      separator: '.',
    }).format();
  } catch (error) {
    console.error('Error formatting amount:', error);
    return 'Valor inválido';
  }
};

const AssinaturaItem: React.FC<{item: Assinatura}> = ({item}) => {
  return (
    <View style={styles.assinaturaItem}>
      <View style={styles.infoContainer}>
        <Text style={styles.assinaturaData}>{formatDate(item.createdAt)}</Text>
        <Text style={styles.assinaturaAmount}>{formatAmount(item.amount)}</Text>
      </View>
      <Text style={styles.assinaturaStatus}>
        {translateStatus(item.status)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  assinaturaItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
  },
  infoContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  assinaturaStatus: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  assinaturaData: {
    fontSize: 14,
    color: '#666',
  },
  assinaturaAmount: {
    fontSize: 14,
    color: '#666',
  },
});

export default AssinaturaItem;
