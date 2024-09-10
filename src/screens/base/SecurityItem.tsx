import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Switch,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import colors from '../../styles/colors/Colors';
import typography from '../../styles/typographys/typography';
import CustomIcon from '../../components/atoms/Icon/Icon';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SecurityItemProps {
  title: string;
  description: string;
  icon: string;
  onPress?: () => void;
  switchValue?: boolean;
  onSwitchChange?: (value: boolean) => void;
  themeColors: any;
  library?: any;
}

const SecurityItem: React.FC<SecurityItemProps> = ({
  title,
  description,
  icon,
  onPress,
  switchValue,
  onSwitchChange,
  themeColors,
  library = 'feather',
}) => (
  <TouchableOpacity style={styles.securityItem} onPress={onPress}>
    <View
      style={[
        styles.roundedIconSecurity,
        {backgroundColor: themeColors.primary},
      ]}>
      <CustomIcon
        name={icon}
        color={themeColors.white}
        size={20}
        type={library}
      />
    </View>
    <View style={styles.securityItemTextContainer}>
      <Text style={[styles.securityItemTitle, typography.semiBold]}>
        {title}
      </Text>
      <Text style={[styles.securityItemDescription, typography.regular]}>
        {description}
      </Text>
    </View>
    {onSwitchChange !== undefined ? (
      <Switch
        value={switchValue}
        onValueChange={onSwitchChange}
        thumbColor={themeColors.primary}
        trackColor={{false: '#767577', true: themeColors.primary}}
      />
    ) : (
      <CustomIcon
        name="chevron-right"
        color={themeColors.primary}
        size={20}
        type={library}
      />
    )}
  </TouchableOpacity>
);

const SecurityScreen: React.FC = () => {
  const user = useSelector((state: any) => state.user);
  const userRole = user?.user.type?.toLowerCase() || 'user';
  const themeColors = colors[userRole] || colors.user;
  const navigation = useNavigation();
  const [biometricsEnabled, setBiometricsEnabled] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  useEffect(() => {
    const fetchBiometricsEnabled = async () => {
      const enabled = await AsyncStorage.getItem('biometricsEnabled');
      setBiometricsEnabled(enabled === 'true');
    };

    fetchBiometricsEnabled();
  }, []);

  const handlePasswordChangePress = () => {
    navigation.navigate('ResetPasswordBarberScreen', {email: user.user.email});
  };

  const handleBiometricsToggle = async (value: boolean) => {
    setBiometricsEnabled(value);
    await AsyncStorage.setItem('biometricsEnabled', value.toString());
  };

  const handleTwoFactorToggle = () => {
    navigation.navigate('ValidateCodeBarberScreen', {email: user.user.email});
  };

  const handleDeviceManagementPress = () => {
    navigation.navigate('DeviceManagementScreen');
  };

  const handleActivityLogPress = () => {
    navigation.navigate('ActivityLogScreen');
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={themeColors.primary}
        barStyle="light-content"
      />
      <View style={styles.content}>
        <SecurityItem
          title="Mudar Senha"
          description="Atualize sua senha de acesso"
          icon="lock"
          onPress={handlePasswordChangePress}
          themeColors={themeColors}
        />
        <SecurityItem
          title="Ativar Biometria"
          description="Use sua digital para login"
          icon="fingerprint"
          switchValue={biometricsEnabled}
          onSwitchChange={handleBiometricsToggle}
          themeColors={themeColors}
          library={'material'}
        />
        {/* <SecurityItem
          title="Verificação em Duas Etapas"
          description="Adicione uma camada extra de segurança"
          icon="shield"
          onPress={handleTwoFactorToggle}
          themeColors={themeColors}
        /> */}
        {/* <SecurityItem
          title="Gerenciamento de Dispositivos"
          description="Veja e gerencie os dispositivos conectados"
          icon="smartphone"
          onPress={handleDeviceManagementPress}
          themeColors={themeColors}
        />
        <SecurityItem
          title="Log de Atividades"
          description="Veja o histórico de atividades da conta"
          icon="activity"
          onPress={handleActivityLogPress}
          themeColors={themeColors}
        /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  securityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  roundedIconSecurity: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  securityItemTextContainer: {
    flex: 1,
  },
  securityItemTitle: {
    fontSize: 14,
  },
  securityItemDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default SecurityScreen;
