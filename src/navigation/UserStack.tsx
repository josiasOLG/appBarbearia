import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  noHeaderOption,
  hiddenBackButtonOption,
  customHeaderOption,
} from './ScreenOptions';

import HomeScreen from '../screens/User/HomeScreen';
import BarberListScreen from '../screens/User/BarberListScreen';
import SettingsScreen from '../screens/base/SettingsScreen';
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

const UserStack = createStackNavigator();

export const UserStackNavigator = () => {
  const service = useSelector((state: any) => state.service);
  const userRoleService = service.selectedService?.toLowerCase() || 'user';
  const themeColorsService = colors[userRoleService] || colors.user;

  return (
    <UserStack.Navigator>
      <UserStack.Screen
        name="HomeScreen"
        options={{...noHeaderOption, ...hiddenBackButtonOption}}
        component={HomeScreen}
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
            {backgroundColor: themeColorsService.primary},
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
            {backgroundColor: themeColorsService.primary},
          ],
          headerTitleStyle: [styles.headerTitleWhite, typography.semiBold],
          headerTintColor: '#fff',
        }}
      />

      <UserStack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          headerTitle: 'Configurações',
          headerStyle: [
            styles.headerTransparent,
            {backgroundColor: themeColorsService.primary},
          ],
          headerTitleStyle: [styles.headerTitleWhite, typography.semiBold],
          headerTintColor: '#fff',
        }}
      />
      <UserStack.Screen
        name="AssinaturaScreen"
        component={AssinaturaScreen}
        options={{
          headerTitle: 'Assinaturas',
          headerStyle: [
            styles.headerTransparent,
            {backgroundColor: themeColorsService.primary},
          ],
          headerTitleStyle: [styles.headerTitleWhite, typography.semiBold],
          headerTintColor: '#fff',
        }}
      />
      <UserStack.Screen
        name="ListaCartoesScreen"
        component={ListaCartoesScreen}
        options={{
          headerTitle: 'Assinaturas',
          headerStyle: styles.headerWhite,
          headerTitleStyle: [styles.headerTitle, typography.semiBold],
          headerTintColor: '#333',
        }}
      />
      <UserStack.Screen
        name="AssinaturaStatus"
        component={AssinaturaStatus}
        options={{
          headerTitle: 'Assinaturas',
          headerStyle: styles.headerWhite,
          headerTitleStyle: styles.headerTitle,
          headerTintColor: '#333',
        }}
      />
      <UserStack.Screen
        name="CadastrarCartaoScreen"
        component={CadastrarCartaoScreen}
        options={{
          headerTitle: 'Cadastrar cartão',
          headerStyle: styles.headerWhite,
          headerTitleStyle: [styles.headerTitle, typography.semiBold],
          headerTintColor: '#333',
        }}
      />
      <UserStack.Screen
        name="CadastrarEnderecoScreen"
        component={CadastrarEnderecoScreen}
        options={{
          headerTitle: 'Cadastrar endereço',
          headerStyle: [
            styles.headerTransparent,
            {backgroundColor: themeColorsService.primary},
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
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerTitleWhite: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
