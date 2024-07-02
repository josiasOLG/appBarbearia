import React from 'react';
import {View, StyleSheet} from 'react-native';
import CardItem from '../../molecules/CardItem/CardItem';

interface CardListProps {
  cards: {cardLastFourDigits: string; selected: boolean}[];
  onCardSelect: (index: number) => void;
  onCardSelectItem: (item: any) => void;
}

const CardList: React.FC<CardListProps> = ({
  cards,
  onCardSelect,
  onCardSelectItem,
}) => {
  return (
    <View style={styles.container}>
      {cards.map((card, index) => (
        <CardItem
          key={index}
          cardNumber={card.cardLastFourDigits}
          selected={card.selected}
          onPress={() => {
            onCardSelect(index);
            onCardSelectItem(card);
          }}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
});

export default CardList;
