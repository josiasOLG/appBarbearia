// utils.ts
import {StackNavigationOptions} from '@react-navigation/stack';
import moment from 'moment';

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

export const formatDateToBrazilianPortuguese = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('pt-BR', {month: 'long'});
  const year = date.getFullYear();
  return `${day} de ${month} de ${year}`;
};

export const generateTimeSlots = (
  startTime: string,
  endTime: string,
  interval: string,
  lunchStartTime: string,
  lunchEndTime: string,
) => {
  const slots = [];
  let current = moment(startTime, 'HH:mm');
  const end = moment(endTime, 'HH:mm');
  const lunchStart = moment(lunchStartTime, 'HH:mm');
  const lunchEnd = moment(lunchEndTime, 'HH:mm');
  const intervalDuration = moment.duration(interval);

  while (current.isBefore(end)) {
    if (current.isBefore(lunchStart) || current.isAfter(lunchEnd)) {
      slots.push(current.format('HH:mm'));
    }
    current.add(intervalDuration);
  }

  return slots;
};

export const getCurrentTime = (): string => {
  const now = moment();
  return now.format('HH:mm');
};

export const isTimeDisabled = (
  currentTime: string,
  time: string,
  selectedDate: string,
): boolean => {
  const now = moment();
  const selectedDateTime = moment(
    selectedDate + ' ' + time,
    'YYYY-MM-DD HH:mm',
  );
  const currentDateTime = moment(
    now.format('YYYY-MM-DD') + ' ' + currentTime,
    'YYYY-MM-DD HH:mm',
  );

  const isToday = now.isSame(moment(selectedDate, 'YYYY-MM-DD'), 'day');

  if (isToday) {
    return (
      selectedDateTime.isBefore(now) ||
      selectedDateTime.diff(currentDateTime, 'minutes') < 10
    );
  } else {
    return false;
  }
};

export const handleTimePress = (
  currentTime: string,
  time: string,
  setSelectedTime: (time: string) => void,
  onTimeSelect: (time: string) => void,
): void => {
  const now = moment();
  const selectedDateTime = moment(time, 'HH:mm');
  const currentDateTime = moment(currentTime, 'HH:mm');

  const timeDifference = selectedDateTime.diff(currentDateTime, 'minutes');

  if (timeDifference >= 0 && timeDifference >= 10) {
    setSelectedTime(time);
    onTimeSelect(time);
  }
};
