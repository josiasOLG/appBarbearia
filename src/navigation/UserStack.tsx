import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  noHeaderOption,
  hiddenBackButtonOption,
  customHeaderOption,
} from './ScreenOptions';

import HomeScreen from '../screens/User/HomeScreen';
import BarberListScreen from '../screens/User/BarberListScreen';
import SettingsScreen from '../screens/User/SettingsScreen';
import CadastrarCartaoScreen from '../screens/Barber/Assinatura/CadastrarCartaoScreen';
import AssinaturaScreen from '../screens/Barber/Assinatura/AssinaturaScreen';
import {StyleSheet} from 'react-native';
import ListaCartoesScreen from '../screens/Barber/Assinatura/ListaCartoesScreen';
import typography from '../styles/typographys/typography';
import CadastrarEnderecoScreen from '../screens/base/CadastrarEnderecoScreen';
import AssinaturaStatus from '../screens/Barber/Assinatura/AssinaturaStatus';
import {useSelector} from 'react-redux';
import colors from '../styles/colors/Colors';
import ServiceSelectionScreen from '../screens/base/ServiceSelectionScreen';
import BarberDetailsScreen from '../screens/User/BarberDetailsScreen';
import ServiceBarberSelectionScreen from '../screens/User/ServiceSelectionScreen';
import AppointmentSummaryScreen from '../screens/User/AppointmentSummaryScreen';
import ProfileScreen from '../screens/base/ProfileScreen';
import StatusListScreen from '../screens/User/StatusListScreen';
import AppointmentDetailsScreen from '../screens/User/AppointmentDetailsScreen';
import FidelityScreen from '../screens/User/FidelityScreen';
import FidelityDetailScreen from '../screens/User/FidelityDetailScreen';
import QRCodeScreen from '../screens/User/QRCodeScreen';
import BiometricScreen from '../screens/base/BiometricScreen';
import NotificationScreen from '../screens/base/NotificationScreen';
import SecurityScreen from '../screens/base/SecurityItem';

const UserStack = createStackNavigator();

