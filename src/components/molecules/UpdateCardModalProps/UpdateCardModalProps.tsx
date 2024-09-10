import React from 'react';
import {Modal, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CreditCardPreview from '../../molecules/CreditCardPreview/CreditCardPreview';
import typography from '../../../styles/typographys/typography';
import CustomIcon from '../../atoms/Icon/Icon';
import FormField from '../../molecules/FormField/FormField';
import {useSelector} from 'react-redux';
import {atualizarCartao} from '../../../api/SubscriptionService';

interface UpdateCardModalProps {
  visible: boolean;
  onClose: () => void;
  onUpdate: (
    cardNumber: string,
    expiryMonth: string,
    expiryYear: string,
    cvc: string,
  ) => void;
}

interface UpdateCardFormData {
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvc: string;
}

const schema = yup.object().shape({
  cardNumber: yup.string().required('Número do cartão é obrigatório'),
  expiryMonth: yup.string().required('Mês de expiração é obrigatório'),
  expiryYear: yup.string().required('Ano de expiração é obrigatório'),
  cvc: yup.string().required('CVC é obrigatório'),
});

const UpdateCardModal: React.FC<UpdateCardModalProps> = ({
  visible,
  onClose,
  onUpdate,
}) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm<UpdateCardFormData>({
    resolver: yupResolver(schema),
  });

  const cardNumber = watch('cardNumber');
  const expiryMonth = watch('expiryMonth');
  const expiryYear = watch('expiryYear');
  const cvc = watch('cvc');
  const holderName = watch('holderName');
  const user = useSelector((state: any) => state.user);

  const handleUpdate: SubmitHandler<UpdateCardFormData> = async data => {
    try {
      // Chamando a função onUpdate se ela for passada
      if (onUpdate) {
        onUpdate(data.cardNumber, data.expiryMonth, data.expiryYear, data.cvc);
      }

      // Preparando dados para a atualização do cartão
      const subscriptionData = {
        cardNumber: data.cardNumber,
        expiryMonth: data.expiryMonth,
        expiryYear: data.expiryYear,
        cvc: data.cvc,
        email: user.user.email,
        holderName: user.user.username,
      };

      // Chamando o método de atualização do cartão
      await atualizarCartao(subscriptionData);

      // Fechando o modal após atualização
      onClose();
    } catch (error) {
      console.error('Erro ao atualizar cartão:', error);
    }
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Atualizar Cartão</Text>
          <CreditCardPreview
            holderName={holderName || 'HOLDER NAME'}
            cardNumber={cardNumber?.slice(-4) || '0000'}
            cardExpiry={`${expiryMonth}/${expiryYear}` || 'MM/YYYY'}
          />
          <FormField
            control={control}
            name="cardNumber"
            label="Número do cartão do crédito"
            error={errors.cardNumber?.message}
            keyboardType="numeric"
            placeholder="0000 0000 0000 0000"
            maskType="credit-card"
          />
          <View style={styles.expiryCvcContainer}>
            <View style={styles.halfWidth}>
              <FormField
                control={control}
                name="expiryMonth"
                label="Mês"
                error={errors.expiryMonth?.message}
                keyboardType="numeric"
                placeholder="MM"
                maskType="datetime"
                options={{format: 'MM'}}
              />
            </View>
            <View style={styles.halfWidth}>
              <FormField
                control={control}
                name="expiryYear"
                label="Ano"
                error={errors.expiryYear?.message}
                keyboardType="numeric"
                placeholder="YYYY"
                maskType="datetime"
                options={{format: 'YYYY'}}
              />
            </View>
            <View style={styles.halfWidth}>
              <FormField
                control={control}
                name="cvc"
                label="CVC"
                error={errors.cvc?.message}
                keyboardType="numeric"
                placeholder="000"
                secureTextEntry
              />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit(handleUpdate)}>
              <Text
                style={[styles.buttonTextLeft, typography.extraLightItalic]}>
                Atualizar
              </Text>
              <Text style={[styles.buttonTextRight, typography.boldItalic]}>
                <CustomIcon name="credit-card" size={20} color="#fff" />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}>
              <Text
                style={[styles.buttonTextLeft, typography.extraLightItalic]}>
                Cancelar
              </Text>
              <Text style={[styles.buttonTextRight, typography.boldItalic]}>
                <CustomIcon name="close" size={20} color="#fff" />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  expiryCvcContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    flex: 1,
    marginRight: 5,
  },
  buttonContainer: {
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
    marginTop: 10,
  },
  buttonTextLeft: {
    flex: 1,

    color: '#fff',
    textAlign: 'left',
  },
  buttonTextRight: {
    flex: 1,

    color: '#fff',
    textAlign: 'right',
  },
  cancelButton: {
    backgroundColor: 'red',
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default UpdateCardModal;
