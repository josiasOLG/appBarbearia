import React, {useState, FC} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  StatusBar,
  TextStyle,
  ViewStyle,
} from 'react-native';
import ServiceItem from '../../components/atoms/ServiceItem/ServiceItem';
import LinearGradient from 'react-native-linear-gradient';
import EcoIcon from '../../assets/icons/eco.svg';
import typography from '../../styles/typographys/typography';
import {useDispatch, useSelector} from 'react-redux';
import {UserService} from '../../api/UserService';
import {useNavigation} from '@react-navigation/native';
import LoadingScreen from './LoadingScreen';
import {setUser} from '../../store/reducers/user.reducer';
import {setSelectedService} from '../../store/reducers/service.reducer';

interface Service {
  id: string;
  service: string;
  icon: string;
}

const services: Service[] = [
  {id: 'BARBER', service: 'Barbeiro', icon: 'face'},
  {id: 'STYLIST', service: 'Cabelereiro(a)', icon: 'content-cut'},
];

const ServiceSelectionScreen: FC = () => {
  const user = useSelector((state: {user: {user: {id: string}}}) => state.user);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const handleServicePress = async (service: Service) => {
    try {
      setIsLoading(true);
      await UserService.updateUserService(user.user.id, service.id);
      dispatch(setSelectedService(service.id));
      navigation.navigate('HomeScreen');
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#333', '#333']} style={styles.container}>
      <StatusBar backgroundColor={'#333'} />
      <EcoIcon width={24} height={24} style={styles.iconBack} />
      <View style={styles.header}>
        <Text style={[styles.title, typography.bold]}>
          Selecione um Serviço
        </Text>
        <Text style={[styles.subtitle, typography.regular]}>
          Escolha o serviço desejado
        </Text>
        <Text style={[styles.description, typography.light]}>
          Você pode escolher entre barbeiro, cabeleireiro e outros serviços
          disponíveis.
        </Text>
      </View>
      <FlatList
        data={services}
        renderItem={({item}) => (
          <ServiceItem
            service={item.service}
            icon={item.icon}
            onPress={() => handleServicePress(item)}
          />
        )}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
      <LoadingScreen visible={isLoading} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: StatusBar.currentHeight || 0 + 20,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    marginBottom: 10,
    marginTop: 40,
  },
  subtitle: {
    color: '#fff',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  list: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  iconBack: {
    position: 'absolute',
    top: StatusBar.currentHeight || 0 + 10,
    left: 10,
  },
});

export default ServiceSelectionScreen;
