import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import BarberIcon from '../../../assets/icons/onborading2.svg';
import IconBackBlack from '../../../assets/icons/BackBlack.svg';
import typography from '../../../styles/typographys/typography';

interface BarberItemProps {
  id: string;
  name: string;
  onPress: () => void;
}

const BarberItem: React.FC<BarberItemProps> = ({id, name, onPress}) => {
  return (
    <TouchableOpacity key={id} style={styles.cardBarber} onPress={onPress}>
      <View style={styles.row}>
        <View style={styles.column2}>
          <BarberIcon width={60} height={60} color={'#333'} />
        </View>
        <View style={styles.column1}>
          <View style={styles.containerText}>
            <Text style={[styles.cardTextBarber, typography.semiBold]}>
              {name}
            </Text>
            <Text style={[styles.cardTextSmallBarber, typography.regular]}>
              Local onde ele atende
            </Text>
          </View>
        </View>
        <View style={styles.column3}>
          <IconBackBlack
            color={'#333'}
            width={25}
            height={25}
            style={styles.iconClick}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardBarber: {
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    width: '100%',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
  },
  column1: {
    flex: 3,
  },
  column2: {
    flex: 1,
  },
  column3: {
    flex: 0.5,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  containerText: {
    marginLeft: 20,
  },
  cardTextBarber: {
    color: '#12182e',
    fontSize: 16,
    marginBottom: 5,
  },
  cardTextSmallBarber: {
    fontSize: 14,
    color: '#12182e',
  },
  iconClick: {
    transform: [{rotate: '180deg'}],
  },
});

export default BarberItem;
