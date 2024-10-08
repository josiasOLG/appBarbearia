// src/screens/RegisterScreen.tsx
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as yup from 'yup';
import {UserService} from '../../api/UserService';
import typography from '../../styles/typographys/typography';
import {CommonActions, useNavigation} from '@react-navigation/native';

const RegisterScreen: React.FC = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
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
    const emailSchema = yup.string().email().required();
    const nameSchema = yup.string().required();

    return (
      emailSchema.isValidSync(email) &&
      nameSchema.isValidSync(name) &&
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
        await UserService.register({
          name,
          email,
          password,
          role: 'USER',
        });
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'LoginScreen'}],
          }),
        );
      } catch (error) {
        console.log(error);
      }
    } else {
    }
  };

  return (
    <LinearGradient colors={['#333', '#333']} style={styles.container}>
      <StatusBar backgroundColor={'#333'} />
      <Icon name="user" size={50} color="#fff" style={styles.icon} />
      <Text style={[styles.title, typography.bold]}>Cadastro de Usuário</Text>
      <Text style={[styles.subTitle, typography.light]}>
        Por favor, preencha os campos abaixo para se cadastrar.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Nome completo"
        placeholderTextColor="#aaa"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#aaa"
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
        style={styles.input}
        placeholder="Confirmar Senha"
        placeholderTextColor="#aaa"
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
        style={[styles.button, isFormValid() && styles.buttonEnabled]}
        onPress={handleSubmit}
        disabled={!isFormValid()}>
        <Text style={[styles.buttonText, typography.bold]}>Cadastrar</Text>
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
    color: '#fff',
    fontSize: 18,
    marginBottom: 16,
  },
  subTitle: {
    color: '#fff',
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
    fontSize: 18,
    marginBottom: 10,
    backgroundColor: '#fff',
    color: '#333',
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
    color: '#2abe2a',
  },
  invalid: {
    color: '#cf1a1a',
  },
  button: {
    backgroundColor: '#333',
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
    color: '#fff',
    fontSize: 18,
  },
});

export default RegisterScreen;
