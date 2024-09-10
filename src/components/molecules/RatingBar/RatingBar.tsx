import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface RatingBarProps {
  label: string;
  percentage: number;
  themecolors?: any;
}

const RatingBar: React.FC<RatingBarProps> = ({
  label,
  percentage,
  themecolors,
}) => {
  return (
    <View style={styles.ratingBar}>
      <Text style={styles.ratingLabel}>{label}</Text>
      <View style={styles.progressBar}>
        <View
          style={[
            styles.progress,
            {width: `${percentage}%`, backgroundColor: themecolors.black},
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ratingBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  ratingLabel: {
    flex: 1,
    fontSize: 14,
    color: '#666',
  },
  progressBar: {
    flex: 4,
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
    marginLeft: 10,
  },
  progress: {
    height: '100%',
  },
});

export default RatingBar;
