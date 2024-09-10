import React from 'react';
import {View, StyleSheet, ScrollView, StatusBar} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {GlobalLayoutStyles} from '../../../styles/GlobalLayoutStyles';
import PixDetails from '../../../components/organisms/PixDetails/PixDetails';
import {useSelector} from 'react-redux';
import colors from '../../../styles/colors/Colors';

const PixScreen: React.FC = () => {
  const user = useSelector((state: any) => state.user);
  const userRole = user.user.type?.toLowerCase() || 'user';
  const themeColors = colors[userRole] || colors.user;

  return (
    <LinearGradient
      colors={['#f1f6fa', themeColors._claro]}
      style={styles.gradient}>
      <StatusBar backgroundColor={'#f1f6fa'} barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={GlobalLayoutStyles.flexContainer}>
          <PixDetails themeColors={themeColors} />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
});

export default PixScreen;
