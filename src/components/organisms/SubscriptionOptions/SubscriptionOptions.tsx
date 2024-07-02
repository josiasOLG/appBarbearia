import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import SubscriptionCard from '../../atoms/SubscriptionCard/SubscriptionCard';

interface SubscriptionOptionsProps {
  options: {id: string; title: string; description: string}[];
  onOptionSelect: (id: string) => void;
}

const SubscriptionOptions: React.FC<SubscriptionOptionsProps> = ({
  options,
  onOptionSelect,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelect = (item: any) => {
    setSelectedOption(item.id);
    onOptionSelect(item);
  };

  return (
    <View style={styles.container}>
      {options.map(option => (
        <SubscriptionCard
          key={option.id}
          title={option.title}
          description={option.description}
          selected={selectedOption === option.id}
          iconName={option.icon}
          onPress={() => handleSelect(option)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
});

export default SubscriptionOptions;
