import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import typography from '../../../styles/typographys/typography';
import CustomIcon from '../../atoms/Icon/Icon';

interface FeedbackHeaderProps {
  themeColors?: any;
}

const FeedbackHeader: React.FC<FeedbackHeaderProps> = ({themeColors}) => {
  return (
    <View style={styles.header}>
      <Text style={[styles.overallRating, typography.bold]}>
        Avaliação geral
      </Text>
      <Text
        style={[
          styles.ratingNumber,
          typography.bold,
          {color: themeColors.primary},
        ]}>
        3.9
      </Text>
      <View style={styles.starsContainer}>
        {Array.from({length: 5}).map((_, index) => (
          <CustomIcon
            key={index}
            name="star"
            color={index < 3 ? themeColors.gold : themeColors.black}
            size={20}
            type="font-awesome"
          />
        ))}
      </View>
      <Text style={styles.reviewCount}>Baseado em 20 comentários</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  overallRating: {
    marginBottom: 5,
  },
  ratingNumber: {
    fontSize: 48,
  },
  starsContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  reviewCount: {
    fontSize: 14,
    color: '#666',
  },
});

export default FeedbackHeader;
