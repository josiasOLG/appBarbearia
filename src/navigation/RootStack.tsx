import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import OnboardingScreen from '../screens/Auth/OnboardingScreen';
import {UserStackNavigator} from './UserStack';
import {BarberStackNavigator} from './BarberStack';
import {createStackNavigator} from '@react-navigation/stack';
import {
  customHeaderOption,
  hiddenBackButtonOption,
  noHeaderOption,
} from './ScreenOptions';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import {
  setSubscriptionStatus,
  setSubscriptionLoading,
  setSubscriptionError,
} from '../store/reducers/subscription.reducer'; // Ações do Redux
import {checkSubscriptionStatus} from '../api/SubscriptionService';
import ValidateCodeScreen from '../screens/Auth/ValidateCodeScreen';
import ResetPasswordScreen from '../screens/Auth/ResetPasswordScreen';
import RegisterBarberHairdresserScreen from '../screens/Auth/RegisterBarberHairdresserScreen';

const Stack = createStackNavigator();

function RootStackNavigator() {
  const {user} = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const verifySubscription = async () => {
      if (user.isLoggedIn) {
        dispatch(setSubscriptionLoading(true));
        try {
          console.log(user);
          const response = await checkSubscriptionStatus(user.id);
          dispatch(setSubscriptionStatus(response.isActive));
        } catch (error) {
          dispatch(setSubscriptionError('Failed to verify subscription'));
        } finally {
          dispatch(setSubscriptionLoading(false));
        }
      }
    };
    verifySubscription();
  }, [user, dispatch]);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {!user.isLoggedIn ? (
        <>
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen
            name="LoginScreens"
            component={LoginScreen}
            options={{...noHeaderOption, ...hiddenBackButtonOption}}
          />

          <Stack.Screen
            name="RegisterScreen"
            component={RegisterScreen}
            options={customHeaderOption('#f0f0f0', 'blue', 'Cadastrar')}
          />
          <Stack.Screen
            name="RegisterBarberHairdresserScreen"
            component={RegisterBarberHairdresserScreen}
            options={customHeaderOption('#f0f0f0', 'blue', 'Cadastrar')}
          />

          <Stack.Screen
            name="ValidarCodigoSMS"
            component={ValidateCodeScreen}
            options={{...noHeaderOption, ...hiddenBackButtonOption}}
          />
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
            options={{...noHeaderOption, ...hiddenBackButtonOption}}
          />
        </>
      ) : user.type === 'USER' ? (
        <Stack.Screen name="UserStack" component={UserStackNavigator} />
      ) : (
        <Stack.Screen name="BarberStack" component={BarberStackNavigator} />
      )}
    </Stack.Navigator>
  );
}

export default RootStackNavigator;
