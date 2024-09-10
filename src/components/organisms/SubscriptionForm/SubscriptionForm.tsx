import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useForm, SubmitHandler} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useSelector} from 'react-redux';
import {getCardBrand} from '../../../utils/utils';
import {getCardToken, subscribeUser} from '../../../api/SubscriptionService';
import FormField from '../../molecules/FormField/FormField';
import typography from '../../../styles/typographys/typography';
import IconButton from '../../atoms/Icon/IconButton';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import CustomIcon from '../../atoms/Icon/Icon';
import colors from '../../../styles/colors/Colors';

interface SubscriptionFormData {
  cardNumber: string;
  cardExpiry: string;
  cardCVC: string;
  holderName: string;
  subscriptionCode?: string;
}

interface SubscriptionFormProp {
  dataAdress?: any;
}

const schema = yup.object().shape({
  cardNumber: yup.string().required('Campo obrigatório'),
  cardExpiry: yup.string().required('Campo obrigatório'),
  cardCVC: yup.string().required('Campo obrigatório'),
  holderName: yup.string().required('Campo obrigatório'),
});

const SubscriptionForm: React.FC<SubscriptionFormProp> = ({dataAdress}) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm<SubscriptionFormData>({
    resolver: yupResolver(schema),
  });

  const user = useSelector((state: any) => state.user);
  const service = useSelector((state: any) => state.service);
  const userRole = user.user.type?.toLowerCase() || 'user';
  const themeColors = colors[userRole] || colors.user;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigation = useNavigation();
  const cardNumber = watch('cardNumber');
  const cardExpiry = watch('cardExpiry');
  const cardCVC = watch('cardCVC');
  const holderName = watch('holderName');

  const handleSubscribe: SubmitHandler<SubscriptionFormData> = async data => {
    setIsSubmitting(true);
    try {
      const cardData = {
        userId: user.user.id,
        cardNumber: data.cardNumber,
        cardExpiry: data.cardExpiry,
        cardCvc: data.cardCVC,
        holderName: data.holderName,
        email: user.user.email,
        taxId: dataAdress.cpf,
        number: dataAdress.phoneNumber,
      };
      console.log('cardData >>', cardData);

      const response = await getCardToken(cardData);

      navigation.navigate('ListaCartoesScreen');
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  console.log(dataAdress.cpf);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[themeColors.primary, themeColors.secondary]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.cardPreview}>
        <Text style={[styles.cardHolderName, typography.regular]}>
          {holderName || 'HOLDER NAME'}
        </Text>
        <Text style={[styles.cardNumber, typography.bold]}>
          {cardNumber || '0000 0000 0000 0000'}
        </Text>
        <View style={styles.row}>
          <Text style={[styles.cardExpiry, typography.regular]}>
            {cardExpiry || 'MM/YYYY'}
          </Text>
          <Text style={[styles.cardCVC, typography.regular]}>
            {cardCVC || 'CVC'}
          </Text>
        </View>
      </LinearGradient>
      <FormField
        control={control}
        name="holderName"
        placeholder="Nome no Cartão"
        label="Nome no Cartão de crédito"
        error={errors.holderName?.message}
        containerStyle={{marginTop: 10}}
      />
      <FormField
        control={control}
        name="cardNumber"
        label="Número do cartão do crédito"
        error={errors.cardNumber?.message}
        keyboardType="numeric"
        placeholder="0000 0000 0000 0000"
        maskType="credit-card"
        containerStyle={{marginTop: 10}}
      />
      <View style={styles.row}>
        <View style={styles.halfWidth}>
          <FormField
            control={control}
            name="cardExpiry"
            label="Data expira"
            error={errors.cardExpiry?.message}
            keyboardType="numeric"
            placeholder="MM/YY"
            maskType="datetime"
            options={{format: 'MM/YYYY'}}
            containerStyle={{marginTop: 10}}
          />
        </View>
        <View style={styles.halfWidth}>
          <FormField
            control={control}
            name="cardCVC"
            label="CVC"
            error={errors.cardCVC?.message}
            keyboardType="numeric"
            placeholder="000"
            secureTextEntry
            containerStyle={{marginTop: 10}}
          />
        </View>
      </View>

      <View>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: themeColors.primary}]}
          onPress={handleSubmit(handleSubscribe)}
          disabled={isSubmitting}>
          {isSubmitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Text
                style={[styles.buttonTextLeft, typography.extraLightItalic]}>
                Cadastrar cartão
              </Text>
              <CustomIcon name="credit-card" size={20} color="#fff" />
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  cardPreview: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 8,
    elevation: 5,
    rowGap: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  halfWidth: {
    flex: 1,
  },
  cardNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#fff',
    width: '100%',
  },
  cardHolderName: {
    fontSize: 20,
    marginBottom: 8,
    color: '#fff',
    width: '100%',
  },
  cardExpiry: {
    fontSize: 14,
    color: '#fff',
    flex: 1,
    textAlign: 'left',
  },
  cardCVC: {
    fontSize: 14,
    color: '#fff',
    flex: 1,
    textAlign: 'right',
  },
  contentBtn: {
    marginTop: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: '#4231a4',
    borderRadius: 50,
    marginTop: 20,
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
});

export default SubscriptionForm;
