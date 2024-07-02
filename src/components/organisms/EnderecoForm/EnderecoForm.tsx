import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {useForm, SubmitHandler} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useSelector} from 'react-redux';
import FormField from '../../molecules/FormField/FormField';
import IconButton from '../../atoms/Icon/IconButton';
import {useNavigation} from '@react-navigation/native';
import {getAddressByUserId, updateAddress} from '../../../api/AddressService';

interface AddressFormData {
  id?: string;
  street: string;
  number: string;
  complement?: string;
  locality: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  phoneNumber: string; // Adicionado o campo phoneNumber
  cpf: string; // Adicionado o campo phoneNumber
}

const schema = yup.object().shape({
  street: yup.string().required('Rua é obrigatória'),
  number: yup.string().required('Número é obrigatório'),
  complement: yup.string(),
  locality: yup.string().required('Bairro é obrigatório'),
  city: yup.string().required('Cidade é obrigatória'),
  state: yup.string().required('Estado é obrigatório'),
  country: yup.string().required('País é obrigatório'),
  zipCode: yup.string().required('CEP é obrigatório'),
  phoneNumber: yup.string().required('Telefone é obrigatório'), // Adicionada validação do telefone
  cpf: yup.string().required('CPF é obrigatório'), // Adicionada validação do telefone
});

const EnderecoForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm<AddressFormData>({resolver: yupResolver(schema)});
  const navigation = useNavigation();
  const user = useSelector((state: any) => state.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const addressData = await getAddressByUserId(user.user.id);
        if (addressData.length > 0) {
          const address = addressData[0];
          setValue('id', address._id);
          setValue('complement', address.complement);
          setValue('country', address.country);
          setValue('locality', address.locality);
          setValue('number', address.number);
          setValue('state', address.state);
          setValue('city', address.city);
          setValue('street', address.street);
          setValue('zipCode', address.zipCode);
          setValue('phoneNumber', address.phoneNumber); // Adiciona o valor do telefone
          setValue('cpf', address.cpf); // Adiciona o valor do telefone
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAddress();
  }, [user.user.id, setValue]);

  const handleRegister: SubmitHandler<AddressFormData> = async data => {
    try {
      await updateAddress(user.user.id, data);
    } catch (error: any) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <FormField
          control={control}
          name="cpf"
          label="CPF"
          error={errors.cpf?.message}
          placeholder="CPF"
          keyboardType="phone-pad"
          maskType="cpf"
          labelColor="#f0f0f0"
          colorText="#333"
          backgroundColor="#f0f0f0"
          inputStyle={{borderColor: '#000'}}
        />
      </View>

      <View style={styles.card}>
        <FormField
          control={control}
          name="phoneNumber"
          label="Telefone"
          error={errors.phoneNumber?.message}
          placeholder="Telefone"
          keyboardType="phone-pad"
          maskType="custom"
          options={{
            mask: '(99) 99999-9999',
          }}
          labelColor="#f0f0f0"
          colorText="#333"
          backgroundColor="#f0f0f0"
          inputStyle={{borderColor: '#000'}}
        />
      </View>

      <View style={styles.card}>
        <FormField
          control={control}
          name="zipCode"
          label="CEP (00000-000)"
          error={errors.zipCode?.message}
          keyboardType="numeric"
          placeholder="CEP (00000-000)"
          maskType="custom"
          options={{
            mask: '99999-999',
          }}
          labelColor="#f0f0f0"
          colorText="#333"
          backgroundColor="#f0f0f0"
          inputStyle={{borderColor: '#000'}}
        />
      </View>
      <View style={styles.card}>
        <FormField
          control={control}
          label="Endereço"
          name="street"
          error={errors.street?.message}
          placeholder="Endereço"
          labelColor="#f0f0f0"
          colorText="#333"
          backgroundColor="#f0f0f0"
          inputStyle={{borderColor: '#000'}}
        />
      </View>
      <View style={styles.card}>
        <FormField
          control={control}
          name="number"
          label="Número"
          error={errors.number?.message}
          placeholder="Número"
          labelColor="#f0f0f0"
          colorText="#333"
          backgroundColor="#f0f0f0"
          inputStyle={{borderColor: '#000'}}
        />
      </View>
      <View style={styles.card}>
        <FormField
          control={control}
          label="Complemento"
          name="complement"
          labelColor="#f0f0f0"
          error={errors.complement?.message}
          placeholder="Complemento"
          colorText="#333"
          backgroundColor="#f0f0f0"
          inputStyle={{borderColor: '#000'}}
        />
      </View>
      <View style={styles.card}>
        <FormField
          control={control}
          name="locality"
          label="Bairro"
          error={errors.locality?.message}
          placeholder="Bairro"
          labelColor="#f0f0f0"
          colorText="#333"
          backgroundColor="#f0f0f0"
          inputStyle={{borderColor: '#000'}}
        />
      </View>
      <View style={styles.card}>
        <FormField
          control={control}
          name="city"
          label="Cidade"
          error={errors.city?.message}
          placeholder="Cidade"
          labelColor="#f0f0f0"
          colorText="#333"
          backgroundColor="#f0f0f0"
          inputStyle={{borderColor: '#000'}}
        />
      </View>
      <View style={styles.card}>
        <FormField
          control={control}
          name="state"
          label="Estado"
          error={errors.state?.message}
          placeholder="Estado"
          labelColor="#f0f0f0"
          colorText="#333"
          backgroundColor="#f0f0f0"
          inputStyle={{borderColor: '#000'}}
        />
      </View>
      <View style={styles.card}>
        <FormField
          control={control}
          name="country"
          label="País"
          error={errors.country?.message}
          placeholder="País"
          labelColor="#f0f0f0"
          colorText="#333"
          backgroundColor="#f0f0f0"
          inputStyle={{borderColor: '#000'}}
        />
      </View>

      <View style={styles.buttonContainer}>
        <IconButton
          text="Cadastrar Endereço"
          onPress={handleSubmit(handleRegister)}
          iconName="map-marker"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 0,
  },
  card: {
    backgroundColor: 'transparent',
    borderRadius: 8,
    marginBottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginVertical: 16,
    backgroundColor: '#fff',
    borderRadius: 15,
  },
});

export default EnderecoForm;
