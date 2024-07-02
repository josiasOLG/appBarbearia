import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, StatusBar} from 'react-native';

import LottieView from 'lottie-react-native';
import typography from '../../styles/typographys/typography';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import fonts from '../../styles/GlobalFonts';
import LinearGradient from 'react-native-linear-gradient';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import UserTab from './Tabs/UserTab';
import BarberTab from './Tabs/BarberTab';
import EcoIcon from '../../assets/icons/eco.svg';

interface LoginScreenProps {
  navigation: any;
}

const renderScene = SceneMap({
  user: UserTab,
  barber: BarberTab,
});

const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'user', title: 'Usuário'},
    {key: 'barber', title: 'Empresario(a)'},
  ]);

  const handleIndexChange = (newIndex: number) => {
    setIndex(newIndex);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient colors={['#7b67e9', '#624ed1']} style={styles.gradient}>
        <StatusBar backgroundColor={'#7b67e9'} />
        <EcoIcon style={styles.iconBack} />
        <View style={styles.topSection}>
          <LottieView
            source={require('../../assets/lottie/lottie-login.json')}
            autoPlay
            loop
            style={styles.animation}
          />
          <Text style={[styles.greeting, typography.bold]}>
            Acesso Exclusivo
          </Text>
          <Text style={styles.introText}>
            Entre e reserve sua transformação de estilo com facilidade
          </Text>
        </View>
        <View style={styles.margin}>
          <TabView
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={handleIndexChange}
            renderTabBar={props => (
              <TabBar
                {...props}
                indicatorStyle={styles.tabIndicator}
                style={styles.tabBar}
                labelStyle={styles.tabLabel}
                activeColor="#fc7115"
                inactiveColor="#fff"
                onTabPress={({route}) => {
                  // Previne a ação padrão de arrastar para mudar de aba
                  props.jumpTo(route.key);
                }}
              />
            )}
          />
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  gradient: {
    flex: 1,
  },
  tabIndicator: {
    backgroundColor: '#624ed1',
  },
  tabBar: {
    backgroundColor: 'transparent',
  },
  tabLabel: {
    fontSize: fonts.body,
    fontWeight: 'bold',
  },
  topSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleSection: {
    flex: 2,
    justifyContent: 'center',
  },
  bottomSection: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: hp('5%'),
  },
  animation: {
    width: wp('50%'),
    height: hp('30%'),
  },
  margin: {
    marginHorizontal: 20,
  },
  greeting: {
    fontSize: fonts.title,
    fontWeight: 'bold',
    color: '#fff',
  },
  introText: {
    fontSize: fonts.body,
    color: '#fff',
    textAlign: 'center',
  },
  input: {
    height: hp('7%'),
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: wp('2.5%'),
    paddingLeft: wp('4%'),
    marginBottom: hp('2%'),
    fontSize: fonts.body,
  },
  loginButton: {
    backgroundColor: '#fc7115',
    padding: hp('2%'),
    borderRadius: wp('2.5%'),
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  loginButtonText: {
    color: '#fff',
    fontSize: fonts.body,
  },
  signUpButton: {
    // Adicione estilos específicos se necessário
  },
  signUpButtonText: {
    color: '#333',
    fontSize: fonts.body,
  },

  error: {
    color: 'red',
    marginBottom: hp('0.5%'),
    fontSize: fonts.body,
  },
  iconBack: {
    position: 'absolute',
    opacity: 0.3,
  },
});

export default LoginScreen;
