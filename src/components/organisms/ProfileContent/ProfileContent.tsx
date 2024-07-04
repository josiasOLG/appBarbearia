import React from 'react';
import {View, StyleSheet} from 'react-native';
import ProfileInfo from '../../molecules/ProfileInfo/ProfileInfo';
import Calendar from '../../molecules/Calendar/Calendar';
import TimeSelector from '../../molecules/TimeSelector/TimeSelector';
import {useSelector} from 'react-redux';
import colors from '../../../styles/colors/Colors';

interface ProfileContentProps {
  name: string;
  description: string;
  description2: string;
  imageUrl: any;
  onDateSelect: (date: string) => void;
  onTimeSelect: (time: string) => void;
  selectedDate: string;
  times: string[];
  blockedDates: string[]; // Adicionando a propriedade blockedDates
}

const ProfileContent: React.FC<ProfileContentProps> = ({
  name,
  description,
  description2,
  imageUrl,
  onDateSelect,
  onTimeSelect,
  selectedDate,
  times,
  blockedDates,
}) => {
  const user = useSelector((state: any) => state.user);
  const service = useSelector((state: any) => state.service);
  const userRole = user.user.type?.toLowerCase() || 'user';
  const themeColors = colors[userRole] || colors.user;

  return (
    <View style={[styles.container]}>
      <ProfileInfo
        name={name}
        description={description}
        description2={description2}
        imageUrl={imageUrl}
      />
      <Calendar onDateSelect={onDateSelect} blockedDates={blockedDates} />
      {selectedDate && (
        <TimeSelector
          times={times}
          onTimeSelect={onTimeSelect}
          selectedDate={selectedDate}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProfileContent;
