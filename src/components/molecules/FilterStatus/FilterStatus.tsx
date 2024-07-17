import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Button from '../../atoms/Button/Button';

interface FilterProps {
  onFilterChange: (filter: string) => void;
  themeColors: any;
}

const FilterStatus: React.FC<FilterProps> = ({onFilterChange, themeColors}) => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const handlePress = (filter: string) => {
    setSelectedFilter(filter);
    onFilterChange(filter);
  };

  return (
    <View style={styles.filterContainer}>
      <Button
        title="Hoje"
        iconName="calendar-today"
        iconType="material-community"
        backgroundColor={
          selectedFilter === 'today' ? '#4F6D7A' : themeColors.primary
        }
        onPress={() => handlePress('today')}
      />
      <Button
        title="Semana"
        iconName="calendar-week"
        iconType="material-community"
        backgroundColor={
          selectedFilter === 'week' ? '#4F6D7A' : themeColors.primary
        }
        onPress={() => handlePress('week')}
      />
      <Button
        title="Mês"
        iconName="calendar-month"
        iconType="material-community"
        backgroundColor={
          selectedFilter === 'month' ? '#4F6D7A' : themeColors.primary
        }
        onPress={() => handlePress('month')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
});

export default FilterStatus;
