import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import ReviewItem from '../../molecules/ReviewItem/ReviewItem';
import RatingBar from '../../molecules/RatingBar/RatingBar';

const reviews = [
  {
    id: '1',
    name: 'Martin Luather',
    rating: 4.0,
    comment:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    date: '2 days ago',
    avatarUrl: 'https://via.placeholder.com/50',
  },
  {
    id: '2',
    name: 'Johan Smith Jeo',
    rating: 3.0,
    comment:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    date: '3 days ago',
    avatarUrl: 'https://via.placeholder.com/50',
  },
];

interface ReviewListProps {
  themeColors?: any;
}

const ReviewList: React.FC<ReviewListProps> = ({themeColors}) => {
  return (
    <View style={styles.container}>
      <View style={styles.ratingBarsContainer}>
        {['Excelente', 'Bom', 'Médio', 'Ruim'].map((label, index) => (
          <RatingBar
            key={index}
            label={label}
            percentage={(4 - index) * 25}
            themecolors={themeColors}
          />
        ))}
      </View>
      <FlatList
        data={reviews}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <ReviewItem themecolors={themeColors} review={item} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ratingBarsContainer: {
    paddingHorizontal: 20,
    marginVertical: 20,
  },
});

export default ReviewList;
