import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BarberListFidelidad from '../../components/organisms/BarberListFidelidade/BarberListFidelidad';
import {useSelector} from 'react-redux';
import colors from '../../styles/colors/Colors';
import typography from '../../styles/typographys/typography';
import CustomModal from '../../components/atoms/CustomModal/CustomModal';
import {AppointmentService} from '../../api/AppointmentService';

const FidelityScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [points, setPoints] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const user = useSelector((state: any) => state.user);
  const userId = user.user.id;
  const userRole = user.user.type?.toLowerCase() || 'user';
  const themeColors = colors[userRole] || colors.user;

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const response = await AppointmentService.getAllPoints(userId);
        console.log(response.points);
        setPoints(response.points);
      } catch (error) {
        console.error('Failed to fetch points:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPoints();
  }, [userId]);

  const handleOpenModal = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);

  const modalMessage = {
    title: 'Informações sobre o programa de pontos',
    mensagem:
      'Após usar os pontos, eles são zerados. Os cortes de cabelo, barba e outros serviços podem ter seus próprios pontos estipulados por cada barbeiro. É necessário clicar no barbeiro para verificar quais serviços ele oferece para troca de pontos.',
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={themeColors.primary} />
      </View>
    );
  }

  return (
    <LinearGradient
      colors={[themeColors.white, themeColors.white]}
      style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={themeColors.secondary}
      />
      <ScrollView>
        <View style={[styles.header, {backgroundColor: themeColors.white}]}>
          <View style={styles.containerTitle}>
            <Text style={[styles.headerTitle, typography.bold]}>
              {user.user.username}
            </Text>
            <TouchableOpacity
              style={[styles.infoButton]}
              onPress={handleOpenModal}>
              <Text style={[styles.infoButtonText, typography.bold]}>
                Saiba Mais
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={[styles.headerSubtitle, typography.regular]}>
            Seu programa de pontos com cada barbeiro
          </Text>
          <Text style={[styles.additionalInfo, typography.regular]}>
            Você pode acumular pontos com cada barbeiro e trocá-los por cortes
            de cabelo. Cada barbeiro possui seu próprio sistema de pontos.
          </Text>
        </View>
        <BarberListFidelidad themeColors={themeColors} barbers={points} />
      </ScrollView>
      <CustomModal
        visible={modalVisible}
        message={modalMessage}
        onClose={handleCloseModal}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textTransform: 'capitalize',
    alignItems: 'flex-start',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
  additionalInfo: {
    fontSize: 13,
    color: '#333',
    marginTop: 10,
  },
  infoButton: {
    marginTop: 0,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  infoButtonText: {
    color: '#333',
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FidelityScreen;
