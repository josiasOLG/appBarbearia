import React from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';
import EnderecoForm from '../../components/organisms/EnderecoForm/EnderecoForm';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import colors from '../../styles/colors/Colors';

const CadastrarEnderecoScreen: React.FC = () => {
  const user = useSelector((state: any) => state.user);
  const userRole = user.user.type?.toLowerCase() || 'user';
  const themeColors = colors[userRole] || colors.user;

  return (
    <LinearGradient
      style={styles.container}
      colors={[themeColors.white, themeColors.white]}>
      <StatusBar
        backgroundColor={themeColors.primary}
        barStyle="light-content"
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardAvoidingView}>
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
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
});

export default CadastrarEnderecoScreen;
