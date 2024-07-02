import React, {forwardRef} from 'react';
import {TextInput, StyleSheet, Text, TextInputProps} from 'react-native';

interface InputFieldProps extends TextInputProps {
  error?: string;
}

const InputField = forwardRef<TextInput, InputFieldProps>(
  ({error, ...props}, ref) => {
    return (
      <>
        <TextInput
          ref={ref}
          style={[styles.input, error && styles.errorInput]}
          {...props}
        />
        {error && <Text style={styles.error}>{error}</Text>}
      </>
    );
  },
);

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
    padding: 15,
    borderRadius: 5,
    marginBottom: 0,
  },
  errorInput: {
    borderColor: 'red',
  },
  error: {
    color: 'red',
    marginBottom: 12,
  },
});

export default InputField;
