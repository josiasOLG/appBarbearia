import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CustomIcon from '../../atoms/Icon/Icon';
import typography from '../../../styles/typographys/typography';

interface TimelineItemProps {
  title: string;
  description: string;
  isCompleted: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  title,
  description,
  isCompleted,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <CustomIcon
          name={isCompleted ? 'check-circle' : 'circle'}
          size={24}
          color={isCompleted ? '#00C853' : '#C4C4C4'}
          type="feather"
        />
        <View
          style={[
            styles.line,
            {
              backgroundColor: isCompleted ? '#00C853' : '#C4C4C4',
            },
          ]}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.title, typography.bold]}>{title}</Text>
        <Text style={[styles.description, typography.regular]}>
          {description}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 0,
    paddingBottom: 40,
  },
  iconContainer: {
    alignItems: 'center',
    marginRight: 10,
  },
  line: {
    width: 2,
    height: '120%',
    backgroundColor: '#C4C4C4',
    position: 'absolute',
    top: 24,
    bottom: -24,
    left: 11, // Align with icon center
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});

export default TimelineItem;
