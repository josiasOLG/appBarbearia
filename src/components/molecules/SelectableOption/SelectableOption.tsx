import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import typography from '../../../styles/typographys/typography';
import {useSelector} from 'react-redux';
import colors from '../../../styles/colors/Colors';

interface SelectableOptionProps {
  icon: any;
  text: string;
  selected: boolean;
  onPress: () => void;
}

const SelectableOption: React.FC<SelectableOptionProps> = ({
  icon,
  text,
  selected,
  onPress,
}) => {
  const service = useSelector((state: any) => state.service);
  const userRole = service.selectedService?.toLowerCase() || 'user';
  const themeColors = colors[userRole] || colors.user;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: selected
            ? themeColors.primary
            : themeColors.secondary,
        },
      ]}
      onPress={onPress}>
      <Icon
        name={icon}
        size={35}
        color={themeColors.white}
        style={selected && styles.selectedIcon}
      />
      <Text
        style={[styles.text, typography.regular, {color: themeColors.white}]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    rowGap: 5,
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#e7e7e7b3',
  },
  selectedIcon: {
    color: '#fff',
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
});

export default SelectableOption;
