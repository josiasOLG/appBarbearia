import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Calendar as RNCalendar, LocaleConfig} from 'react-native-calendars';
import {useSelector} from 'react-redux';
import colors from '../../../styles/colors/Colors';

// Configurar a localização para português do Brasil
LocaleConfig.locales['pt-br'] = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],
  monthNamesShort: [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ],
  dayNames: [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
  ],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  today: 'Hoje',
};
LocaleConfig.defaultLocale = 'pt-br';

interface CalendarProps {
  onDateSelect: (date: string) => void;
  blockedDates?: string[]; // Adicionando a propriedade blockedDates com valor padrão
}

const Calendar: React.FC<CalendarProps> = ({
  onDateSelect,
  blockedDates = [],
}) => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const user = useSelector((state: any) => state.user);
  const service = useSelector((state: any) => state.service);
  const userRole = user.user.type?.toLowerCase() || 'user';
  const themeColors = colors[userRole] || colors.user;

  const handleDayPress = (day: any) => {
    const today = new Date().toISOString().split('T')[0];
    if (day.dateString >= today && !blockedDates.includes(day.dateString)) {
      setSelectedDate(day.dateString);
      onDateSelect(day.dateString);
    }
  };

  // Marcar as datas bloqueadas
  const markedDates = (blockedDates || []).reduce((acc, date) => {
    acc[date] = {
      customStyles: {
        container: {
          backgroundColor: themeColors.secondary,
        },
        text: {
          color: themeColors.white,
          fontWeight: 'bold',
        },
      },
      disabled: true,
      disableTouchEvent: true,
    };
    return acc;
  }, {});

  // Marcar a data selecionada
  if (selectedDate) {
    markedDates[selectedDate] = {
      customStyles: {
        container: {
          backgroundColor: themeColors.primary,
        },
        text: {
          color: themeColors.white,
          fontWeight: 'bold',
        },
      },
    };
  }

  return (
    <View style={styles.container}>
      <RNCalendar
        onDayPress={handleDayPress}
        style={styles.calendar}
        theme={{
          backgroundColor: '#fff',
          calendarBackground: '#fff',
          textSectionTitleColor: themeColors.primary,
          textSectionTitleDisabledColor: themeColors.secondary,
          selectedDayBackgroundColor: themeColors.primary,
          selectedDayTextColor: themeColors.white,
          todayTextColor: themeColors.primary,
          dayTextColor: themeColors.black,
          textDisabledColor: themeColors.secondary,
          dotColor: themeColors.primary,
          selectedDotColor: themeColors.white,
          arrowColor: themeColors.accent,
          disabledArrowColor: themeColors.secondary,
          monthTextColor: themeColors.primary,
          indicatorColor: themeColors.primary,
          textDayFontFamily: 'monospace',
          textMonthFontFamily: 'monospace',
          textDayHeaderFontFamily: 'monospace',
          textDayFontWeight: '300',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '300',
          textDayfontSize: 14,
          textMonthfontSize: 14,
          textDayHeaderfontSize: 14,
        }}
        markingType={'custom'}
        markedDates={markedDates}
        minDate={new Date().toISOString().split('T')[0]} // Definir a data mínima para hoje
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  calendar: {
    borderWidth: 1,
    borderColor: 'transparent',
    height: 350,
    borderRadius: 10,
  },
});

export default Calendar;
