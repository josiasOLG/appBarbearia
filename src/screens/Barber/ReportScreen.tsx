import React from 'react';
import {View, StyleSheet, ScrollView, StatusBar} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ReportsList from '../../components/organisms/ReportsList/ReportsList';
import {useSelector} from 'react-redux';
import colors from '../../styles/colors/Colors';
import {ReportsService} from '../../api/ReportsService';

const ReportScreen: React.FC = ({navigation}) => {
  const user = useSelector((state: any) => state.user);
  const userRole = user.user.type?.toLowerCase() || 'user';
  const themeColors = colors[userRole] || colors.user;

  const handlePress = async (serviceMethod: any, screenName: string) => {
    const base64 = await serviceMethod(user.user.id);
    navigation.navigate(screenName, {base64});
  };

  const reports = [
    {
      title: 'Clientes',
      description: 'Gerar relatório de clientes',
      onPress: () => handlePress(ReportsService.getClientsPDF, 'PDFViewer'),
      iconName: 'users',
    },
    {
      title: 'Assinaturas',
      description: 'Gerar relatório de assinaturas',
      onPress: () =>
        handlePress(ReportsService.getSubscriptionsPDF, 'PDFViewer'),
      iconName: 'file-text',
    },
    {
      title: 'Agendamentos',
      description: 'Gerar relatório de agendamentos',
      onPress: () =>
        handlePress(ReportsService.getAppointmentsPDF, 'PDFViewer'),
      iconName: 'calendar',
    },
    {
      title: 'Disponibilidade',
      description: 'Gerar relatório de disponibilidade',
      onPress: () =>
        handlePress(ReportsService.getAvailabilityPDF, 'PDFViewer'),
      iconName: 'clock',
    },
    {
      title: 'Serviços',
      description: 'Gerar relatório de serviços',
      onPress: () =>
        handlePress(ReportsService.getServicePointsPDF, 'PDFViewer'),
      iconName: 'scissors',
    },
    {
      title: 'Endereços dos Clientes',
      description: 'Gerar relatório de endereços dos clientes',
      onPress: () =>
        handlePress(ReportsService.getClientAddressesPDF, 'PDFViewer'),
      iconName: 'map-pin',
    },
    {
      title: 'Relatório de Receita',
      description: 'Gerar relatório de receita',
      onPress: () =>
        handlePress(ReportsService.getRevenueReportPDF, 'PDFViewer'),
      iconName: 'bar-chart',
    },
    {
      title: 'Serviços Principais',
      description: 'Gerar relatório de serviços principais',
      onPress: () => handlePress(ReportsService.getTopServicesPDF, 'PDFViewer'),
      iconName: 'star',
    },
    {
      title: 'Despesas',
      description: 'Gerar relatório de despesas',
      onPress: () => handlePress(ReportsService.getExpensesPDF, 'PDFViewer'),
      iconName: 'dollar-sign',
    },
    {
      title: 'Receita por Cliente',
      description: 'Gerar relatório de receita por cliente',
      onPress: () =>
        handlePress(ReportsService.getRevenueByClientPDF, 'PDFViewer'),
      iconName: 'user-check',
    },
  ];

  return (
    <LinearGradient
      colors={[themeColors.primary, themeColors.primary]}
      style={styles.gradient}>
      <StatusBar backgroundColor={themeColors.primary} />
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.bottomSection}>
          <ReportsList reports={reports} themeColors={themeColors} />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  bottomSection: {
    flex: 1,
    padding: 20,
  },
});

export default ReportScreen;
