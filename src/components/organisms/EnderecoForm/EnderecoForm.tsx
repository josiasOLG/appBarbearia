import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {useForm, SubmitHandler} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useSelector, useDispatch} from 'react-redux';
import FormField from '../../molecules/FormField/FormField';
import IconButton from '../../atoms/Icon/IconButton';
import {useNavigation} from '@react-navigation/native';
import {getAddressByUserId, updateAddress} from '../../../api/AddressService';
import typography from '../../../styles/typographys/typography';
import colors from '../../../styles/colors/Colors';
import {
  hideLoading,
  showLoading,
} from '../../../store/reducers/loading.reducer';

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
  phoneNumber: string;
  cpf: string;
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
  phoneNumber: yup.string().required('Telefone é obrigatório'),
  cpf: yup.string().required('CPF é obrigatório'),
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
  const dispatch = useDispatch();
  const userRole = user.user.type?.toLowerCase() || 'user';
  const themeColors = colors[userRole] || colors.user;
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
          setValue('phoneNumber', address.phoneNumber);
          setValue('cpf', address.cpf);
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
    dispatch(showLoading('Cadastrando endereço...'));
    try {
      await updateAddress(user.user.id, data);
      dispatch(hideLoading());
    } catch (error: any) {
      console.log(error);
      dispatch(hideLoading());
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
      <View style={styles.row}>
        <View style={styles.cardSmall}>
          <FormField
            control={control}
            name="cpf"
            label="CPF"
            error={errors.cpf?.message}
            placeholder="CPF"
            keyboardType="phone-pad"
            maskType="cpf"
            labelColor="#6e6e6e"
            colorText="#333"
            backgroundColor="#fff"
            inputStyle={styles.input}
            labelStyle={styles.label}
          />
        </View>

        <View style={styles.cardSmall}>
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
            labelColor="#6e6e6e"
            colorText="#333"
            backgroundColor="#fff"
            inputStyle={styles.input}
            labelStyle={styles.label}
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.cardSmall}>
          <FormField
            control={control}
            name="zipCode"
            label="CEP"
            error={errors.zipCode?.message}
            keyboardType="numeric"
            placeholder="CEP (00000-000)"
            maskType="custom"
            options={{
              mask: '99999-999',
            }}
            labelColor="#6e6e6e"
            colorText="#333"
            backgroundColor="#fff"
            inputStyle={styles.input}
            labelStyle={styles.label}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cardSmall}>
          <FormField
            control={control}
            label="Endereço"
            name="street"
            error={errors.street?.message}
            placeholder="Endereço"
            labelColor="#6e6e6e"
            colorText="#333"
            backgroundColor="#fff"
            inputStyle={styles.input}
            labelStyle={styles.label}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cardSmall}>
          <FormField
            control={control}
            name="number"
            label="Número"
            error={errors.number?.message}
            placeholder="Número"
            labelColor="#6e6e6e"
            colorText="#333"
            backgroundColor="#fff"
            inputStyle={styles.input}
            labelStyle={styles.label}
          />
        </View>

        <View style={styles.cardSmall}>
          <FormField
            control={control}
            label="Complemento"
            name="complement"
            labelColor="#6e6e6e"
            error={errors.complement?.message}
            placeholder="Complemento"
            colorText="#333"
            backgroundColor="#fff"
            inputStyle={styles.input}
            labelStyle={styles.label}
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.cardSmall}>
          <FormField
            control={control}
            name="locality"
            label="Bairro"
            error={errors.locality?.message}
            placeholder="Bairro"
            labelColor="#6e6e6e"
            colorText="#333"
            backgroundColor="#fff"
            inputStyle={styles.input}
            labelStyle={styles.label}
          />
        </View>

        <View style={styles.cardSmall}>
          <FormField
            control={control}
            name="city"
            label="Cidade"
            error={errors.city?.message}
            placeholder="Cidade"
            labelColor="#6e6e6e"
            colorText="#333"
            backgroundColor="#fff"
            inputStyle={styles.input}
            labelStyle={styles.label}
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.cardSmall}>
          <FormField
            control={control}
            name="state"
            label="Estado"
            error={errors.state?.message}
            placeholder="Estado"
            labelColor="#6e6e6e"
            colorText="#333"
            backgroundColor="#fff"
            inputStyle={styles.input}
            labelStyle={styles.label}
          />
        </View>

        <View style={styles.cardSmall}>
          <FormField
            control={control}
            name="country"
            label="País"
            error={errors.country?.message}
            placeholder="País"
            labelColor="#6e6e6e"
            colorText="#333"
            backgroundColor="#fff"
            inputStyle={styles.input}
            labelStyle={styles.label}
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <IconButton
          text="Cadastrar Endereço"
          onPress={handleSubmit(handleRegister)}
          iconName="map-marker"
          textColor="#fff"
          style={{
            backgroundColor: themeColors.primary,
            paddingVertical: 20,
          }}
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  cardSmall: {
    flex: 1,
    backgroundColor: 'transparent',
    borderRadius: 8,
    marginRight: 8,
  },
  cardLarge: {
    flex: 2,
    backgroundColor: 'transparent',
    borderRadius: 8,
    marginLeft: 8,
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
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 13,
    borderWidth: 1,
    borderColor: '#ccc',
    ...typography.regular,
    shadowColor: '#e3e3e3',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3, // Android shadow
  },
  label: {
    fontSize: 12,
    color: '#6e6e6e',
    ...typography.light,
  },
});

export default EnderecoForm;
