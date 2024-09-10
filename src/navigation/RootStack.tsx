import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import {UserStackNavigator} from './UserStack';
import {BarberStackNavigator} from './BarberStack';
import {
  customHeaderOption,
  hiddenBackButtonOption,
  noHeaderOption,
} from './ScreenOptions';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import ValidateCodeScreen from '../screens/Auth/ValidateCodeScreen';
import ResetPasswordScreen from '../screens/Auth/ResetPasswordScreen';
import RegisterBarberHairdresserScreen from '../screens/Auth/RegisterBarberHairdresserScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  setSubscriptionStatus,
  setSubscriptionLoading,
  setSubscriptionError,
} from '../store/reducers/subscription.reducer';
import {checkSubscriptionStatus} from '../api/SubscriptionService';
import BiometricScreen from '../screens/base/BiometricScreen';
import {useNavigation} from '@react-navigation/native';
import OnboardingScreen from '../screens/Auth/OnboardingScreen';
import typography from '../styles/typographys/typography';
import colors from '../styles/colors/Colors';
import {StyleSheet} from 'react-native';

const Stack = createStackNavigator();

const RootStackNavigator: React.FC = () => {
  const user = useSelector((state: any) => state.user);
  const userRole = user.user.type?.toLowerCase() || 'user';
  const themeColors = colors[userRole] || colors.user;
  const dispatch = useDispatch();
  const [initialRoute, setInitialRoute] = useState<string>('LoginScreen');

  const navigation = useNavigation();
  console.log(' RootStackNavigator user >>', user.user);
  useEffect(() => {
    const initialize = async () => {
      if (user.user.isLoggedIn) {
        dispatch(setSubscriptionLoading(true));
        try {
          const response = await checkSubscriptionStatus(user.user.id);
          dispatch(setSubscriptionStatus(response.isActive));
        } catch (error) {
          dispatch(setSubscriptionError('Failed to verify subscription'));
        } finally {
          dispatch(setSubscriptionLoading(false));
        }
      }
    };

    const initializeBiometric = async () => {
      const biometricsEnabled = await AsyncStorage.getItem('biometricsEnabled');
      if (biometricsEnabled === 'true' && user.isLoggedIn) {
        setInitialRoute('BiometricScreen');
        await navigation.navigate('BiometricScreen');
      }
    };

    initialize();
    initializeBiometric();
  }, [user.user, dispatch]);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {!user.user.isLoggedIn ? (
        <>
          <Stack.Screen
            name="OnboardingScreen"
            component={OnboardingScreen}
            options={{...noHeaderOption, ...hiddenBackButtonOption}}
          />
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{...noHeaderOption, ...hiddenBackButtonOption}}
          />
          <Stack.Screen
            name="RegisterScreen"
            component={RegisterScreen}
            options={{
              headerTitle: 'Cadastrar',
              headerStyle: [styles.headerTransparent],
              headerTitleStyle: [styles.headerTitleWhite, typography.semiBold],
              headerTintColor: '#fff',
            }}
          />
          <Stack.Screen
            name="RegisterBarberHairdresserScreen"
            component={RegisterBarberHairdresserScreen}
            options={{
              headerTitle: 'Cadastrar',
              headerStyle: [styles.headerTransparent],
              headerTitleStyle: [styles.headerTitleWhite, typography.semiBold],
              headerTintColor: '#fff',
            }}
          />
          <Stack.Screen
            name="ValidateCodeScreen"
            component={ValidateCodeScreen}
            options={{...noHeaderOption, ...hiddenBackButtonOption}}
          />
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
            options={{...noHeaderOption, ...hiddenBackButtonOption}}
          />
        </>
      ) : (
        <>
          {user.user.type === 'USER' ? (
            <Stack.Screen name="UserStack" component={UserStackNavigator} />
          ) : (
            <Stack.Screen name="BarberStack" component={BarberStackNavigator} />
          )}
        </>
      )}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#333', // Cor de fundo do cabeçalho
  },
  headerWhite: {
    backgroundColor: '#f1f6fa',
  },
  headerTransparent: {
    backgroundColor: '#333',
  },
  headerTitle: {
    color: '#333',
    fontSize: 14,
    fontWeight: 'bold',
  },
  headerTitleWhite: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default RootStackNavigator;
