import React from 'react';
import {View, Text, StyleSheet, ViewStyle} from 'react-native';
import CustomIcon from '../../atoms/Icon/Icon';
import colors from '../../../styles/colors/Colors';
import typography from '../../../styles/typographys/typography';

interface InfoCardProps {
  icon: string;
  label: string;
  value: string;
  width?: number | string; // Adiciona uma nova prop width
}

const InfoCard: React.FC<InfoCardProps> = ({icon, label, value, width}) => {
  const cardStyle: ViewStyle = {
    ...styles.infoCard,
    flex: width ? 0 : 1, // Flex grow only if width is not provided
    width: width || 'auto',
  };

  return (
    <View style={cardStyle}>
      <View style={styles.cardRow}>
        <CustomIcon
          name={icon}
          size={20}
          color={colors.primary}
          type="feather"
          style={styles.icon}
        />
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    flex: 1,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    marginBottom: 5,
  },
  icon: {
    marginRight: 10,
  },
});

export default InfoCard;
