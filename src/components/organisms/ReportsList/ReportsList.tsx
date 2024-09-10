import React from 'react';
import {View, StyleSheet} from 'react-native';
import ReportCard from '../../molecules/ReportCard/ReportCard';

interface ReportsListProps {
  reports: Array<{
    title: string;
    description: string;
    onPress: () => void;
    iconName: string;
  }>;
  themeColors?: any;
}

const ReportsList: React.FC<ReportsListProps> = ({reports, themeColors}) => {
  return (
    <View style={styles.container}>
      {reports.map((report, index) => (
        <View style={styles.cardContainer} key={index}>
          <ReportCard
            title={report.title}
            description={report.description}
            onPress={report.onPress}
            iconName={report.iconName}
            themeColors={themeColors}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
    gap: 10,
  },
  cardContainer: {
    width: '48%',
  },
});

export default ReportsList;
