import React, {useCallback, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Alert,
} from 'react-native';
import SelectableOption from '../../../components/molecules/SelectableOption/SelectableOption';
import CardList from '../../../components/organisms/CardList/CardList';
import IconButton from '../../../components/atoms/Icon/IconButton';
import LinearGradient from 'react-native-linear-gradient';
import typography from '../../../styles/typographys/typography';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store';
import {getCards, subscribeUser} from '../../../api/SubscriptionService';
import {useFocusEffect} from '@react-navigation/native';
import CVCModal from './modal/CVCModal';
import colors from '../../../styles/colors/Colors';

const ListaCartoesScreen: React.FC = ({navigation}) => {
  const selectedPlan = useSelector(
    (state: RootState) => state.plan.selectedPlanId,
  );
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [selectedCard, setSelectedCard] = useState<any | null>(null);
  const [selectedCardItem, setSelectedCardItem] = useState<any | null>(null);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const user = useSelector((state: any) => state.user);
  const [modalVisible, setModalVisible] = useState<boolean>(false); // Estado para controlar a visibilidade do modal
  const service = useSelector((state: any) => state.service);
  const userRole = service.selectedService?.toLowerCase() || 'user';
  const themeColors = colors[userRole] || colors.user;

  const options = [
    {id: 1, icon: 'credit-card', text: 'Débito'},
    {id: 2, icon: 'cc-discover', text: 'Crédito'},
  ];

  useFocusEffect(
    useCallback(() => {
      const fetchCards = async () => {
        setLoading(true);
        try {
          const cardData = await getCards(user.user.id);
          setCards(cardData);
        } catch (error) {
          console.error('Failed to fetch cards', error);
        } finally {
          setLoading(false);
        }
      };

      fetchCards();
    }, [user.user.id]),
  );

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);
  };

  const handleCardSelect = (item: any) => {
    setSelectedCard(item);
  };

  const handleCardSelectItem = (item: any) => {
    setSelectedCardItem(item);
  };

  const handleSubscribe = async (securityCode: string) => {
    const subscriptionData = {
      userId: user.user.id,
      planId: selectedPlan.id,
      cardToken: selectedCardItem?.cardToken, // Certifique-se de que o selectedCard contenha cardToken
      holderName: user.user.username,
      planName: selectedPlan.title,
      security_code: securityCode, // Adiciona o security code no payload
    };

    try {
      const response = await subscribeUser(subscriptionData);
      navigation.navigate('AssinaturaStatus');
      setModalVisible(false);
    } catch (error) {
      console.error('Error subscribing user:', error);
    }
  };

  const screenCadCartao = () => {
    navigation.navigate('CadastrarCartaoScreen', {selectedOption});
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={themeColors.secondary} />
      </View>
    );
  }

  return (
    <LinearGradient colors={['#f1f6fa', '#d2e2ef']} style={styles.gradient}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.optionsContainer}>
            {options.map((option, index) => (
              <SelectableOption
                key={option.id}
                icon={option.icon}
                text={option.text}
                selected={selectedOption === index}
                onPress={() => handleOptionSelect(index)}
              />
            ))}
          </View>
          <IconButton
            onPress={screenCadCartao}
            text="Adicionar cartão"
            iconName="plus"
          />

          <View style={styles.contentTextoSelecione}>
            <Text style={[typography.bold, styles.contentTextoSelecioneTexto]}>
              Selecione o cartão abaixo já cadastrado
            </Text>
            <Text
              style={[typography.light, styles.contentTextoSelecioneTexto2]}>
              E faça sua assinatura agora mesmo e ganhe desconto exclusivo
            </Text>
          </View>
          <CardList
            cards={cards.map((card, index) => ({
              ...card,
              selected: selectedCard === index,
            }))}
            onCardSelect={handleCardSelect}
            onCardSelectItem={handleCardSelectItem}
          />
        </ScrollView>
        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: themeColors.primary}]}
            onPress={() => setModalVisible(true)}>
            <Text style={[styles.buttonTextLeft, typography.boldItalic]}>
              Assinatura
            </Text>
            <Text style={[styles.buttonTextRight, typography.extraLightItalic]}>
              {selectedPlan.description}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      <CVCModal
        onClose={() => setModalVisible(false)}
        visible={modalVisible}
        onSubmit={handleSubscribe}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 80,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4231a4',
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    padding: 16,
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
    fontSize: 18,
    color: '#fff',
    textAlign: 'left',
  },
  buttonTextRight: {
    flex: 1,
    fontSize: 18,
    color: '#fff',
    textAlign: 'right',
  },
  contentTextoSelecione: {
    paddingTop: 20,
  },
  contentTextoSelecioneTexto: {
    fontSize: 16,
  },
  contentTextoSelecioneTexto2: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default ListaCartoesScreen;
