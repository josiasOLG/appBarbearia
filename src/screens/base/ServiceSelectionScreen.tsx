import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, StatusBar} from 'react-native';
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

const services = [
  {id: 'BARBER', service: 'Barbeiro', icon: 'face'},
  {id: 'STYLIST', service: 'Cabelereiro(a)', icon: 'content-cut'},
];

const ServiceSelectionScreen = () => {
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const handleServicePress = async (service: any) => {
    try {
      setIsLoading(true);
      await UserService.updateUserService(user.user.id, service.id);
      dispatch(setSelectedService(service.id));
      navigation.navigate('HomeScreen');
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  const handleLoginSuccess = () => {};

  const handleLoginError = (errorMessage: string) => {};

  return (
    <LinearGradient colors={['#7b67e9', '#624ed1']} style={styles.container}>
      <StatusBar backgroundColor={'#7b67e9'} />
      <EcoIcon style={styles.iconBack} />
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
      <LoadingScreen
        visible={isLoading}
        onSuccess={handleLoginSuccess}
        onError={handleLoginError}
        successScreen="HomeScreen"
        errorScreen="LoginScreen"
      />
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
    marginTop: 100,
  },
  title: {
    fontSize: 30,
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
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
    marginTop: 100,
  },
  iconBack: {
    position: 'absolute',
    opacity: 0.3,
    top: 0,
  },
});

export default ServiceSelectionScreen;
