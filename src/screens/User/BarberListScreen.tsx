import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {GlobalLayoutStyles} from '../../styles/GlobalLayoutStyles';
import typography from '../../styles/typographys/typography';
import colors from '../../styles/colors/Colors';
import {useSelector} from 'react-redux';
import {UserService} from '../../api/UserService';
import IconBackBlack from '../../assets/icons/BackBlack.svg';
import SearchBar from '../../components/molecules/SearchBar/SearchBar';
import BarberList from '../../components/molecules/BarberList/BarberList';

interface Barber {
  id: string;
  name: string;
}

interface BarberListProps {
  navigation: any;
}

const BarberListScreen: React.FC<BarberListProps> = ({navigation}) => {
  const [searchText, setSearchText] = useState<string>('');
  const [filteredBarbers, setFilteredBarbers] = useState<Barber[]>([]);
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const user = useSelector((state: any) => state.user);
  const service = useSelector((state: any) => state.service);
  const userRole = user.user.type?.toLowerCase() || 'user';
  const themeColors = colors[userRole] || colors.user;

  useEffect(() => {
    // Carregar todos os barbers inicialmente
    loadBarbers();
  }, []);

  const loadBarbers = async () => {
    try {
      const response = await UserService.searchUsers(
        '',
        service.selectedService,
      );
      if (response.data) {
        setBarbers(response.data);
        setFilteredBarbers(response.data);
      }
    } catch (error) {
      console.error('Failed to load barbers:', error);
    }
  };

  const handleSearch = async (text: string): Promise<void> => {
    setSearchText(text);
    try {
      const response = await UserService.searchUsers(
        text,
        service.selectedService,
      );
      console.log('response.data354 >>', response.data);
      if (response.data) {
        setFilteredBarbers(response.data);
      }
    } catch (error) {
      console.error('Failed to search barbers:', error);
    }
  };

  const back = () => {
    navigation.navigate('HomeScreen');
  };

  const handleBarberPress = (data: any) => {
    navigation.navigate('BarberDetailsScreen', {barber: data});
  };

  return (
    <LinearGradient colors={['#f1f6fa', '#d2e2ef']} style={styles.gradient}>
      <StatusBar backgroundColor={themeColors.primary} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={GlobalLayoutStyles.flexContainer}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.topSection}>
            <View style={styles.cardBackBtn}>
              <TouchableOpacity onPress={back}>
                <IconBackBlack color={'#333'} width={30} height={30} />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={[styles.titleScreen, typography.bold]}>
                Agendamento
              </Text>
              <Text style={[styles.subtitleScreen, typography.light]}>
                Selecione abaixo para realizar um agendamento
              </Text>
            </View>
            <SearchBar
              searchText={searchText}
              onSearchTextChange={text => {
                setSearchText(text);
                handleSearch(text); // Chama a função de pesquisa sempre que o texto mudar
              }}
              onSearchPress={() => handleSearch(searchText)} // Dispara a busca quando o botão é pressionado
              themeColor={themeColors.primary}
            />
          </View>
          <BarberList
            barbers={filteredBarbers}
            onBarberPress={handleBarberPress}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    width: '100%',
  },
  titleScreen: {
    fontSize: 32,
    color: '#12182e',
    marginBottom: 10,
  },
  subtitleScreen: {
    fontSize: 16,
    color: '#12182e',
    marginBottom: 20,
    lineHeight: 25,
  },
  topSection: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    padding: 20,
  },
  cardBackBtn: {
    marginBottom: 10,
  },
});

export default BarberListScreen;
