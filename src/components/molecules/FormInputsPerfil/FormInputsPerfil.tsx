import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

interface FormInputsProps {
  name: string;
  setName: (text: string) => void;
  description: string;
  setDescription: (text: string) => void;
  certifications: string;
  setCertifications: (text: string) => void;
}

const FormInputs: React.FC<FormInputsProps> = ({
  name,
  setName,
  description,
  setDescription,
  certifications,
  setCertifications,
}) => {
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor="#aaa"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Descrição"
        placeholderTextColor="#aaa"
        value={description}
        onChangeText={setDescription}
        multiline={true}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Adicionar Certificações (um por linha)"
        placeholderTextColor="#aaa"
        value={certifications}
        onChangeText={setCertifications}
        multiline={true}
      />
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
});

export default FormInputs;
