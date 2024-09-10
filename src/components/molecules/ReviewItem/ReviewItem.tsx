import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import typography from '../../../styles/typographys/typography';
import CustomIcon from '../../atoms/Icon/Icon';

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatarUrl: string;
}

interface ReviewItemProps {
  review: Review;
  themecolors?: any;
}

const ReviewItem: React.FC<ReviewItemProps> = ({review, themecolors}) => {
  return (
    <View style={styles.reviewItem}>
      <Image source={{uri: review.avatarUrl}} style={styles.avatar} />
      <View style={styles.reviewContent}>
        <Text style={[styles.reviewerName, typography.bold]}>
          {review.name}
        </Text>
        <View style={styles.starsContainer}>
          {Array.from({length: 5}).map((_, index) => (
            <CustomIcon
              key={index}
              name="star"
              color={
                index < Math.floor(review.rating)
                  ? themecolors.gold
                  : themecolors.black
              }
              size={15}
              type="font-awesome"
            />
          ))}
          <Text style={styles.reviewRating}>({review.rating.toFixed(1)})</Text>
        </View>
        <Text style={styles.reviewComment}>{review.comment}</Text>
        <Text style={styles.reviewDate}>{review.date}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  reviewItem: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  reviewContent: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 14,
  },
  starsContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  reviewRating: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  reviewComment: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  reviewDate: {
    fontSize: 12,
    color: '#999',
  },
});

export default ReviewItem;
