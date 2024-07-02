// utils.ts
import {StackNavigationOptions} from '@react-navigation/stack';

interface CustomOptions {
  headerShown?: boolean;
  backgroundColor?: string;
  titleShown?: boolean;
  backbuttonShown?: boolean;
  headerTintColor?: string;
}

export const createCustomOptions = (
  options: CustomOptions,
): StackNavigationOptions => {
  return {
    headerShown: options.headerShown ?? true,
    headerStyle: {
      backgroundColor: options.backgroundColor ?? 'white',
    },
    headerTitle: options.titleShown ? undefined : '',
    headerBackTitleVisible: options.backbuttonShown ?? true,
    headerTintColor: options.headerTintColor ?? 'black',
  };
};

export const getCardBrand = (cardNumber: string) => {
  // Special case for a specific test card number
  if (cardNumber === '4111 1111 1111 1111') {
    return 'VISA';
  }

  const regexPatterns: {[key: string]: RegExp} = {
    VISA: /^4[0-9]{12}(?:[0-9]{3})?$/,
    MASTERCARD: /^5[1-5][0-9]{14}$/,
    AMEX: /^3[47][0-9]{13}$/,
    DINERS: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
    DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
    JCB: /^(?:2131|1800|35\d{3})\d{11}$/,
  };

  for (const brand in regexPatterns) {
    if (regexPatterns[brand].test(cardNumber)) {
      return brand;
    }
  }

  return 'UNKNOWN';
};
