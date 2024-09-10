import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import typography from '../../../styles/typographys/typography';
import {useNavigation} from '@react-navigation/native';

interface BarberCardFidelidadeProps {
  image: string;
  title: string;
  description: string;
  points: number;
  themeColors: any;
  barberId: any;
}

const BarberCardFidelidade: React.FC<BarberCardFidelidadeProps> = ({
  image,
  title,
  description,
  points,
  themeColors,
  barberId,
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('FidelityDetailScreen', {barberId, points})
      }
      style={[
        styles.cardContainer,
        {
          backgroundColor: themeColors.white,
          borderColor: themeColors.secondary,
        },
      ]}>
      <Image source={{uri: image}} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={[styles.cardTitle, typography.bold]}>{title}</Text>
        {/* <Text style={[styles.cardDescription, typography.light]}>
          {description}
        </Text> */}
      </View>
      <View
        style={[
          styles.pointsContainer,
          {backgroundColor: themeColors.secondary},
        ]}>
        <Text style={[styles.pointsText, typography.bold]}>{points}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#333',
    borderTopWidth: 8,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    zIndex: 1,
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  cardDescription: {
    fontSize: 14,
    color: '#333',
  },
  pointsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  pointsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default BarberCardFidelidade;
