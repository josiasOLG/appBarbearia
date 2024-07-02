import React from 'react';
import {View, StyleSheet} from 'react-native';
import BarberItem from '../BarberItem/BarberItem';

interface Barber {
  id: string;
  name: string;
}

interface BarberListProps {
  barbers: Barber[];
  onBarberPress: (id: string) => void;
}

const BarberList: React.FC<BarberListProps> = ({barbers, onBarberPress}) => {
  return (
    <View style={styles.middleSection}>
      {Array.isArray(barbers) &&
        barbers.map(barber => (
          <BarberItem
            key={barber.id}
            id={barber.id}
            name={barber.name}
            onPress={() => onBarberPress(barber.id)}
          />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  middleSection: {
    width: '100%',
    paddingHorizontal: 20,
  },
});

export default BarberList;
