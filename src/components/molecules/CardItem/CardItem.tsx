import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import RadioButton from '../../atoms/RadioButton/RadioButton';
import CardText from '../../atoms/CardText/CardText';
import Icon from 'react-native-vector-icons/FontAwesome';

interface CardItemProps {
  cardNumber: string;
  selected: boolean;
  onPress: () => void;
}

const CardItem: React.FC<CardItemProps> = ({cardNumber, selected, onPress}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon color={'#333'} name="credit-card" size={25} />
      </View>
      <View style={styles.textContainer}>
        <CardText text={`**** **** **** ${cardNumber}`} />
      </View>
      <View style={styles.radioContainer}>
        <RadioButton selected={selected} onPress={onPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  iconContainer: {
    flex: 0.2,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  radioContainer: {
    justifyContent: 'flex-end',
  },
});

export default CardItem;
