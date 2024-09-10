import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import SubscriptionForm from '../../../components/organisms/SubscriptionForm/SubscriptionForm';
import LinearGradient from 'react-native-linear-gradient';
import {getAddressByUserId} from '../../../api/AddressService';
import {useSelector} from 'react-redux';

enum PaymentOption {
  DEBITO = 0,
  CREDITO = 1,
}

const CadastrarCartaoScreen: React.FC = ({route}) => {
  const {selectedOption} = route.params;
  const paymentOption = selectedOption as PaymentOption;
  const user = useSelector((state: any) => state.user);
  const [dataAdress, setDataAdress] = useState<any>({});

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const addressData = await getAddressByUserId(user.user.id);
        if (addressData.length > 0) {
          const address = addressData[0];
          setDataAdress(address);
        }
      } catch (error) {
        console.log(error);
      } finally {
      }
    };
    fetchAddress();
  }, []);

  return (
    <LinearGradient colors={['#f1f6fa', '#d2e2ef']} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <SubscriptionForm dataAdress={dataAdress} />
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 0,
    justifyContent: 'center',
    padding: 10,
  },
});

export default CadastrarCartaoScreen;
