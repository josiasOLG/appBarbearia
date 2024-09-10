import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import {hideLoading, showLoading} from '../../store/reducers/loading.reducer';
import LinearGradient from 'react-native-linear-gradient';
import NumericKeyboard from '../../components/atoms/NumericKeyboard/NumericKeyboard';
import typography from '../../styles/typographys/typography';
import colors from '../../styles/colors/Colors';
import {QRCodeServices} from '../../api/QrCodeService';

const QRCodeScannerScreen: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const userRole = user?.user.type?.toLowerCase() || 'user';
  const themeColors = colors[userRole] || colors.user;
  const navigation = useNavigation();
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
    if (codeString.length !== 6) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'The code must be 6 characters long',
      });
      return;
    }

    try {
      dispatch(showLoading('Processing Code...'));
      const updateData = {code: codeString};
      await QRCodeServices.updateQRCodeBarberId(user.user.id, updateData); // Certifique-se de que o ID do QRCode está disponível aqui

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Code processed successfully!',
      });
      navigation.navigate('BarberHomeScreen');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to process code. Please try again.',
      });
    } finally {
      dispatch(hideLoading());
    }
  };

  return (
    <LinearGradient
      colors={[themeColors.primary, themeColors.secondary]}
      style={styles.container}>
      <StatusBar backgroundColor={themeColors.primary} />
      <Text style={[styles.title, typography.bold]}>Verificação de codigo</Text>
      <Text style={[styles.subTitle, typography.light]}>
        Por favor digite os 6 digitos do codigo do cartão fidelidade recebido
      </Text>
      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            style={[styles.input]}
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
      <TouchableOpacity
        style={[styles.button, {backgroundColor: themeColors.white}]}
        onPress={handleSubmit}>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 16,
  },
  subTitle: {
    color: '#fff',

    marginBottom: 40,
    lineHeight: 30,
    textAlign: 'center',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  input: {
    width: 50,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    textAlign: 'center',

    marginLeft: 10,
    color: '#fff',
    backgroundColor: 'transparent',
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
    color: '#333',
  },
});

export default QRCodeScannerScreen;
