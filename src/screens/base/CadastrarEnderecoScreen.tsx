import React from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import EnderecoForm from '../../components/organisms/EnderecoForm/EnderecoForm';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import colors from '../../styles/colors/Colors';

const CadastrarEnderecoScreen: React.FC = () => {
  const user = useSelector((state: any) => state.user);
  const service = useSelector((state: any) => state.service);
  const userRole = service.selectedService?.toLowerCase() || 'user';
  const themeColors = colors[userRole] || colors.user;
  return (
    <LinearGradient
      style={styles.container}
      colors={[themeColors.secondary, themeColors.secondary]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <EnderecoForm />
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

export default CadastrarEnderecoScreen;
