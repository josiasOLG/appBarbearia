import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, StatusBar, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import colors from '../../styles/colors/Colors';
import typography from '../../styles/typographys/typography';
import LinearGradient from 'react-native-linear-gradient';
import ServiceList from '../../components/organisms/ServiceList/ServiceList';
import FilterStatus from '../../components/molecules/FilterStatus/FilterStatus';
import {AppointmentService} from '../../api/AppointmentService';
import ModalStatus from '../../components/organisms/ModalStatus/ModalStatus';
import ModalAddPoints from '../../components/organisms/ModalAddPoints/ModalAddPoints';
import {useFocusEffect} from '@react-navigation/native';

interface ConfirmationScreenProps {
  navigation: any;
}

const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({
  navigation,
}) => {
  const user = useSelector((state: any) => state.user);
  const userRole = user?.user.type?.toLowerCase() || 'user';
  const themeColors = colors[userRole] || colors.user;

  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalAddPointsVisible, setModalAddPointsVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalDescription, setModalDescription] = useState('');
  const [showInput, setShowInput] = useState(true);
  const [confirmAction, setConfirmAction] = useState<() => void>(() => {});
  const [cancelReason, setCancelReason] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState<
    number | string | null
  >(null);
  const [selectedUserId, setSelectedUserId] = useState<any>(null);
  const [currentFilter, setCurrentFilter] = useState<string | undefined>(
    undefined,
  );

  const fetchAppointments = async (filter?: string) => {
    setLoading(true);
    try {
      const response = await AppointmentService.getAllAppointamentBarberId(
        user.user.id,
        filter,
      );
      setServices(response);
    } catch (error) {
      console.error('Failed to fetch appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchAppointments(currentFilter);
    }, [user.user.id, currentFilter]),
  );

  const confirmService = async (serviceId: number | string) => {
    try {
      await AppointmentService.approveAppointment(serviceId);
      fetchAppointments(currentFilter); // Fetch appointments after confirming
    } catch (error) {
      console.error('Failed to confirm appointment:', error);
    }
  };

  const cancelService = (serviceId: number | string) => {
    setSelectedServiceId(serviceId);
    setModalTitle('Motivo do Cancelamento');
    setModalDescription(
      'Por favor, forneça uma breve explicação para o cancelamento do agendamento. Sua opinião é importante para melhorarmos nossos serviços.',
    );
    setShowInput(true);
    setConfirmAction(() => handleCancelService);
    setModalVisible(true);
  };

  const addPoints = (serviceId: number | string, userId: any) => {
    setSelectedServiceId(serviceId);
    setSelectedUserId(userId);
    setModalTitle('Adicionar Pontos');
    setModalDescription(
      'Deseja realmente adicionar pontos para este usuário? (!IMPORTANTE: Ao adicionar os pontos não é possível remover os pontos)',
    );
    setModalAddPointsVisible(true);
  };

  const handleCancelService = async () => {
    if (selectedServiceId) {
      try {
        await AppointmentService.rejectAppointment(
          selectedServiceId,
          cancelReason,
        );
        fetchAppointments(currentFilter); // Fetch appointments after canceling
      } catch (error) {
        console.error('Failed to cancel appointment:', error);
      } finally {
        setModalVisible(false);
        setCancelReason('');
        setSelectedServiceId(null);
      }
    }
  };

  const handleAddPoints = async () => {
    if (selectedServiceId && selectedUserId) {
      try {
        await AppointmentService.addPoints(
          selectedServiceId,
          selectedUserId,
          user.user.id,
          user.user.username,
        );
        fetchAppointments(currentFilter);
      } catch (error) {
        console.error('Failed to add points:', error);
      } finally {
        setModalAddPointsVisible(false);
        setSelectedServiceId(null);
        setSelectedUserId(null); // Ensure to reset the selectedUserId
      }
    }
  };

  const handleFilterChange = (filter: string) => {
    setCurrentFilter(filter);
    fetchAppointments(filter);
  };

  return (
    <LinearGradient
      colors={[themeColors.primary, themeColors.black]}
      style={styles.gradient}>
      <StatusBar backgroundColor={themeColors.primary} />
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.container}>
          <Text style={[styles.title, typography.bold]}>Seus Agendamentos</Text>
          <Text style={[styles.subtitle, typography.regular]}>
            Aqui você pode ver e confirmar os seus agendamentos. Clique em um
            agendamento para ver mais detalhes.
          </Text>
          <FilterStatus
            onFilterChange={handleFilterChange}
            themeColors={themeColors}
          />
          {loading ? (
            <Text style={styles.loadingText}>Carregando...</Text>
          ) : (
            <ServiceList
              services={services}
              confirmService={confirmService}
              cancelService={cancelService}
              addPoints={addPoints}
              themeColors={themeColors}
            />
          )}
        </View>
      </ScrollView>
      <ModalStatus
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={confirmAction}
        themeColors={themeColors}
        title={modalTitle}
        description={modalDescription}
        showInput={showInput}
      />
      <ModalAddPoints
        visible={modalAddPointsVisible}
        onClose={() => setModalAddPointsVisible(false)}
        onConfirm={handleAddPoints}
        themeColors={themeColors}
        title={modalTitle}
        description={modalDescription}
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
    padding: 20,
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ConfirmationScreen;
