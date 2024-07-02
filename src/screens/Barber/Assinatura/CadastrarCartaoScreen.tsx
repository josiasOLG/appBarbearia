import React from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import SubscriptionForm from '../../../components/organisms/SubscriptionForm/SubscriptionForm';
import LinearGradient from 'react-native-linear-gradient';

enum PaymentOption {
  DEBITO = 0,
  CREDITO = 1,
}

const CadastrarCartaoScreen: React.FC = ({route}) => {
  const {selectedOption} = route.params;
  const paymentOption = selectedOption as PaymentOption;

  return (
    <LinearGradient colors={['#f1f6fa', '#d2e2ef']} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <SubscriptionForm />
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
    padding: 20,
  },
});

export default CadastrarCartaoScreen;
