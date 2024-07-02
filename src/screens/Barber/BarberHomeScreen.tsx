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
import colors from '../../styles/colors/Colors'; // Importar cores

interface HomeScreenProps {
  navigation: any;
}

const BarberHomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [hasSubscription, setHasSubscription] = useState(true);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state: any) => state.user);
  const userRole = user?.user.type?.toLowerCase() || 'user'; // Garantir que o role esteja definido e em minúsculas
  const themeColors = colors[userRole] || colors.user; // Garantir que o role seja uma chave válida

  useFocusEffect(
    useCallback(() => {
      const fetchSubscribers = async () => {
        try {
          const userId = user?.user?.id; // Substitua pelo ID do usuário real
          const data = await assinantes(userId);
          setSubscribers(data.customers);
          setHasSubscription(false);
          console.log('fetchSubscribers >>', data);
        } catch (error) {
          console.error('Error fetching subscribers:', error);
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
      colors={[themeColors.primary, themeColors.primary]}
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
          </View>
          <View style={[styles.middleSection]}>
            <TouchableOpacity
              onPress={() => navigation.navigate('BarberListScreen')}>
              <View
                style={[styles.card, {backgroundColor: themeColors.secondary}]}>
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
                  {backgroundColor: themeColors.secondary},
                ]}>
                <View style={styles.roundedIcon}>
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
                  {backgroundColor: themeColors.secondary},
                ]}>
                <View style={styles.roundedIcon}>
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
              {loading ? (
                <></>
              ) : (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(
                      hasSubscription ? 'AssinaturaStatus' : 'AssinaturaScreen',
                    )
                  }
                  style={[
                    styles.cardServico,
                    {backgroundColor: themeColors.secondary},
                  ]}>
                  <View style={styles.roundedIcon}>
                    <IconPromotion
                      width={40}
                      height={40}
                      color={themeColors.primary}
                    />
                  </View>
                  <Text style={[styles.cardTextServico, typography.semiBold]}>
                    {hasSubscription ? 'Ver Assinatura' : 'Assinatura'}
                  </Text>
                  <Text style={[styles.cardTextSmallServico, typography.light]}>
                    {hasSubscription
                      ? 'Gerir sua assinatura'
                      : 'Criar assinatura'}
                  </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={() => navigation.navigate('SettingsScreen')}
                style={[
                  styles.cardServico,
                  {backgroundColor: themeColors.secondary},
                ]}>
                <View style={styles.roundedIcon}>
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
    backgroundColor: '',
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
    backgroundColor: '',
    borderRadius: 15,
    padding: 0,
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
    flex: 0.5,
    justifyContent: 'flex-start',
    width: '100%',
    paddingHorizontal: 20,
  },
  middleSection: {
    flex: 0.1,
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  bottomSection: {
    flex: 3,
    padding: 20,
  },
  contentTextTop: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  input: {
    height: 60,
    backgroundColor: '#fff',
    opacity: 0.5,
    marginTop: 20,
    borderRadius: 10,
    fontSize: 20,
    padding: 20,
  },
  titleTop: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 5,
  },
  textTop: {
    color: '#fff',
    fontSize: 18,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 0,
  },
  cardText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 8,
  },
  cardTextServico: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
  },
  cardTextSmallServico: {
    fontSize: 14,
    color: '#fff',
  },
  roundedIconSearch: {
    borderRadius: 50,
    backgroundColor: '',
    padding: 10,
    width: 50,
    height: 50,
    marginTop: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundedIcon: {
    borderRadius: 50,
    backgroundColor: '',
    padding: 40,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BarberHomeScreen;
