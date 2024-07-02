import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Modal} from 'react-native';
import {useForm, SubmitHandler} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import FormField from '../../../../components/molecules/FormField/FormField';
import typography from '../../../../styles/typographys/typography';
import CustomIcon from '../../../../components/atoms/Icon/Icon';

interface CVCModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (securityCode: string) => void;
}

interface CVCFormData {
  security_code: string;
}

const schema = yup.object().shape({
  security_code: yup.string().required('Código de segurança é obrigatório'),
});

const CVCModal: React.FC<CVCModalProps> = ({visible, onClose, onSubmit}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<CVCFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler: SubmitHandler<CVCFormData> = data => {
    onSubmit(data.security_code);
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.btnClose} onPress={onClose}>
          <CustomIcon name="close" color="#fff" size={10} />
        </TouchableOpacity>
        <View style={styles.modalContent}>
          <Text style={[styles.title, typography.bold]}>
            Digite o código de segurança
          </Text>
          <Text style={[styles.subtitle, typography.light]}>
            Por favor, insira o CVC do cartão selecionado
          </Text>
          <View style={styles.contentfooter}>
            <FormField
              control={control}
              name="security_code"
              placeholder="CVC"
              label="Código de Segurança"
              error={errors.security_code?.message}
              maskType="custom"
              keyboardType="numeric"
              options={{
                mask: '999',
              }}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit(onSubmitHandler)}>
              <Text style={[styles.buttonText, typography.regular]}>
                Prosseguir
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
    position: 'relative',
  },
  btnClose: {
    position: 'absolute',
    right: 20,
    top: 50,
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 0,
  },
  button: {
    backgroundColor: '#4231a4',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    width: 200,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  contentfooter: {
    display: 'flex',
    flexDirection: 'column',
  },
});

export default CVCModal;
