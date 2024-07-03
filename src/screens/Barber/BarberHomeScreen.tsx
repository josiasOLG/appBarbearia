import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Platform,
  ScrollView,
} from 'react-native';
import IconCalendar from '../../assets/icons/iconCalendar.svg';
import IconCheckList from '../../assets/icons/iconChecklist.svg';
import IconConfig from '../../assets/icons/iconConfig.svg';
import LinearGradient from 'react-native-linear-gradient';
import {GlobalLayoutStyles} from '../../styles/GlobalLayoutStyles';
import typography from '../../styles/typographys/typography';
import {KeyboardAvoidingView} from 'react-native';
import {useSelector} from 'react-redux';
import colors from '../../styles/colors/Colors'; // Importar cores
import CustomIcon from '../../components/atoms/Icon/Icon';

interface HomeScreenProps {
  navigation: any;
}

const BarberHomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const user = useSelector((state: any) => state.user);
  const userRole = user?.user.type?.toLowerCase() || 'user';
  const themeColors = colors[userRole] || colors.user;
  return (
    <LinearGradient
      colors={[themeColors.primary, themeColors.primary]}
      style={styles.gradient}>
      <StatusBar backgroundColor={themeColors.primary} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={GlobalLayoutStyles.flexContainer}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <View style={[styles.topSection]}>
            <View style={styles.contentTextTop}>
              <Text style={[styles.titleTop, typography.semiBold]}>HELLO</Text>
              <Text style={[styles.textTop, typography.light]}>
                Seja bem vindo {user.user.username}
              </Text>
            </View>
          </View>
          <View style={[styles.middleSection]}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ServiceRegistrationScreen')}>
              <View
                style={[styles.card, {backgroundColor: themeColors.secondary}]}>
                <View style={styles.colum1}>
                  <Text style={[styles.cardTitle, typography.semiBold]}>
                    Serviços
                  </Text>
                  <Text style={styles.cardText}>
                    Cadastro de serviços prestados
                  </Text>
                </View>
                <View style={styles.colum2}>
                  <View
                    style={[
                      styles.roundedIconSearch,
                      {backgroundColor: themeColors.primary},
                    ]}>
                    <CustomIcon
                      color={'#fff'}
                      size={25}
                      name="plus"
                      type="feather"
                    />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomSection}>
            <Text style={[styles.cardTitle, typography.semiBold]}>
              Nossos serviços
            </Text>
            <View style={[styles.row]}>
              <TouchableOpacity
                style={[
                  styles.cardServico,
                  {backgroundColor: themeColors.secondary},
                ]}>
                <View style={styles.roundedIcon}>
                  <IconCalendar
                    width={40}
                    height={40}
                    color={themeColors.primary}
                  />
                </View>
                <Text style={[styles.cardTextServico, typography.semiBold]}>
                  Relatórios
                </Text>
                <Text style={[styles.cardTextSmallServico, typography.light]}>
                  Dados dos clientes
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.cardServico,
                  {backgroundColor: themeColors.secondary},
                ]}>
                <View style={styles.roundedIcon}>
                  <IconCheckList
                    width={40}
                    height={40}
                    color={themeColors.primary}
                  />
                </View>
                <Text style={[styles.cardTextServico, typography.semiBold]}>
                  Status
                </Text>
                <Text style={[styles.cardTextSmallServico, typography.light]}>
                  Agendamento
                </Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.row]}>
              <TouchableOpacity
                onPress={() => navigation.navigate('SettingsScreen')}
                style={[
                  styles.cardServico,
                  {backgroundColor: themeColors.secondary},
                ]}>
                <View style={styles.roundedIcon}>
                  <IconConfig
                    width={40}
                    height={40}
                    color={themeColors.primary}
                  />
                </View>
                <Text style={[styles.cardTextServico, typography.semiBold]}>
                  Fidelidade
                </Text>
                <Text style={[styles.cardTextSmallServico, typography.light]}>
                  Programa de pontos
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('SettingsScreen')}
                style={[
                  styles.cardServico,
                  {backgroundColor: themeColors.secondary},
                ]}>
                <View style={styles.roundedIcon}>
                  <IconConfig
                    width={40}
                    height={40}
                    color={themeColors.primary}
                  />
                </View>
                <Text style={[styles.cardTextServico, typography.semiBold]}>
                  Configurações
                </Text>
                <Text style={[styles.cardTextSmallServico, typography.light]}>
                  E area do usuário
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  card: {
    flexDirection: 'row',
    height: 100,
    backgroundColor: '',
    borderRadius: 15,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Distribui os cartões horizontalmente
    width: '100%', // Ocupa toda a largura do bottomSection
    flex: 1, // Ocupa uma proporção do espaço disponível
  },
  cardServico: {
    width: '48%', // Aproximadamente metade da largura do contêiner, considerando a margem
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '',
    borderRadius: 15,
    padding: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 5,
    marginTop: 5,
  },
  colum1: {
    flex: 4,
  },
  colum2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colum3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colum4: {
    flex: 6,
    justifyContent: 'center',
  },
  topSection: {
    flex: 0.5,
    justifyContent: 'flex-start',
    width: '100%',
    paddingHorizontal: 20,
  },
  middleSection: {
    flex: 0.1,
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  bottomSection: {
    flex: 3,
    padding: 20,
  },
  contentTextTop: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  input: {
    height: 60,
    backgroundColor: '#fff',
    opacity: 0.5,
    marginTop: 20,
    borderRadius: 10,
    fontSize: 20,
    padding: 20,
  },
  titleTop: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 5,
  },
  textTop: {
    color: '#fff',
    fontSize: 18,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 0,
  },
  cardText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 8,
  },
  cardTextServico: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
  },
  cardTextSmallServico: {
    fontSize: 14,
    color: '#fff',
  },
  roundedIconSearch: {
    borderRadius: 50,
    backgroundColor: '',
    padding: 10,
    width: 50,
    height: 50,
    marginTop: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundedIcon: {
    borderRadius: 50,
    backgroundColor: '',
    padding: 40,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BarberHomeScreen;