export const UserStackNavigator = () => {
  const user = useSelector((state: any) => state.user);
  const userRole = user.user.type?.toLowerCase() || 'user';
  const themeColors = colors[userRole] || colors.user;

  return (
    <UserStack.Navigator>
      <UserStack.Screen
        name="HomeScreen"
        options={{...noHeaderOption, ...hiddenBackButtonOption}}
        component={HomeScreen}
      />
      <UserStack.Screen
        name="BiometricScreen"
        component={BiometricScreen}
        initialParams={{userType: user.type}}
      />
      <UserStack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          headerTitle: 'Configurações',
          headerStyle: [
            styles.headerTransparent,
            {backgroundColor: themeColors.white},
          ],
          headerTitleStyle: [styles.headerTitle, typography.semiBold],
          headerTintColor: '#333',
        }}
      />
      <UserStack.Screen
        name="ServiceSelectionScreen"
        options={{...noHeaderOption, ...hiddenBackButtonOption}}
        component={ServiceSelectionScreen}
      />
      <UserStack.Screen
        name="BarberListScreen"
        component={BarberListScreen}
        options={customHeaderOption(
          'transparent',
          '#333',
          '',
          true,
          'transparent',
        )}
      />
      <UserStack.Screen
        name="BarberDetailsScreen"
        component={BarberDetailsScreen}
        options={{
          headerTitle: 'Agendar',
          headerStyle: [
            styles.headerTransparent,
            {backgroundColor: themeColors.primary},
          ],
          headerTitleStyle: [styles.headerTitleWhite, typography.semiBold],
          headerTintColor: '#fff',
        }}
      />
      <UserStack.Screen
        name="ServiceBarberSelectionScreen"
        component={ServiceBarberSelectionScreen}
        options={{
          headerTitle: 'Agendar',
          headerStyle: [
            styles.headerTransparent,
            {backgroundColor: themeColors.primary},
          ],
          headerTitleStyle: [styles.headerTitleWhite, typography.semiBold],
          headerTintColor: '#fff',
        }}
      />
      <UserStack.Screen
        name="AppointmentSummaryScreen"
        component={AppointmentSummaryScreen}
        options={{
          headerTitle: 'Agendar',
          headerStyle: [
            styles.headerTransparent,
            {backgroundColor: themeColors.primary},
          ],
          headerTitleStyle: [styles.headerTitleWhite, typography.semiBold],
          headerTintColor: '#fff',
        }}
      />
      <UserStack.Screen
        name="StatusListScreen"
        component={StatusListScreen}
        options={{
          headerTitle: 'Status',
          headerStyle: [
            styles.headerTransparent,
            {backgroundColor: themeColors.primary},
          ],
          headerTitleStyle: [styles.headerTitleWhite, typography.semiBold],
          headerTintColor: '#fff',
        }}
      />
      <UserStack.Screen
        name="AppointmentDetailsScreen"
        component={AppointmentDetailsScreen}
        options={{
          headerTitle: 'Status',
          headerStyle: [
            styles.headerTransparent,
            {backgroundColor: themeColors.primary},
          ],
          headerTitleStyle: [styles.headerTitleWhite, typography.semiBold],
          headerTintColor: '#fff',
        }}
      />
      <UserStack.Screen
        name="FidelityScreen"
        component={FidelityScreen}
        options={{
          headerTitle: 'Fidelidade',
          headerStyle: [
            styles.headerTransparent,
            {backgroundColor: themeColors.secondary},
          ],
          headerTitleStyle: [styles.headerTitleWhite, typography.semiBold],
          headerTintColor: '#fff',
        }}
      />
      <UserStack.Screen
        name="FidelityDetailScreen"
        component={FidelityDetailScreen}
        options={{
          headerTitle: 'Fidelidade',
          headerStyle: [
            styles.headerTransparent,
            {backgroundColor: themeColors.secondary},
          ],
          headerTitleStyle: [styles.headerTitleWhite, typography.semiBold],
          headerTintColor: '#fff',
        }}
      />

      <UserStack.Screen
        name="QRCodeScreen"
        component={QRCodeScreen}
        options={{
          headerTitle: '',
          headerStyle: [
            styles.headerTransparent,
            {backgroundColor: themeColors.secondary},
          ],
          headerTitleStyle: [styles.headerTitleWhite, typography.semiBold],
          headerTintColor: '#fff',
        }}
      />

      <UserStack.Screen
        name="CadastrarEnderecoScreen"
        component={CadastrarEnderecoScreen}
        options={{
          headerTitle: 'Cadastrar endereço',
          headerStyle: [
            styles.headerTransparent,
            {backgroundColor: themeColors.white},
          ],
          headerTitleStyle: [styles.headerTitle, typography.semiBold],
          headerTintColor: '#333',
        }}
      />
      <UserStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerTitle: 'Perfil',
          headerStyle: [
            styles.headerTransparent,
            {backgroundColor: themeColors.white},
          ],
          headerTitleStyle: [styles.headerTitle, typography.semiBold],
          headerTintColor: '#333',
        }}
      />
      <UserStack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{
          headerTitle: 'Notificações',
          headerStyle: [
            styles.headerTransparent,
            {backgroundColor: themeColors.white},
          ],
          headerTitleStyle: [styles.headerTitle, typography.semiBold],
          headerTintColor: '#333',
        }}
      />
      <UserStack.Screen
        name="SecurityScreen"
        component={SecurityScreen}
        options={{
          headerTitle: 'Segurança',
          headerStyle: [
            styles.headerTransparent,
            {backgroundColor: themeColors.primary},
          ],
          headerTitleStyle: [styles.headerTitleWhite, typography.semiBold],
          headerTintColor: '#fff',
        }}
      />
    </UserStack.Navigator>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#4231a4', // Cor de fundo do cabeçalho
  },
  headerWhite: {
    backgroundColor: '#f1f6fa',
  },
  headerTransparent: {
    backgroundColor: '#6354d3',
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
