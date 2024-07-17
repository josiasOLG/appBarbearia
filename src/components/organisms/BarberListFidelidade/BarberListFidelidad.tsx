import React from 'react';
import {View, StyleSheet} from 'react-native';
import BarberCardFidelidade from '../../molecules/BarberCardFidelidade/BarberCardFidelidade';

interface Barber {
  _id: string;
  barberId: any;
  image: string;
  barberName: string;
  description: string;
  qtd: number;
}

interface BarberListFidelidadProps {
  barbers: Barber[];
  themeColors: any;
}

const BarberListFidelidad: React.FC<BarberListFidelidadProps> = ({
  barbers,
  themeColors,
}) => {
  return (
    <View style={styles.listContainer}>
      {barbers.map(barber => (
        <BarberCardFidelidade
          key={barber._id}
          image={barber.image}
          title={barber.barberName}
          description={barber.description}
          points={barber.qtd}
          themeColors={themeColors}
          barberId={barber.barberId}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
  },
});

export default BarberListFidelidad;
