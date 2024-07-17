import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import * as Keychain from 'react-native-keychain';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../store/reducers/user.reducer';
import {StackActions} from '@react-navigation/native';
import CustomIcon from '../../components/atoms/Icon/Icon';
import colors from '../../styles/colors/Colors';
import typography from '../../styles/typographys/typography';

interface SettingsItemProps {
  title: string;
  description: string;
  onPress: () => void;
  icon: string;
  themeColors: any;
}

const SettingsItem: React.FC<SettingsItemProps> = ({
  title,
  description,
  icon,
  onPress,
  themeColors,
}) => (
  <TouchableOpacity style={styles.settingsItem} onPress={onPress}>
    <View
      style={[
        styles.roundedIconSettings,
        {backgroundColor: themeColors.primary},
      ]}>
      <CustomIcon
        name={icon}
        color={themeColors.white}
        size={10}
        type="font-awesome"
      />
    </View>
    <View style={styles.settingsItemTextContainer}>
      <Text style={[styles.settingsItemTitle, typography.semiBold]}>
        {title}
      </Text>
      <Text style={[styles.settingsItemDescription, typography.regular]}>
        {description}
      </Text>
    </View>
  </TouchableOpacity>
);

interface SettingsScreenProps {
  navigation: any;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const userRole = user.user.type?.toLowerCase() || 'user';
  const themeColors = colors[userRole] || colors.user;

  const settingsData = [
    {
      id: '1',
      title: 'Notificações',
      description: 'Gerencie suas notificações',
      screen: 'Notifications',
      icon: 'bell',
    },
    {
      id: '2',
      title: 'Perfil',
      description: 'Veja e edite seu perfil',
      screen: 'ProfileScreen',
      icon: 'user',
    },
    {
      id: '3',
      title: 'Segurança',
      description: 'Configurações de segurança',
      screen: 'Security',
      icon: 'shield',
    },
    {
      id: '4',
      title: 'Endereço',
      description: 'Gerencie seus endereços',
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
    <View style={styles.container}>
      <StatusBar
        backgroundColor={themeColors.primary}
        barStyle="light-content"
      />
      <View style={styles.header}>
        <Image
          source={{uri: 'https://via.placeholder.com/150'}}
          style={styles.profileImage}
        />
        <View style={styles.userInfo}>
          <Text style={[styles.userName, typography.bold]}>
            {user.user.username}
          </Text>
          <Text style={[styles.userEmail, typography.regular]}>
            {user.user.email}
          </Text>
        </View>
      </View>
      <FlatList
        data={settingsData}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <SettingsItem
            title={item.title}
            description={item.description}
            icon={item.icon}
            onPress={() => handleSettingsPress(item.screen)}
            themeColors={themeColors}
          />
        )}
        contentContainerStyle={styles.flatListContent}
      />
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogoutPress}>
          <View
            style={[
              styles.roundedIconSettings,
              {backgroundColor: themeColors.primary},
            ]}>
            <CustomIcon
              name="sign-out"
              color={themeColors.white}
              size={15}
              type="font-awesome"
            />
          </View>
          <Text style={[styles.logoutButtonText, typography.semiBold]}>
            Sair do app
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    textTransform: 'capitalize',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  flatListContent: {
    padding: 20,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  roundedIconSettings: {
    width: 40,
    height: 40,
    borderRadius: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsItemTextContainer: {
    marginLeft: 15,
  },
  settingsItemTitle: {
    fontSize: 16,
  },
  settingsItemDescription: {
    fontSize: 14,
    color: '#666',
  },
  footer: {
    paddingHorizontal: 30,
    paddingVertical: 30,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    alignItems: 'flex-start',
  },
  planText: {
    fontSize: 16,
    color: '#666',
  },
  planViews: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  upgradeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  upgradeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 0,
  },
  logoutButtonText: {
    color: '#333',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default SettingsScreen;
