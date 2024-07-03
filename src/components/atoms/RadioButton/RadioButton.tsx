import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import colors from '../../../styles/colors/Colors';

interface RadioButtonProps {
  selected: boolean;
  onPress: () => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({selected, onPress}) => {
  const user = useSelector((state: any) => state.user);
  const service = useSelector((state: any) => state.service);
  const userRole = user.user.type?.toLowerCase() || 'user';
  const themeColors = colors[userRole] || colors.user;
  return (
    <TouchableOpacity style={styles.radio} onPress={onPress}>
      {selected && (
        <Icon name="check" size={30} color={themeColors.secondary} />
      )}
      {!selected && (
        <Icon name="circle-o" size={30} color={themeColors.primary} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  radio: {
    padding: 10,
  },
});

export default RadioButton;
