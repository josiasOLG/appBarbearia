// src/screens/ValidateCodeScreen.tsx
import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Alert,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {UserService} from '../../api/UserService';
import LinearGradient from 'react-native-linear-gradient';
import NumericKeyboard from '../../components/atoms/NumericKeyboard/NumericKeyboard';
import typography from '../../styles/typographys/typography';

type RootStackParamList = {
  ValidateCodeScreen: {email: string};
};

type ValidateCodeScreenRouteProp = RouteProp<
  RootStackParamList,
  'ValidateCodeScreen'
>;

const ValidateCodeScreen: React.FC = () => {
  const route = useRoute<ValidateCodeScreenRouteProp>();
  const {email} = route.params;
  const navigation = useNavigation();
  // const email = 'josiasoliveira111@gmail.com';

  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputs = useRef<Array<TextInput | null>>([]);

  const handleChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyboardPress = (value: string) => {
    const emptyIndex = code.findIndex(digit => digit === '');
    if (emptyIndex !== -1) {
      handleChange(value, emptyIndex);
    }
  };

  const handleDelete = () => {
    const filledIndex = code.findIndex(digit => digit === '');
    const indexToClear = filledIndex === -1 ? 5 : filledIndex - 1;
    if (indexToClear >= 0) {
      handleChange('', indexToClear);
      inputs.current[indexToClear]?.focus();
    }
  };

  const handleSubmit = async () => {
    const codeString = code.join('');
    try {
      await UserService.validateCode({email, code: codeString});
      navigation.navigate('ResetPasswordScreen', {email: email});
      // Alert.alert('Success', 'Code validated successfully');
    } catch (error) {
      // Alert.alert('Error', 'Invalid code');
    }
  };

  return (
    <LinearGradient colors={['#7b67e9', '#624ed1']} style={styles.container}>
      <StatusBar backgroundColor={'#624ed1'} />
      <Text style={[styles.title, typography.bold]}>Verificação de codigo</Text>
      <Text style={[styles.subTitle, typography.light]}>
        Por favor digite os 6 digitos enviados no seu sms
      </Text>
      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.input}
            value={digit}
            onChangeText={text => handleChange(text, index)}
            keyboardType="numeric"
            maxLength={1}
            ref={ref => (inputs.current[index] = ref)}
            showSoftInputOnFocus={false} // Desabilita o teclado nativo no Android
            onFocus={e => e.preventDefault()} // Desabilita o teclado nativo no iOS
          />
        ))}
      </View>
      <NumericKeyboard onPress={handleKeyboardPress} onDelete={handleDelete} />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={[styles.buttonText, typography.bold]}>
          Verificar codigo
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 0,
    marginTop: 20,
  },
  subTitle: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 20,
    lineHeight: 30,
    textAlign: 'center',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 0,
  },
  input: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: 'transparent',
    textAlign: 'center',
    fontSize: 18,
    marginLeft: 10,
    color: '#fff',
    backgroundColor: '#6656bd',
  },
  button: {
    position: 'absolute',
    bottom: 30,
    backgroundColor: '#fc7115',
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default ValidateCodeScreen;
