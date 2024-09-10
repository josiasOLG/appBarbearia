import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Platform,
  ScrollView,
} from 'react-native';
import MenuIcon from '../../assets/icons/menu.svg';
import SearchIcon from '../../assets/icons/search.svg';
import IconCalendar from '../../assets/icons/iconCalendar.svg';
import IconCheckList from '../../assets/icons/iconChecklist.svg';
import IconConfig from '../../assets/icons/iconConfig.svg';
import IconPromotion from '../../assets/icons/iconPromotion.svg';
import LinearGradient from 'react-native-linear-gradient';
import {GlobalLayoutStyles} from '../../styles/GlobalLayoutStyles';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import typography from '../../styles/typographys/typography';
import {KeyboardAvoidingView} from 'react-native';
import {assinantes} from '../../api/SubscriptionService';
import {useSelector} from 'react-redux';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Skeleton from '../../components/atoms/Skeleton/Skeleton';
import {useFocusEffect} from '@react-navigation/native';
import CustomIcon from '../../components/atoms/Icon/Icon';
import colors from '../../styles/colors/Colors';

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [hasSubscription, setHasSubscription] = useState(true);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state: any) => state.user);
  const service = useSelector((state: any) => state.service);
  const userRole = user.user.type?.toLowerCase() || 'user';
  const themeColors = colors[userRole] || colors.user;

  useFocusEffect(
    useCallback(() => {
      const fetchSubscribers = async () => {
        try {
          const userId = user?.user?.id; // Substitua pelo ID do usuário real
          const data = await assinantes(userId);
          setSubscribers(data.customers);
          setHasSubscription(false);
        } catch (error) {
          console.error('Error fetching subscribers:', error);
          setHasSubscription(false);
        } finally {
          setLoading(false);
        }
      };
      fetchSubscribers();
    }, [user]),
  );

  const handleMenuPress = () => {};
  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  return (
    <LinearGradient
      colors={[themeColors.primary, themeColors.secondary]}
      style={styles.gradient}>
      <StatusBar backgroundColor={themeColors.primary} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={GlobalLayoutStyles.flexContainer}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <View style={[styles.topSection]}>
            <View style={styles.contentTextTop}>
              <Text style={[styles.titleTop, typography.semiBold]}>HELLO</Text>
              <Text style={[styles.textTop, typography.light]}>
                Seja bem vindo {user.user.username}
              </Text>
            </View>
            <View style={styles.contentTextTopRight}>
              <TouchableOpacity
                onPress={() => navigation.navigate('ServiceSelectionScreen')}>
                <CustomIcon
                  name="grid"
                  color={'#ffffff'}
                  type="feather"
                  size={20}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.middleSection]}>
            <TouchableOpacity
              onPress={() => navigation.navigate('BarberListScreen')}>
              <View style={[styles.card, {backgroundColor: themeColors.white}]}>
                <View style={styles.colum1}>
                  <Text style={[styles.cardTitle, typography.semiBold]}>
                    Favoritos
                  </Text>
                  <Text style={styles.cardText}>Barbeiros favoritos</Text>
                </View>
                <View style={styles.colum2}>
                  <View
                    style={[
                      styles.roundedIconSearch,
                      {backgroundColor: themeColors.primary},
                    ]}>
                    <SearchIcon color={'#fff'} width={25} />
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
                  {backgroundColor: themeColors.white},
                ]}
                onPress={() => navigation.navigate('BarberListScreen')}>
                <View
                  style={[
                    styles.roundedIcon,
                    {backgroundColor: themeColors.primary},
                  ]}>
                  <IconCalendar
                    width={40}
                    height={40}
                    color={themeColors.primary}
                  />
                </View>
                <Text style={[styles.cardTextServico, typography.semiBold]}>
                  Agendar
                </Text>
                <Text style={[styles.cardTextSmallServico, typography.light]}>
                  Cortes e serviços
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.cardServico,
                  {backgroundColor: themeColors.white},
                ]}
                onPress={() => navigation.navigate('StatusListScreen')}>
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
                  Status
                </Text>
                <Text style={[styles.cardTextSmallServico, typography.light]}>
                  Agendamento
                </Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.row]}>
              <TouchableOpacity
                onPress={() => navigation.navigate('FidelityScreen')}
                style={[
                  styles.cardServico,
                  {backgroundColor: themeColors.white},
                ]}>
                <View
                  style={[
                    styles.roundedIcon,
                    {backgroundColor: themeColors.primary},
                  ]}>
                  <CustomIcon
                    size={50}
                    name="star"
                    type="font-awesome"
                    color={themeColors.white}
                  />
                </View>
                <Text style={[styles.cardTextServico, typography.semiBold]}>
                  Pontos fidelidade
                </Text>
                <Text style={[styles.cardTextSmallServico, typography.light]}>
                  Gerencie seus pontos
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('SettingsScreen')}
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
                    color={themeColors.primary}
                  />
                </View>
                <Text style={[styles.cardTextServico, typography.semiBold]}>
                  Configurações
                </Text>
                <Text style={[styles.cardTextSmallServico, typography.light]}>
                  E area do usuário
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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

export default HomeScreen;
