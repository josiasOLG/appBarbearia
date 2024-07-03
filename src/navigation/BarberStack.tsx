import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SettingsScreen from '../screens/base/SettingsScreen';
import {
  noHeaderOption,
  hiddenBackButtonOption,
  customHeaderOption,
} from './ScreenOptions';
import HomeScreen from '../screens/User/HomeScreen';
import BarberHomeScreen from '../screens/Barber/BarberHomeScreen';
import colors from '../styles/colors/Colors';
import CadastrarEnderecoScreen from '../screens/base/CadastrarEnderecoScreen';
import typography from '../styles/typographys/typography';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import ServiceSelectionScreen from '../screens/base/ServiceSelectionScreen';
import ServiceRegistrationScreen from '../screens/Barber/ServiceRegistrationScreen';
import ProfileScreen from '../screens/base/ProfileScreen';
const BarberStack = createStackNavigator();

export const BarberStackNavigator = () => {
  const user = useSelector((state: any) => state.user);
  const userRole = user?.user.type?.toLowerCase() || 'user'; // Garantir que o role esteja definido e em minúsculas
  const themeColors = colors[userRole] || colors.user; // Garantir que o role seja uma chave válida

  return (
    <BarberStack.Navigator>
      <BarberStack.Screen
        name="BarberHome"
        component={BarberHomeScreen}
        options={{...noHeaderOption, ...hiddenBackButtonOption}}
      />
      <BarberStack.Screen
        name="BarberDetails"
        component={HomeScreen}
        options={{...noHeaderOption, ...hiddenBackButtonOption}}
      />
      <BarberStack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          headerTitle: 'Configurações',
          headerStyle: [
            styles.headerTransparent,
            {backgroundColor: themeColors.primary},
          ],
          headerTitleStyle: [styles.headerTitleWhite, typography.semiBold],
          headerTintColor: '#fff',
        }}
      />
      <BarberStack.Screen
        name="CadastrarEnderecoScreen"
        component={CadastrarEnderecoScreen}
        options={{
          headerTitle: 'Cadastrar endereço',
          headerStyle: [
            styles.headerTransparent,
            {backgroundColor: themeColors.primary},
          ],
          headerTitleStyle: [styles.headerTitleWhite, typography.semiBold],
          headerTintColor: '#fff',
        }}
      />
      <BarberStack.Screen
        name="ServiceRegistrationScreen"
        component={ServiceRegistrationScreen}
        options={{
          headerTitle: 'Cadastrar serviços',
          headerStyle: [
            styles.headerTransparent,
            {backgroundColor: themeColors.primary},
          ],
          headerTitleStyle: [styles.headerTitleWhite, typography.semiBold],
          headerTintColor: '#fff',
        }}
      />
      <BarberStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerTitle: 'Perfil',
          headerStyle: [
            styles.headerTransparent,
            {backgroundColor: themeColors.primary},
          ],
          headerTitleStyle: [styles.headerTitleWhite, typography.semiBold],
          headerTintColor: '#fff',
        }}
      />
    </BarberStack.Navigator>
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
