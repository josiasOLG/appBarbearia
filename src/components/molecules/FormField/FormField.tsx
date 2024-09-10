import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {Controller, Control} from 'react-hook-form';
import {TextInputMask, TextInputMaskProps} from 'react-native-masked-text';
import Label from '../../atoms/Label/Label';
import InputField from '../../atoms/InputField/InputField';
import typography from '../../../styles/typographys/typography';

interface AddressFormData {
  phoneCountry: string;
  phoneArea: string;
  phoneNumber: string;
  addressStreet: string;
  addressNumber: string;
  addressComplement?: string;
  addressLocality: string;
  addressCity: string;
  addressRegionCode: string;
  addressCountry: string;
  addressPostalCode: string;
}

interface FormFieldProps {
  control: Control<any>;
  name: keyof AddressFormData;
  label: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  error?: string;
  maskType?: TextInputMaskProps['type'];
  options?: TextInputMaskProps['options'];
  colorText?: string;
  backgroundColor?: string;
  labelColor?: string;
  inputStyle?: TextStyle;
  containerStyle?: ViewStyle;
  defaultValue?: string;
  disabled?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  control,
  name,
  label,
  error,
  maskType,
  options,
  colorText,
  backgroundColor,
  labelColor,
  inputStyle,
  containerStyle,
  defaultValue,
  disabled,
  ...props
}) => {
  const inputCustomStyle = {
    color: colorText,
    backgroundColor: disabled ? '#d3d3d3' : backgroundColor,
  };

  const labelCustomStyle = {
    color: labelColor,
  };

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label && (
        <Text style={[styles.label, labelCustomStyle, typography.bold]}>
          {label}
        </Text>
      )}
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          name={name}
          defaultValue={defaultValue} // Set default value
          render={({field: {onChange, onBlur, value}}) =>
            maskType ? (
              <TextInputMask
                type={maskType}
                options={options}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value ?? defaultValue} // Ensure defaultValue is used
                customTextInput={InputField}
                customTextInputProps={{
                  error: error,
                  editable: !disabled,
                  ...props,
                  style: [styles.input, inputCustomStyle, inputStyle],
                }}
              />
            ) : (
              <InputField
                onBlur={onBlur}
                onChangeText={onChange}
                value={value ?? defaultValue} // Ensure defaultValue is used
                error={error}
                editable={!disabled}
                style={[styles.input, inputCustomStyle, inputStyle]}
                {...props}
              />
            )
          }
        />
      </View>
    </View>
  );
};

export default FormField;

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 0,
  },
  label: {
    fontSize: 13,
    marginTop: 0,
    marginBottom: 5,
    color: '#333',
    ...typography.regular,
  },
  inputContainer: {
    position: 'relative',
  },

  input: {
    fontSize: 13,
    borderWidth: 1,
    borderColor: '#333',
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#fff', // Background color for input
  },
});
