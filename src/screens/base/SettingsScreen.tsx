import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import * as Keychain from 'react-native-keychain';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../store/reducers/user.reducer';
import {StackActions} from '@react-navigation/native';
import typography from '../../styles/typographys/typography';
import IconBackBlack from '../../assets/icons/BackBlack.svg';
import CustomIcon from '../../components/atoms/Icon/Icon';
import colors from '../../styles/colors/Colors';

interface SettingsItemProps {
  title: string;
  onPress: () => void;
  icon: string;
  themeColors: any;
}

const SettingsItem: React.FC<SettingsItemProps> = ({
  title,
  icon,
  onPress,
  themeColors,
}) => (
  <TouchableOpacity
    style={[styles.settingsItem, {backgroundColor: themeColors.primary}]}
    onPress={onPress}>
    <CustomIcon name={icon} color="#fff" size={10} type="font-awesome" />
    <Text style={styles.settingsItemText}>{title}</Text>
  </TouchableOpacity>
);

interface SettingsScreenProps {
  navigation: any;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const service = useSelector((state: any) => state.service);
  const userRole = service.selectedService?.toLowerCase() || 'user';
  const themeColors = colors[userRole] || colors.user;
  const settingsData = [
    {id: '2', title: 'Notificações', screen: 'Notifications', icon: 'bell'},
    {id: '3', title: 'Segurança', screen: 'Security', icon: 'shield'},
    {
      id: '4',
      title: 'Endereço',
      screen: 'CadastrarEnderecoScreen',
      icon: 'map-marker',
    },
  ];

  const handleSettingsPress = (screen: string) => {
    navigation.navigate(screen);
  };

  const handleLogoutPress = async () => {
    try {
      await dispatch(logout());
      await Keychain.resetGenericPassword();
      navigation.dispatch(StackActions.replace('LoginScreens'));
    } catch (error) {
      console.log('Erro ao fazer logout:', error);
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: themeColors.black}]}>
      <StatusBar backgroundColor={themeColors.primary} />
      <View style={[styles.topSection, {backgroundColor: themeColors.primary}]}>
        {/* <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <IconBackBlack color={'#fff'} width={40} height={40} />
        </TouchableOpacity> */}
        <View style={{alignItems: 'center'}}>
          <View style={styles.roudedImage}></View>
        </View>
      </View>
      <View style={styles.middleSection}>
        <View style={styles.containerTextProfile}>
          <Text style={[styles.userTitle, typography.bold]}>
            {user.user.username}
          </Text>
          <Text style={[styles.userText, typography.light]}>
            Barbeiro | Certificado barbeiro | Certificado
          </Text>
        </View>
        <FlatList
          data={settingsData}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <SettingsItem
              title={item.title}
              icon={item.icon}
              onPress={() => handleSettingsPress(item.screen)}
              themeColors={themeColors}
            />
          )}
          contentContainerStyle={styles.flatListContent}
        />
      </View>
      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogoutPress}>
          <Text style={styles.logoutButtonText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5350d3',
  },
  iconClick: {
    transform: [{rotate: '180deg'}],
  },
  roudedImage: {
    position: 'absolute',
    bottom: -120,
    width: 140,
    height: 140,
    borderRadius: 200,
    backgroundColor: '#fff',
  },
  topSection: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    backgroundColor: '#4231a4',
  },
  containerTextProfile: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  userTitle: {
    fontSize: 24,
    color: '#fff',
  },
  userText: {
    fontSize: 16,
    color: '#fff',
  },

  middleSection: {
    flex: 7,
    backgroundColor: 'transparent',
    marginTop: 80,
    paddingHorizontal: 20,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  settingsItem: {
    backgroundColor: '#4231a4',
    paddingVertical: 20,
    paddingHorizontal: 15,
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 10,
    borderRadius: 5,
    flexDirection: 'row',
  },
  settingsItemText: {
    fontSize: 18,
    color: '#fff',
    marginLeft: 20,
  },
  bottomSection: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#333',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  logoutButtonText: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
