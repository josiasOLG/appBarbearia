// src/screens/ResetPasswordScreen.tsx
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import typography from '../../styles/typographys/typography';
import {UserService} from '../../api/UserService';
import {
  RouteProp,
  useNavigation,
  useRoute,
  CommonActions,
} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import colors from '../../styles/colors/Colors';

type RootStackParamList = {
  ResetPasswordScreen: {email: string};
};

type ResetPasswordScreenProp = RouteProp<
  RootStackParamList,
  'ResetPasswordScreen'
>;

const ResetPasswordBarberScreen: React.FC = () => {
  const user = useSelector((state: any) => state.user);
  const userRole = user.user.type?.toLowerCase() || 'user';
  const themeColors = colors[userRole] || colors.user;

  const navigation = useNavigation();
  const route = useRoute<ResetPasswordScreenProp>();
  const {email} = route.params;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
  });

  const validatePassword = (password: string) => {
    const length = password.length >= 8;
    const uppercase = /[A-Z]/.test(password);
    const lowercase = /[a-z]/.test(password);
    const number = /[0-9]/.test(password);

    setIsPasswordValid({length, uppercase, lowercase, number});
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    validatePassword(text);
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
  };

  const isFormValid = () => {
    return (
      isPasswordValid.length &&
      isPasswordValid.uppercase &&
      isPasswordValid.lowercase &&
      isPasswordValid.number &&
      password === confirmPassword
    );
  };

  const handleSubmit = async () => {
    if (isFormValid()) {
      try {
        await UserService.resetPassword({
          email: email,
          password,
        });
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'SettingsBarberScreen'}],
          }),
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      Alert.alert('Error', 'Formulário inválido');
    }
  };

  return (
    <LinearGradient colors={['#f1faf2', '#f1faf2']} style={styles.container}>
      <StatusBar backgroundColor={themeColors.primary} />
      <Icon name="lock" size={50} color="#333" style={styles.icon} />
      <Text style={[styles.title, typography.bold]}>Redefinir Senha</Text>
      <Text style={[styles.subTitle, typography.light]}>
        Por favor, insira sua nova senha e confirme-a abaixo.
      </Text>
      <TextInput
        style={[styles.input, {backgroundColor: themeColors.secondary}]}
        placeholder="Nova Senha"
        placeholderTextColor="#fff"
        secureTextEntry
        value={password}
        onChangeText={handlePasswordChange}
      />
      <View style={styles.validationContainer}>
        <Text
          style={[
            styles.validationText,
            typography.regular,
            isPasswordValid.length ? styles.valid : styles.invalid,
          ]}>
          Pelo menos 8 caracteres
        </Text>
        <Text
          style={[
            styles.validationText,
            typography.regular,
            isPasswordValid.uppercase ? styles.valid : styles.invalid,
          ]}>
          Pelo menos uma letra maiúscula
        </Text>
        <Text
          style={[
            styles.validationText,
            typography.regular,
            isPasswordValid.lowercase ? styles.valid : styles.invalid,
          ]}>
          Pelo menos uma letra minúscula
        </Text>
        <Text
          style={[
            styles.validationText,
            typography.regular,
            isPasswordValid.number ? styles.valid : styles.invalid,
          ]}>
          Pelo menos um número
        </Text>
      </View>
      <TextInput
        style={[styles.input, {backgroundColor: themeColors.secondary}]}
        placeholder="Confirmar Senha"
        placeholderTextColor="#fff"
        secureTextEntry
        value={confirmPassword}
        onChangeText={handleConfirmPasswordChange}
      />
      <View style={styles.validationContainer}>
        <Text
          style={[
            styles.validationText,
            typography.regular,
            password === confirmPassword ? styles.valid : styles.invalid,
          ]}>
          As senhas devem ser iguais
        </Text>
      </View>
      <TouchableOpacity
        style={[
          styles.button,
          {backgroundColor: themeColors.primary},
          isFormValid() && styles.buttonEnabled,
        ]}
        onPress={handleSubmit}
        disabled={!isFormValid()}>
        <Text style={[styles.buttonText, typography.bold]}>
          Cadastrar senha
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    color: '#333',
    fontSize: 18,
    marginBottom: 16,
  },
  subTitle: {
    color: '#333',
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: 'transparent',
    textAlign: 'center',

    marginBottom: 10,
    backgroundColor: '#6656bd',
    color: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  validationContainer: {
    width: '100%',
    marginBottom: 20,
  },
  validationText: {
    fontSize: 14,
  },
  valid: {
    color: '#333',
  },
  invalid: {
    color: '#fc1515',
  },
  button: {
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    opacity: 0.2,
  },
  buttonEnabled: {
    opacity: 1,
  },
  buttonText: {
    color: '#333',
  },
});

export default ResetPasswordBarberScreen;
