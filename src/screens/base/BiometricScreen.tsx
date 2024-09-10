import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  AppState,
  AppStateStatus,
  BackHandler,
  StatusBar,
} from 'react-native';
import {
  useNavigation,
  useRoute,
  RouteProp,
  CommonActions,
} from '@react-navigation/native';
import TouchID from 'react-native-touch-id';
import CustomIcon from '../../components/atoms/Icon/Icon';
import typography from '../../styles/typographys/typography';
import {useSelector} from 'react-redux';

type RootStackParamList = {
  BiometricScreen: {userType: string};
};

type BiometricScreenRouteProp = RouteProp<
  RootStackParamList,
  'BiometricScreen'
>;

const BiometricScreen: React.FC = () => {
  const navigation = useNavigation();
  const user = useSelector((state: any) => state.user);

  const route = useRoute<BiometricScreenRouteProp>();
  const {userType} = route.params;
  const [attempts, setAttempts] = useState(0);
  const [appState, setAppState] = useState<AppStateStatus>(
    AppState.currentState,
  );
  const [retryVisible, setRetryVisible] = useState(false);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );
    authenticate();

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );

    return () => {
      subscription.remove();
      backHandler.remove();
    };
  }, []);

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      if (attempts >= 3) {
        Alert.alert('Too many attempts', 'Closing the app', [
          {text: 'OK', onPress: closeApp},
        ]);
      }
    }
    setAppState(nextAppState);
  };

  const authenticate = () => {
    const optionalConfigObject = {
      title: 'Authentication Required',
      imageColor: '#e00606',
      imageErrorColor: '#ff0000',
      sensorDescription: 'Touch sensor',
      sensorErrorDescription: 'Failed',
      cancelText: 'Cancel',
      fallbackLabel: 'Show Passcode',
    };

    TouchID.authenticate('Login using fingerprint', optionalConfigObject)
      .then(() => {
        console.log('Authentication successful');
        handleProceed();
      })
      .catch((error: any) => {
        console.error('Authentication failed:', error);
        Alert.alert('Authentication Failed', error.message || 'Unknown error');
        setAttempts(prev => prev + 1);
        setRetryVisible(true);
        if (attempts >= 2) {
          // Add any additional logic here
        }
      });
  };

  const handleProceed = () => {
    console.log(user);
    if (user.user.type === 'USER') {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'UserStack'}],
        }),
      );
    } else if (user.user.type === 'BARBER') {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'BarberStack'}],
        }),
      );
    }
  };

  const closeApp = () => {
    BackHandler.exitApp();
  };

  const skipAuthentication = () => {
    setRetryVisible(false);
    authenticate();
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#fff'} barStyle="dark-content" />
      <Text style={[styles.welcomeText, typography.bold]}>
        Bem vindo de volta!
      </Text>
      <View style={styles.emailContainer}>
        <Text style={[styles.emailText, typography.light]}>
          {user.user.email}
        </Text>
        <CustomIcon name="check" type="feather" size={24} color="green" />
      </View>
      <View style={styles.fingerprintContainer}>
        <CustomIcon
          name="fingerprint"
          type="material"
          size={150}
          color="#ffa600"
        />
        <Text style={[styles.fingerprintText, typography.bold]}>
          Login usando impressão digital
        </Text>
        <Text style={[styles.fingerprintSubText, typography.light]}>
          Use sua impressão digital para fazer login na conta{' '}
        </Text>
      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.skipButton}
          onPress={skipAuthentication}>
          <Text style={[styles.skipButtonText, typography.regular]}>
            Tentar novamente
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.closeButton} onPress={closeApp}>
          <Text style={[styles.skipButtonText, typography.regular]}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  icon: {
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    borderColor: '#e3e3e3',
    borderWidth: 1,
    padding: 20,
  },
  emailText: {
    fontSize: 14,
    marginRight: 8,
  },
  fingerprintContainer: {
    alignItems: 'center',
  },
  fingerprintText: {
    marginTop: 16,
  },
  fingerprintSubText: {
    fontSize: 14,
    color: '#A9A9A9',
    marginTop: 8,
    textAlign: 'center',
    lineHeight: 25,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  retryButton: {
    padding: 10,
    backgroundColor: '#ffa600',
    borderRadius: 5,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  exitButton: {
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  exitButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  skipButton: {
    alignItems: 'flex-start',
  },
  closeButton: {
    alignItems: 'flex-end',
  },
  skipButtonText: {
    color: '#ffa600',
    fontSize: 14,
  },
});

export default BiometricScreen;
