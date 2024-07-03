import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import colors from '../../../styles/colors/Colors';

interface TimeSelectorProps {
  times: string[];
  onTimeSelect: (time: string) => void;
}

const TimeSelector: React.FC<TimeSelectorProps> = ({times, onTimeSelect}) => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const user = useSelector((state: any) => state.user);
  const service = useSelector((state: any) => state.service);
  const userRole = user.user.type?.toLowerCase() || 'user';
  const themeColors = colors[userRole] || colors.user;

  const handleTimePress = (time: string) => {
    setSelectedTime(time);
    onTimeSelect(time);
  };

  return (
    <View style={styles.container}>
      {times.map(time => (
        <TouchableOpacity
          key={time}
          onPress={() => handleTimePress(time)}
          style={[
            styles.timeButton,
            selectedTime === time && {backgroundColor: themeColors.primary},
          ]}>
          <Text
            style={[styles.timeText, selectedTime === time && {color: '#fff'}]}>
            {time}
          </Text>
        </TouchableOpacity>
      ))}
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
});

export default TimeSelector;
