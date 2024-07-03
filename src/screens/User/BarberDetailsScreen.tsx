import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  StatusBar,
  ScrollView,
} from 'react-native';
import ProfileHeader from '../../components/molecules/ProfileHeader/ProfileHeader';
import ProfileContent from '../../components/organisms/ProfileContent/ProfileContent';
import {useSelector} from 'react-redux';
import colors from '../../styles/colors/Colors';
import LinearGradient from 'react-native-linear-gradient';
import typography from '../../styles/typographys/typography';
import CustomIcon from '../../components/atoms/Icon/Icon';

const HEADER_HEIGHT = 150;

const BarberDetailsScreen: React.FC = ({navigation}) => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const user = useSelector((state: any) => state.user);
  const service = useSelector((state: any) => state.service);
  const userRole = user.user.type?.toLowerCase() || 'user';
  const themeColors = colors[userRole] || colors.user;

  const times = [
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
  ];

  const blockedDates = [];

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleContinue = () => {
    navigation.navigate('ServiceBarberSelectionScreen', {
      date: selectedDate,
      time: selectedTime,
    });
  };

  return (
    <LinearGradient colors={['#d2e2ef', '#f1f6fa']} style={styles.gradient}>
      <StatusBar backgroundColor={themeColors.primary} />
      {/* <ProfileHeader onBackPress={handleBackPress} /> */}
      <ScrollView>
        <View style={[styles.contentContainer]}>
          <ProfileContent
            name="Josias Oliveira"
            description="Barbeiro profissional"
            description2="Lorem ipsum solor sit amet color damie coloent tetur"
            imageUrl={require('../../assets/images/screen.png')}
            onDateSelect={handleDateSelect}
            onTimeSelect={handleTimeSelect}
            selectedDate={selectedDate}
            times={times}
            blockedDates={blockedDates} // Passando as datas bloqueadas
          />

          <View style={styles.bottomButtonContainer}>
            <TouchableOpacity
              style={[styles.button, {backgroundColor: themeColors.primary}]}
              onPress={handleContinue}>
              <Text style={[styles.buttonTextLeft, typography.boldItalic]}>
                Continue
              </Text>
              <CustomIcon
                name="arrow-right"
                color={'#FFF'}
                size={10}
                type="feather"
                style={[styles.buttonTextRight, typography.extraLightItalic]}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 0,
  },
  buttonContainer: {
    padding: 20,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: {
    marginLeft: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  bottomButtonContainer: {
    padding: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: '#4231a4',
    borderRadius: 50,
  },
  buttonTextLeft: {
    flex: 1,
    fontSize: 18,
    color: '#fff',
    textAlign: 'left',
  },
  buttonTextRight: {
    flex: 1,
    fontSize: 18,
    color: '#fff',
    textAlign: 'right',
  },
});

export default BarberDetailsScreen;
