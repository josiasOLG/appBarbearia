import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  StatusBar,
  Text,
  TouchableOpacity,
} from 'react-native';
import SubscriptionOptions from '../../../components/organisms/SubscriptionOptions/SubscriptionOptions';
import PrimaryButton from '../../../components/atoms/PrimaryButton/PrimaryButton';
import LinearGradient from 'react-native-linear-gradient';
import {assinantes, getPlans} from '../../../api/SubscriptionService';
import {useDispatch, useSelector} from 'react-redux';
import {setSelectedPlanId} from '../../../store/reducers/plan.reducer';
import colors from '../../../styles/colors/Colors';
import LottieView from 'lottie-react-native';
import typography from '../../../styles/typographys/typography';
import upgradeAnimation from '../../../assets/lottie/lottie-login.json';
import CustomIcon from '../../../components/atoms/Icon/Icon';
import {useFocusEffect} from '@react-navigation/native';

interface Plan {
  id: string;
  title: string;
  description: string;
  amount: number;
  icon: string;
}

const AssinaturaScreen: React.FC = ({navigation}) => {
  const [options, setOptions] = useState<Plan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const service = useSelector((state: any) => state.service);
  const userRole = user.user.type?.toLowerCase() || 'user';
  const themeColors = colors[userRole] || colors.user;

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const plans = await getPlans();

        const formattedPlans = plans.map((plan: any) => ({
          id: plan.idPagseguro,
          title: plan.name,
          description: `R$ ${(plan.amountPerPayment / 100).toFixed(2)}`,
          icon: 'calendar', // Customize icons based on plan details if needed
        }));
        setOptions(formattedPlans);
      } catch (error: any) {
        console.log(error);
        Alert.alert('Error', 'Failed to fetch plans.');
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const fetchSubscribers = async () => {
        try {
          const userId = user?.user?.id; // Substitua pelo ID do usuário real
          const data = await assinantes(userId);
          if (data) {
            navigation.navigate('AssinaturaStatus');
          }
        } catch (error) {
          console.log('AssinaturaScreen >> ', error);
        } finally {
          setLoading(false);
        }
      };

      fetchSubscribers();
    }, [user]),
  );

  const handleOptionSelect = (item: any) => {
    dispatch(setSelectedPlanId(item));
  };

  const handleSubscribe = () => {
    navigation.navigate('ListaCartoesScreen');
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return (
    <LinearGradient
      colors={[themeColors.primary, themeColors.secondary]}
      style={styles.gradient}>
      <StatusBar backgroundColor={themeColors.primary} />
      <ScrollView contentContainerStyle={styles.container}>
        <LottieView
          source={upgradeAnimation}
          autoPlay
          loop
          style={styles.lottie}
        />
        <Text style={[styles.title, typography.bold]}>
          Escolha o Plano Ideal para Você!
        </Text>
        <Text style={[styles.description, typography.regular]}>
          Selecione entre os planos Mensal, Trimestral ou Anual e aproveite
          todas as vantagens exclusivas!
        </Text>
        <SubscriptionOptions
          options={options}
          onOptionSelect={handleOptionSelect}
        />

        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: themeColors.white}]}
            onPress={handleSubscribe}>
            <Text style={[styles.buttonTextLeft, typography.boldItalic]}>
              Prosseguir
            </Text>
            <CustomIcon
              name="arrow-forward"
              color="#333"
              size={20}
              type="material"
              style={styles.buttonTextRight}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4231a4',
  },
  lottie: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
    color: '#fff',
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff',
  },
  bottomButtonContainer: {
    flex: 1,
    width: '100%',
    marginTop: 40,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: '#4231a4',
    borderRadius: 50,
  },
  buttonTextLeft: {
    flex: 1,

    color: '#333',
    textAlign: 'left',
  },
  buttonTextRight: {
    flex: 1,

    color: '#333',
    textAlign: 'right',
  },
  contentTextoSelecione: {
    paddingTop: 20,
  },
  contentTextoSelecioneTexto: {
    fontSize: 14,
  },
  contentTextoSelecioneTexto2: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default AssinaturaScreen;
