import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  StatusBar,
} from 'react-native';
import SubscriptionOptions from '../../../components/organisms/SubscriptionOptions/SubscriptionOptions';
import PrimaryButton from '../../../components/atoms/PrimaryButton/PrimaryButton';
import LinearGradient from 'react-native-linear-gradient';
import {getPlans} from '../../../api/SubscriptionService';
import {useDispatch, useSelector} from 'react-redux';
import {setSelectedPlanId} from '../../../store/reducers/plan.reducer';
import colors from '../../../styles/colors/Colors';

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
        <SubscriptionOptions
          options={options}
          onOptionSelect={handleOptionSelect}
        />
        <PrimaryButton onPress={handleSubscribe} text="Assinar" />
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
    padding: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4231a4',
  },
});

export default AssinaturaScreen;
