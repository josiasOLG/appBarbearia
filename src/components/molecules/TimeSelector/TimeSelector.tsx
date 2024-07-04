import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import colors from '../../../styles/colors/Colors';
import {
  getCurrentTime,
  handleTimePress,
  isTimeDisabled,
} from '../../../utils/utils';
import moment from 'moment';

interface TimeSelectorProps {
  times: string[];
  selectedDate: string;
  onTimeSelect: (time: string) => void;
}

const TimeSelector: React.FC<TimeSelectorProps> = ({
  times,
  onTimeSelect,
  selectedDate,
}) => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<string>('');
  const user = useSelector((state: any) => state.user);
  const userRole = user.user.type?.toLowerCase() || 'user';
  const themeColors = colors[userRole] || colors.user;

  useFocusEffect(
    React.useCallback(() => {
      setCurrentTime(getCurrentTime());
    }, []),
  );

  const handleTimePressInternal = (time: string) => {
    setSelectedTime(time);
    onTimeSelect(time);
  };

  return (
    <View style={styles.container}>
      {times.map(time => {
        const isDisabled = isTimeDisabled(currentTime, time, selectedDate);

        return (
          <TouchableOpacity
            key={time}
            onPress={() => handleTimePressInternal(time)}
            style={[
              styles.timeButton,
              selectedTime === time && {backgroundColor: themeColors.primary},
              isDisabled && styles.disabledButton,
            ]}
            disabled={isDisabled}>
            <Text
              style={[
                styles.timeText,
                selectedTime === time && {color: '#fff'},
                isDisabled && styles.disabledText,
              ]}>
              {time}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: 'transparent',
  },
  timeButton: {
    backgroundColor: 'transparent',
    borderColor: '#333',
    borderWidth: 1,
    padding: 10,
    marginHorizontal: 11,
    marginVertical: 5,
    borderRadius: 5,
  },
  timeText: {
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: '#ccc',
    borderColor: '#aaa',
  },
  disabledText: {
    color: '#666',
  },
});

export default TimeSelector;
