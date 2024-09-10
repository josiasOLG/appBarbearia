import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  Modal,
} from 'react-native';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../styles/colors/Colors';
import typography from '../../styles/typographys/typography';
import CustomIcon from '../../components/atoms/Icon/Icon';
import Select from '../../components/atoms/Select/Select';
import {BarberService} from '../../api/BarberService';

const ServiceRegistrationScreen: React.FC = () => {
  const user = useSelector((state: any) => state.user);
  const userRole = user?.user.type?.toLowerCase() || 'user';
  const themeColors = colors[userRole] || colors.user;

  const [serviceName, setServiceName] = useState('');
  const [points, setPoints] = useState('');
  const [services, setServices] = useState<any[]>([]);
  const [availableServices, setAvailableServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchServices();
    fetchAvailableServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const userId = user.user.id;
      const response = await BarberService.getServices(userId);
      setServices(response.data);
    } catch (error) {
      console.error('Failed to fetch services', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableServices = async () => {
    try {
      const response = await BarberService.getAllServices();
      console.log(response);
      setAvailableServices(response.data);
    } catch (error) {
      console.error('Failed to fetch available services', error);
    }
  };

  const handleAddService = async () => {
    if (serviceName.trim() && points.trim()) {
      setLoading(true);
      try {
        const userId = user.user.id;
        await BarberService.addService(
          userId,
          serviceName.trim(),
          points.trim(),
        );
        setServiceName('');
        setPoints('');
        fetchServices();
      } catch (error) {
        console.error('Failed to add service', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDeleteService = async (id: number) => {
    setLoading(true);
    try {
      await BarberService.deleteService(id);
      fetchServices();
    } catch (error) {
      console.error('Failed to delete service', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={[themeColors.secondary, themeColors.secondary]}
      style={styles.gradient}>
      <StatusBar backgroundColor={themeColors.primary} />
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.container}>
          <Text style={[styles.title, typography.semiBold]}>
            Digite o serviço
          </Text>
          <Text style={[styles.subtitle, typography.light]}>
            Serviços que você oferece para os seus consumidores
          </Text>
          <View style={styles.inputContainer}>
            <Select
              items={availableServices.map(service => ({
                label: service.name,
                value: service.name,
              }))}
              selectedValue={serviceName}
              onValueChange={setServiceName}
              placeholder="Selecionar serviço"
              themeColors={themeColors}
              style={{width: 180}}
            />
            <TextInput
              style={styles.input}
              placeholder="Pontos"
              placeholderTextColor="#aaa"
              value={points}
              onChangeText={setPoints}
              keyboardType="numeric"
            />
            <TouchableOpacity
              style={[styles.addButton, {backgroundColor: themeColors.primary}]}
              onPress={handleAddService}>
              <CustomIcon name="plus" size={20} color="#fff" type="feather" />
            </TouchableOpacity>
          </View>

          <View style={styles.serviceList}>
            {services.length === 0 ? (
              <View style={styles.emptyContainer}>
                <CustomIcon name="info" size={40} color="#aaa" type="feather" />
                <Text style={[styles.emptyText, typography.light]}>
                  Nenhum serviço cadastrado. Por favor, adicione um serviço
                  usando o campo acima.
                </Text>
              </View>
            ) : (
              services.map(service => (
                <View
                  key={service.id}
                  style={[
                    styles.serviceItem,
                    {backgroundColor: themeColors.primary},
                  ]}>
                  <Text style={[styles.serviceText, typography.regular]}>
                    {service.name} - {service.points} pontos
                  </Text>
                  <TouchableOpacity
                    style={[styles.btnDelete]}
                    onPress={() => handleDeleteService(service._id)}>
                    <CustomIcon
                      name="trash-2"
                      size={20}
                      color="#fff"
                      type="feather"
                    />
                  </TouchableOpacity>
                </View>
              ))
            )}
          </View>
        </View>
      </ScrollView>
      <Modal
        transparent={true}
        animationType="fade"
        visible={loading}
        onRequestClose={() => {}}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
    padding: 20,
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
    lineHeight: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 10,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 14,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#0066cc',
    padding: 13,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceList: {
    marginTop: 10,
  },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  serviceText: {
    fontSize: 14,
    color: '#fff',
    textTransform: 'capitalize',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    marginTop: 10,
    fontSize: 14,
    color: '#aaa',
    textAlign: 'center',
  },
  btnDelete: {
    backgroundColor: '#2E7D32',
    padding: 10,
    borderRadius: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default ServiceRegistrationScreen;
