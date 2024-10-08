import React, {useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import IconCalendar from '../../assets/icons/iconCalendar.svg';
import IconCheckList from '../../assets/icons/iconChecklist.svg';
import IconConfig from '../../assets/icons/iconConfig.svg';
import LinearGradient from 'react-native-linear-gradient';
import {GlobalLayoutStyles} from '../../styles/GlobalLayoutStyles';
import typography from '../../styles/typographys/typography';
import {useDispatch, useSelector} from 'react-redux';
import colors from '../../styles/colors/Colors';
import CustomIcon from '../../components/atoms/Icon/Icon';
import CustomModal from '../../components/atoms/CustomModal/CustomModal';
import {useFocusEffect} from '@react-navigation/native';
import useCheckFields from '../../hooks/useCheckFields'; // Atualize o caminho conforme necessário
import {UserService} from '../../api/UserService';
import {updateProfile} from '../../store/reducers/user.reducer';
import {Platform} from 'react-native';

interface HomeScreenProps {
  navigation: any;
}

const BarberHomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const user = useSelector((state: any) => state.user);
  const userRole = user?.user.type?.toLowerCase() || 'user';
  const themeColors = colors[userRole] || colors.user;
  const {modalVisible, missingFields, checkAddress, setModalVisible} =
    useCheckFields(user.user.id);
  const dispatch = useDispatch();

  const checkUserActive = async (userData: any) => {
    try {
      const response = await UserService.getActive(userData.user.id);
      const isActive = response.data.active;
      dispatch(updateProfile({active: isActive}));
    } catch (error) {
      console.error('Error fetching user active status:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      checkAddress();
      checkUserActive(user);
    }, [checkAddress, checkUserActive]),
  );

  const handleGoToAddress = () => {
    setModalVisible(false);
    navigation.navigate('CadastrarEnderecoScreen');
  };

  const handleGoToHours = () => {
    setModalVisible(false);
    navigation.navigate('ProfileScreen');
  };

  return (
    <LinearGradient
      colors={[themeColors.primary, themeColors.primary]}
      style={styles.gradient}>
      <StatusBar backgroundColor={themeColors.primary} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.gradient}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <View style={[styles.topSection]}>
            <View style={styles.contentTextTop}>
              <Text style={[styles.titleTop, typography.semiBold]}>HELLO</Text>
              <Text style={[styles.textTop, typography.light]}>
                Seja bem vindo {user.user.username}
              </Text>
            </View>
          </View>
          <View style={[styles.middleSection]}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ServiceRegistrationScreen')}>
              <View style={[styles.card, {backgroundColor: themeColors.white}]}>
                <View style={styles.colum1}>
                  <Text style={[styles.cardTitle, typography.semiBold]}>
                    Serviços
                  </Text>
                  <Text style={styles.cardText}>
                    Cadastro de serviços prestados
                  </Text>
                </View>
                <View style={styles.colum2}>
                  <View
                    style={[
                      styles.roundedIconSearch,
                      {backgroundColor: themeColors.primary},
                    ]}>
                    <CustomIcon
                      color={'#fff'}
                      size={25}
                      name="plus"
                      type="feather"
                    />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomSection}>
            <Text style={[styles.cardTitle, typography.semiBold]}>
              Nossos serviços
            </Text>
            <View style={[styles.row]}>
              <TouchableOpacity
                style={[
                  styles.cardServico,
                  {
                    backgroundColor: themeColors.white,
                    opacity: user.user.active ? 1 : 0.4,
                  },
                ]}
                disabled={!user.user.active}
                onPress={() => navigation.navigate('FeedbackScreen')}>
                <View
                  style={[
                    styles.roundedIcon,
                    {backgroundColor: themeColors.primary},
                  ]}>
                  <IconCalendar width={40} height={40} color={'#333'} />
                </View>
                <Text style={[styles.cardTextServico, typography.semiBold]}>
                  Feedback
                </Text>
                <Text style={[styles.cardTextSmallServico, typography.light]}>
                  Coleta e análise de feedback dos clientes
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.cardServico,
                  {
                    backgroundColor: themeColors.white,
                    opacity: user.user.active ? 1 : 0.4,
                  },
                ]}
                onPress={() => navigation.navigate('ConfirmationScreen')}
                disabled={!user.user.active}>
                <View
                  style={[
                    styles.roundedIcon,
                    {backgroundColor: themeColors.primary},
                  ]}>
                  <IconCheckList
                    width={40}
                    height={40}
                    color={themeColors.primary}
                  />
                </View>
                <Text style={[styles.cardTextServico, typography.semiBold]}>
                  Agendamentos
                </Text>
                <Text style={[styles.cardTextSmallServico, typography.light]}>
                  Visualização e gestão dos horários
                </Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.row]}>
              <TouchableOpacity
                onPress={() => navigation.navigate('QRCodeScannerScreen')}
                style={[
                  styles.cardServico,
                  {
                    backgroundColor: themeColors.white,
                    opacity: user.user.active ? 1 : 0.4,
                  },
                ]}
                disabled={!user.user.active}>
                <View
                  style={[
                    styles.roundedIcon,
                    {backgroundColor: themeColors.primary},
                  ]}>
                  <CustomIcon
                    color={'#fff'}
                    size={60}
                    name="qrcode"
                    type="font-awesome"
                  />
                </View>
                <Text style={[styles.cardTextServico, typography.semiBold]}>
                  Codigo
                </Text>
                <Text style={[styles.cardTextSmallServico, typography.light]}>
                  Scannear codigo do usuário
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('SettingsBarberScreen')}
                style={[
                  styles.cardServico,
                  {backgroundColor: themeColors.white},
                ]}>
                <View
                  style={[
                    styles.roundedIcon,
                    {backgroundColor: themeColors.primary},
                  ]}>
                  <IconConfig
                    width={40}
                    height={40}
                    color={themeColors.black}
                  />
                </View>
                <Text style={[styles.cardTextServico, typography.semiBold]}>
                  Configurações
                </Text>
                <Text style={[styles.cardTextSmallServico, typography.light]}>
                  E área do usuário
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <CustomModal
        visible={modalVisible}
        message={{
          title: 'Atualizar Informações',
          mensagem: `Por favor, atualize suas informações para continuar. Os seguintes campos estão faltando: ${missingFields.join(
            ', ',
          )}`,
        }}
        submitButtonText="Ir para a tela"
        showInput={false}
        onClose={
          missingFields.includes('CEP') ? handleGoToAddress : handleGoToHours
        }
        onSubmit={
          missingFields.includes('CEP') ? handleGoToAddress : handleGoToHours
        }
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  card: {
    flexDirection: 'row',
    height: 100,
    backgroundColor: '#5350d3',
    borderRadius: 15,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Distribui os cartões horizontalmente
    width: '100%', // Ocupa toda a largura do bottomSection
    flex: 1, // Ocupa uma proporção do espaço disponível
  },
  cardServico: {
    width: '48%', // Aproximadamente metade da largura do contêiner, considerando a margem
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5350d3',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 5,
    marginTop: 5,
  },
  colum1: {
    flex: 4,
  },
  colum2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colum3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colum4: {
    flex: 6,
    justifyContent: 'center',
  },
  topSection: {
    flex: 0,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  middleSection: {
    flex: 0,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  bottomSection: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  contentTextTop: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  contentTextTopRight: {
    flex: 0.1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    marginTop: 20,
  },
  input: {
    height: 60,
    backgroundColor: '#fff',
    opacity: 0.5,
    marginTop: 20,
    borderRadius: 10,

    padding: 20,
  },
  titleTop: {
    color: '#fff',

    marginBottom: 5,
  },
  textTop: {
    color: '#fff',
    fontSize: 14,
  },
  cardTitle: {
    color: '#333',
    marginBottom: 0,
  },
  cardText: {
    color: '#333',
    fontSize: 14,
    marginTop: 8,
  },
  cardTextServico: {
    color: '#333',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
  cardTextSmallServico: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundedIconSearch: {
    borderRadius: 50,
    backgroundColor: '#7a71e8',
    padding: 10,
    width: 50,
    height: 50,
    marginTop: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundedIcon: {
    borderRadius: 100,
    padding: 0,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BarberHomeScreen;
