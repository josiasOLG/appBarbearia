// screens/Barber/Assinatura/AssinaturaStatus.tsx
import React, {useCallback, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {
  CommonActions,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import {
  assinantes,
  getInvoices,
  renewSubscription,
} from '../../../api/SubscriptionService';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import AssinaturaList from '../../../components/organisms/AssinaturaList/AssinaturaList';
import typography from '../../../styles/typographys/typography';
import SubscriptionStatus from '../../../components/organisms/SubscriptionStatus/SubscriptionStatus';
import UpdateCardModal from '../../../components/molecules/UpdateCardModalProps/UpdateCardModalProps';

const AssinaturaStatus: React.FC = () => {
  const navigation = useNavigation();
  const [hasSubscription, setHasSubscription] = useState(false);
  const [loading, setLoading] = useState(true);
  const [subscribers, setSubscribers] = useState<any>();
  const [invoices, setInvoices] = useState<any[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataCard, setDataCard] = useState<any>({});
  const user = useSelector((state: any) => state.user);

  const fetchSubscribers = async (userId: string) => {
    try {
      const data = await assinantes(userId);
      setSubscribers(data);
      setHasSubscription(data.hasSubscription);
      return data;
    } catch (error) {
      console.error('Error fetching subscribers:', error);
      throw error;
    }
  };

  const fetchInvoices = async (subscriptionId: string) => {
    try {
      const invoicesData = await getInvoices(subscriptionId);
      const formattedInvoices = invoicesData.invoices.map((invoice: any) => ({
        id: invoice.id,
        status: invoice.status,
        createdAt: new Date(invoice.created_at).toLocaleDateString(),
        amount: `${invoice.amount.currency} ${invoice.amount.value}`,
      }));
      setInvoices(formattedInvoices);
    } catch (error) {
      console.error('Error fetching invoices:', error);
      throw error;
    }
  };

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const userId = user?.user?.id; // Substitua pelo ID do usuário real
          const subscriberData = await fetchSubscribers(userId);
          if (subscriberData.subscriptionId) {
            await fetchInvoices(subscriberData.subscriptionId);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, [user]),
  );

  const statusAtual = subscribers?.subscriptionStatus; // Exemplo de status atual

  const handleActionPress = async (action: string) => {
    if (action === 'UpdateCardDetails') {
      setIsModalVisible(true);
    } else if (action === 'ReAssinar') {
      try {
        const userId = user?.user?.id;
        const subscriptionData = {
          userId: userId,
          cardNumber: dataCard?.cardNumber,
          expiryMonth: dataCard?.expiryMonth,
          expiryYear: dataCard?.expiryYear,
          security_code: dataCard?.cvc,
        };

        const response = await renewSubscription(subscriptionData);

        if (response) {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'HomeScreen'}],
            }),
          );
        }
      } catch (error) {
        console.log(error);
      }
    } else {
    }
  };

  const handleUpdateCard = (
    cardNumber: string,
    expiryMonth: string,
    expiryYear: string,
    cvc: string,
  ) => {
    setDataCard({
      cardNumber,
      expiryMonth,
      expiryYear,
      cvc,
    });
  };

  return (
    <LinearGradient colors={['#f1f6fa', '#d2e2ef']} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <SubscriptionStatus
            status={statusAtual}
            cardDetails={{
              holderName:
                subscribers?.cardDetails.holderName.toUpperCase() ||
                'HOLDER NAME',
              cardLastFourDigits:
                subscribers?.cardDetails?.cardLastFourDigits || '0000',
              expiryMonth: subscribers?.cardDetails?.expiryMonth || 'MM/YYYY',
            }}
            onActionPress={handleActionPress}
          />
        </ScrollView>

        <View style={styles.containerBottom}>
          <Text style={styles.historicoHeader}>Histórico de Assinaturas</Text>
          <AssinaturaList assinaturas={invoices} />
        </View>
      </KeyboardAvoidingView>
      {isModalVisible && (
        <UpdateCardModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onUpdate={handleUpdateCard}
        />
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  historicoHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 0,
    marginBottom: 8,
    color: '#333',
  },
  containerBottom: {
    padding: 20,
    height: 150,
  },
});

export default AssinaturaStatus;
