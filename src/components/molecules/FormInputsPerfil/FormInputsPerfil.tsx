import React from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {TextInputMask} from 'react-native-masked-text';

interface FormInputsProps {
  name: string;
  setName: (text: string) => void;
  description: string;
  setDescription: (text: string) => void;
  certifications: string;
  setCertifications: (text: string) => void;
  startTime: string;
  setStartTime: (text: string) => void;
  lunchStartTime: string;
  setLunchStartTime: (text: string) => void;
  lunchEndTime: string;
  setLunchEndTime: (text: string) => void;
  endTime: string;
  setEndTime: (text: string) => void;
  interval: string;
  setInterval: (text: string) => void;
}

const schema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  description: yup.string().required('Descrição é obrigatória'),
  certifications: yup.string(),
  startTime: yup
    .string()
    .required('Hora Entrada é obrigatória')
    .matches(/^\d{2}:\d{2}$/, 'Hora inválida'),
  lunchStartTime: yup
    .string()
    .required('Hora Almoço é obrigatória')
    .matches(/^\d{2}:\d{2}$/, 'Hora inválida'),
  lunchEndTime: yup
    .string()
    .required('Hora Chegada Almoço é obrigatória')
    .matches(/^\d{2}:\d{2}$/, 'Hora inválida'),
  endTime: yup
    .string()
    .required('Hora Saída é obrigatória')
    .matches(/^\d{2}:\d{2}$/, 'Hora inválida'),
  interval: yup
    .string()
    .required('Intervalo entre os Cortes é obrigatório')
    .matches(/^\d{2}:\d{2}$/, 'Hora inválida'),
});

const FormInputs: React.FC<FormInputsProps> = ({
  name,
  setName,
  description,
  setDescription,
  certifications,
  setCertifications,
  startTime,
  setStartTime,
  lunchStartTime,
  setLunchStartTime,
  lunchEndTime,
  setLunchEndTime,
  endTime,
  setEndTime,
  interval,
  setInterval,
}) => {
  const {
    control,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name,
      description,
      certifications,
      startTime,
      lunchStartTime,
      lunchEndTime,
      endTime,
      interval,
    },
  });

  return (
    <View>
      <Controller
        control={control}
        name="name"
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            placeholder="Nome"
            placeholderTextColor="#aaa"
            value={value}
            onBlur={onBlur}
            onChangeText={text => {
              setName(text);
              onChange(text);
            }}
          />
        )}
      />
      {errors.name && (
        <Text style={styles.errorText}>{errors.name.message}</Text>
      )}

      <Controller
        control={control}
        name="description"
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Descrição"
            placeholderTextColor="#aaa"
            value={value}
            onBlur={onBlur}
            onChangeText={text => {
              setDescription(text);
              onChange(text);
            }}
            multiline={true}
          />
        )}
      />
      {errors.description && (
        <Text style={styles.errorText}>{errors.description.message}</Text>
      )}

      <Controller
        control={control}
        name="certifications"
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Adicionar Certificações (um por linha)"
            placeholderTextColor="#aaa"
            value={value}
            onBlur={onBlur}
            onChangeText={text => {
              setCertifications(text);
              onChange(text);
            }}
            multiline={true}
          />
        )}
      />

      <View style={styles.row}>
        <Controller
          control={control}
          name="startTime"
          render={({field: {onChange, onBlur, value}}) => (
            <TextInputMask
              type={'datetime'}
              options={{
                format: 'HH:mm',
              }}
              style={[styles.input, styles.halfInput]}
              placeholder="Hora Entrada"
              placeholderTextColor="#aaa"
              value={value}
              onBlur={onBlur}
              onChangeText={text => {
                setStartTime(text);
                onChange(text);
              }}
            />
          )}
        />
        {errors.startTime && (
          <Text style={styles.errorText}>{errors.startTime.message}</Text>
        )}

        <Controller
          control={control}
          name="lunchStartTime"
          render={({field: {onChange, onBlur, value}}) => (
            <TextInputMask
              type={'datetime'}
              options={{
                format: 'HH:mm',
              }}
              style={[styles.input, styles.halfInput]}
              placeholder="Hora Almoço"
              placeholderTextColor="#aaa"
              value={value}
              onBlur={onBlur}
              onChangeText={text => {
                setLunchStartTime(text);
                onChange(text);
              }}
            />
          )}
        />
        {errors.lunchStartTime && (
          <Text style={styles.errorText}>{errors.lunchStartTime.message}</Text>
        )}
      </View>

      <View style={styles.row}>
        <Controller
          control={control}
          name="lunchEndTime"
          render={({field: {onChange, onBlur, value}}) => (
            <TextInputMask
              type={'datetime'}
              options={{
                format: 'HH:mm',
              }}
              style={[styles.input, styles.halfInput]}
              placeholder="Hora Chegada Almoço"
              placeholderTextColor="#aaa"
              value={value}
              onBlur={onBlur}
              onChangeText={text => {
                setLunchEndTime(text);
                onChange(text);
              }}
            />
          )}
        />
        {errors.lunchEndTime && (
          <Text style={styles.errorText}>{errors.lunchEndTime.message}</Text>
        )}

        <Controller
          control={control}
          name="endTime"
          render={({field: {onChange, onBlur, value}}) => (
            <TextInputMask
              type={'datetime'}
              options={{
                format: 'HH:mm',
              }}
              style={[styles.input, styles.halfInput]}
              placeholder="Hora Saída"
              placeholderTextColor="#aaa"
              value={value}
              onBlur={onBlur}
              onChangeText={text => {
                setEndTime(text);
                onChange(text);
              }}
            />
          )}
        />
        {errors.endTime && (
          <Text style={styles.errorText}>{errors.endTime.message}</Text>
        )}
      </View>

      <Controller
        control={control}
        name="interval"
        render={({field: {onChange, onBlur, value}}) => (
          <TextInputMask
            type={'datetime'}
            options={{
              format: 'HH:mm',
            }}
            style={styles.input}
            placeholder="Intervalo entre os Cortes"
            placeholderTextColor="#aaa"
            value={value}
            onBlur={onBlur}
            onChangeText={text => {
              setInterval(text);
              onChange(text);
            }}
          />
        )}
      />
      {errors.interval && (
        <Text style={styles.errorText}>{errors.interval.message}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  halfInput: {
    flex: 1,
    marginHorizontal: 0,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default FormInputs;
