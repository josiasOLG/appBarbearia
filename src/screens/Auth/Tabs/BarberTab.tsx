import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import fonts from '../../../styles/GlobalFonts';
import typography from '../../../styles/typographys/typography';
import FacebookIcon from '../../../assets/icons/facebook.svg';
import GoogleIcon from '../../../assets/icons/google.svg';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {AuthService} from '../../../api/AuthService';
import {setUser} from '../../../store/reducers/user.reducer';
import {
  showLoading,
  hideLoading,
} from '../../../store/reducers/loading.reducer';
import {useNavigation} from '@react-navigation/native';
import * as Keychain from 'react-native-keychain';
import Toast from 'react-native-toast-message';
import CustomModal from '../../../components/atoms/CustomModal/CustomModal';

const BarberTab: React.FC<any> = () => {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState<{
    title: string;
    mensagem: string;
  }>({
    title: 'Esqueci a senha',
    mensagem: 'Preencha o campo abaixo com o seu email',
  });
  const [modalInput, setModalInput] = useState('');

  const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
  });

  const dispatch = useDispatch();

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'],
      webClientId:
        '829092500903-rcgs6t75s6tc8acv715gf38d86092ns5.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleGoogleSignIn = async () => {
    try {
      dispatch(showLoading('Carregando...'));
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const {idToken} = await GoogleSignin.getTokens();

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential = await auth().signInWithCredential(
        googleCredential,
      );
      const user = userCredential.user;
      const response = await AuthService.googleSignIn(
        idToken,
        user.uid,
        'BARBER',
      );

      if (response.status === 200) {
        await Keychain.setGenericPassword(
          response.headers['refresh-token'],
          response.headers['access-token'],
        );

        const {
          userId,
          username,
          descricao,
          certificacoes,
          image,
          email,
          active,
        } = response.data;

        dispatch(
          setUser({
            id: userId,
            email: email,
            username: user.displayName || username,
            descricao: descricao || '',
            certificacoes: certificacoes || '',
            image: image || '',
            isLoggedIn: true,
            type: 'BARBER',
            active: active,
          }),
        );
        dispatch(hideLoading());
        navigation.navigate('HomeScreen');
      }
    } catch (error: any) {
      dispatch(hideLoading());
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // Usuário cancelou o login
      } else {
        Toast.show({
          type: 'error',
          text1: 'Erro no login com Google',
          text2: 'Enviando email de recuperação de senha.',
        });
      }
    }
  };

  const handleModalSubmit = async () => {
    dispatch(showLoading('Enviando...'));
    try {
      await AuthService.recoverPassword(modalInput);
      setModalMessage({
        title: 'Email enviado com sucesso',
        mensagem: 'Email de recuperação de senha enviado com sucesso.',
      });
      navigation.navigate('ValidarCodigoSMS', {email: modalInput});
      dispatch(hideLoading());
    } catch (error) {
      setModalMessage({
        title: 'Erro ao enviar email',
        mensagem: 'Erro ao enviar email de recuperação de senha.',
      });
      dispatch(hideLoading());
    }
  };

  const handleFacebookSignIn = () => {
    console.log('Facebook sign-in');
  };

  const handleLogin = async (data?: any) => {
    dispatch(showLoading('Carregando...'));
    try {
      const response = await AuthService.login(data);
      const {
        user_id,
        display_name,
        role,
        descricao,
        certificacoes,
        image,
        email,
        active,
      } = response.data;

      await Keychain.setGenericPassword(
        'accessToken',
        response.headers['access-token'],
        {service: 'accessToken'},
      );
      await Keychain.setGenericPassword(
        'refreshToken',
        response.headers['refresh-token'],
        {service: 'refreshToken'},
      );
      await Keychain.setGenericPassword('userId', user_id, {service: 'userId'});

      dispatch(
        setUser({
          id: user_id,
          email: email,
          username: display_name || '',
          isLoggedIn: true,
          type: role,
          descricao: descricao,
          certificacoes: certificacoes,
          image: image,
          active: active,
        }),
      );

      navigation.navigate('BarberHomeScreen');
      dispatch(hideLoading());
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao fazer login',
        text2: 'Por favor, verifique suas credenciais.',
      });
      dispatch(hideLoading());
    }
  };

  return (
    <>
      <View style={styles.middleSection}>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              onBlur={onBlur}
              placeholderTextColor={'#fff'}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="email"
          defaultValue=""
        />
        {errors.email && (
          <Text style={styles.error}>{errors.email.message}</Text>
        )}
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={'#fff'}
              secureTextEntry={true}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="password"
          defaultValue=""
        />
        {errors.password && (
          <Text style={styles.error}>{errors.password.message}</Text>
        )}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleSubmit(handleLogin)}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.containerBtnsBottom}>
          <TouchableOpacity
            style={styles.signUpButton}
            onPress={() =>
              navigation.navigate('RegisterBarberHairdresserScreen')
            }>
            <Text style={[styles.signUpButtonText, typography.semiBold]}>
              Cadastrar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.recoverBtn}
            onPress={() => setShowModal(true)}>
            <Text style={[styles.signUpButtonText, typography.semiBold]}>
              Esqueci a senha
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomSection}>
        <Text style={styles.orText}>Ou conecte-se por</Text>
        <View style={styles.socialButtonContainer}>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={handleGoogleSignIn}>
            <GoogleIcon style={styles.socialButtonIcon} />
            <Text style={styles.socialButtonText}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={handleFacebookSignIn}>
            <FacebookIcon style={styles.socialButtonIcon} color={'#fff'} />
            <Text style={styles.socialButtonText}>Facebook</Text>
          </TouchableOpacity>
        </View>
        <CustomModal
          visible={showModal}
          message={modalMessage}
          showInput
          inputType="email"
          inputValue={modalInput}
          onChangeInput={setModalInput}
          onClose={() => setShowModal(false)}
          onSubmit={handleModalSubmit}
          submitButtonText="Enviar"
          closeButtonText="Fechar"
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: wp('5%'),
    backgroundColor: 'transparent',
  },
  middleSection: {
    flex: 2,
    justifyContent: 'center',
  },
  bottomSection: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: hp('5%'),
  },
  containerBtnsBottom: {
    flexDirection: 'row',
  },
  input: {
    height: hp('7%'),
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: wp('2.5%'),
    paddingLeft: wp('4%'),
    marginBottom: hp('2%'),
    fontSize: fonts.body,
    color: '#fff',
  },
  loginButton: {
    backgroundColor: '#4938a8',
    padding: hp('2%'),
    borderRadius: wp('2.5%'),
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  loginButtonText: {
    color: '#fff',
    fontSize: fonts.body,
  },
  signUpButton: {
    // Adicione estilos específicos se necessário
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: fonts.body,
  },
  recoverBtn: {
    flex: 1,
    alignItems: 'flex-end',
  },
  error: {
    color: '#fff',
    marginBottom: hp('2%'),
    fontSize: fonts.body,
  },
  orText: {
    alignSelf: 'center',
    margin: hp('2.5%'),
    fontSize: fonts.body,
    color: '#fff',
  },
  socialButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: hp('1%'),
    paddingHorizontal: wp('5%'),
    borderRadius: wp('2.5%'),
    borderWidth: 1,
    borderColor: '#5350d3',
    backgroundColor: '#5350d3',
  },
  socialButtonIcon: {
    marginRight: wp('2.5%'),
  },
  socialButtonText: {
    fontSize: fonts.body,
    color: '#fff',
  },
});

export default BarberTab;
