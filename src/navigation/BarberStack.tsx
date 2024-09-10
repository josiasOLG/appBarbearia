import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
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
import ConfirmationScreen from '../screens/Barber/ConfirmationScreen';
import SettingsBarberScreen from '../screens/Barber/SettingsBarberScreen';
import QRCodeScannerScreen from '../screens/Barber/QRCodeScannerScreen';
import FeedbackScreen from '../screens/Barber/FeedbackScreen';
import SecurityScreen from '../screens/base/SecurityItem';
import ReportScreen from '../screens/Barber/ReportScreen';
import PDFViewer from '../screens/Barber/PDFViewer';
import ResetPasswordBarberScreen from '../screens/Barber/ResetPasswordBarberScreen';
import BiometricScreen from '../screens/base/BiometricScreen';
import ValidateCodeBarberScreen from '../screens/Barber/ValidateCodeBarberScreen';
import NotificationScreen from '../screens/base/NotificationScreen';
import AssinaturaScreen from '../screens/Barber/Assinatura/AssinaturaScreen';
import ListaCartoesScreen from '../screens/Barber/Assinatura/ListaCartoesScreen';
import AssinaturaStatus from '../screens/Barber/Assinatura/AssinaturaStatus';
import CadastrarCartaoScreen from '../screens/Barber/Assinatura/CadastrarCartaoScreen';
import PixScreen from '../screens/Barber/Assinatura/PixScreen';

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
        name="BiometricScreen"
        component={BiometricScreen}
        initialParams={{userType: user.type}}
        options={{...noHeaderOption, ...hiddenBackButtonOption}}
      />
      <BarberStack.Screen
        name="BarberDetails"
        component={HomeScreen}
        options={{...noHeaderOption, ...hiddenBackButtonOption}}
      />
      <BarberStack.Screen
        name="SettingsBarberScreen"
        component={SettingsBarberScreen}
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
      <BarberStack.Screen
        name="ConfirmationScreen"
        component={ConfirmationScreen}
        options={{
          headerTitle: 'Agendamento',
          headerStyle: [
            styles.headerTransparent,
            {backgroundColor: themeColors.primary},
          ],
          headerTitleStyle: [styles.headerTitleWhite, typography.semiBold],
          headerTintColor: '#fff',
        }}
      />
      <BarberStack.Screen
        name="QRCodeScannerScreen"
        component={QRCodeScannerScreen}
        options={{
          headerTitle: 'Código',
          headerStyle: [
            styles.headerTransparent,
            {backgroundColor: themeColors.primary},
          ],
          headerTitleStyle: [styles.headerTitleWhite, typography.semiBold],
          headerTintColor: '#fff',
        }}
      />
      <BarberStack.Screen
        name="FeedbackScreen"
        component={FeedbackScreen}
        options={{
          headerTitle: 'Feedback',
          headerStyle: [
            styles.headerTransparent,
            {backgroundColor: themeColors.primary},
          ],
          headerTitleStyle: [styles.headerTitleWhite, typography.semiBold],
          headerTintColor: '#fff',
        }}
      />
      <BarberStack.Screen
        name="ReportScreen"
        component={ReportScreen}
        options={{
          headerTitle: 'Relatórios',
          headerStyle: [
            styles.headerTransparent,
            {backgroundColor: themeColors.primary},
          ],
          headerTitleStyle: [styles.headerTitleWhite, typography.semiBold],
          headerTintColor: '#fff',
        }}
      />
      <BarberStack.Screen
        name="PDFViewer"
        component={PDFViewer}
        options={{
          headerTitle: 'Relatórios',
          headerStyle: [
            styles.headerTransparent,
            {backgroundColor: themeColors.primary},
          ],
          headerTitleStyle: [styles.headerTitleWhite, typography.semiBold],
          headerTintColor: '#fff',
        }}
      />
      <BarberStack.Screen
        name="ResetPasswordBarberScreen"
        component={ResetPasswordBarberScreen}
        options={{
          headerTitle: 'Mudar senha',
          headerStyle: [
            styles.headerTransparent,
            {backgroundColor: themeColors.primary},
          ],
          headerTitleStyle: [styles.headerTitleWhite, typography.semiBold],
          headerTintColor: '#fff',
        }}
      />
      <BarberStack.Screen
        name="ValidateCodeBarberScreen"
        component={ValidateCodeBarberScreen}
        options={{
          headerTitle: 'Mudar senha',
          headerStyle: [
            styles.headerTransparent,
            {backgroundColor: themeColors.primary},
          ],
          headerTitleStyle: [styles.headerTitleWhite, typography.semiBold],
          headerTintColor: '#fff',
        }}
      />
      <BarberStack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{
          headerTitle: 'Notificações',
          headerStyle: [
            styles.headerTransparent,
            {backgroundColor: themeColors.primary},
          ],
          headerTitleStyle: [styles.headerTitleWhite, typography.semiBold],
          headerTintColor: '#fff',
        }}
      />

      {/* <BarberStack.Screen
        name="AssinaturaScreen"
        component={AssinaturaScreen}
        options={{
          headerTitle: 'Assinaturas',
          headerStyle: [
            styles.headerTransparent,
            {backgroundColor: themeColors.primary},
          ],
          headerTitleStyle: [styles.headerTitleWhite, typography.semiBold],
          headerTintColor: '#fff',
        }}
      />
      <BarberStack.Screen
        name="ListaCartoesScreen"
        component={ListaCartoesScreen}
        options={{
          headerTitle: 'Assinaturas',
          headerStyle: styles.headerWhite,
          headerTitleStyle: [styles.headerTitle, typography.semiBold],
          headerTintColor: '#333',
        }}
      />
      <BarberStack.Screen
        name="AssinaturaStatus"
        component={AssinaturaStatus}
        options={{
          headerTitle: 'Assinaturas',
          headerStyle: styles.headerWhite,
          headerTitleStyle: styles.headerTitle,
          headerTintColor: '#333',
        }}
      />
      <BarberStack.Screen
        name="CadastrarCartaoScreen"
        component={CadastrarCartaoScreen}
        options={{
          headerTitle: 'Cadastrar cartão',
          headerStyle: styles.headerWhite,
          headerTitleStyle: [styles.headerTitle, typography.semiBold],
          headerTintColor: '#333',
        }}
      /> */}
      <BarberStack.Screen
        name="PixScreen"
        component={PixScreen}
        options={{
          headerTitle: 'Qr code',
          headerStyle: styles.headerWhite,
          headerTitleStyle: [styles.headerTitle, typography.semiBold],
          headerTintColor: '#333',
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
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerTitleWhite: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
