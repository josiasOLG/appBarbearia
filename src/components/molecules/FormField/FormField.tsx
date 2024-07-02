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
  ...props
}) => {
  const inputCustomStyle = {
    color: colorText,
    backgroundColor: backgroundColor,
  };

  const labelCustomStyle = {
    color: labelColor,
  };

  return (
    <View style={containerStyle}>
      {label && (
        <Text style={[styles.label, labelCustomStyle, typography.bold]}>
          {label}
        </Text>
      )}
      <Controller
        control={control}
        name={name}
        render={({field: {onChange, onBlur, value}}) =>
          maskType ? (
            <TextInputMask
              type={maskType}
              options={options}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              customTextInput={InputField}
              customTextInputProps={{
                error: error,
                ...props,
                style: [styles.input, inputCustomStyle, inputStyle],
              }}
            />
          ) : (
            <InputField
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={error}
              style={[styles.input, inputCustomStyle, inputStyle]}
              {...props}
            />
          )
        }
      />
    </View>
  );
};

export default FormField;

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    color: '#333',
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
    padding: 15,
    borderRadius: 5,
  },
});
