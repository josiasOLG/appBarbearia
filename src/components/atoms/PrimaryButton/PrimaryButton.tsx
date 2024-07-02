import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import typography from '../../../styles/typographys/typography';
import {useSelector} from 'react-redux';
import colors from '../../../styles/colors/Colors';

interface PrimaryButtonProps {
  onPress: () => void;
  text: string;
  iconName?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  onPress,
  text,
  iconName,
}) => {
  const service = useSelector((state: any) => state.service);
  const userRole = service.selectedService?.toLowerCase() || 'user';
  const themeColors = colors[userRole] || colors.user;

  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor: themeColors.secondary}]}
      onPress={onPress}>
      {iconName && (
        <Icon name={iconName} size={20} color="#fff" style={styles.icon} />
      )}
      <Text style={[styles.text, typography.semiBold]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4231a4',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    paddingVertical: 20,
  },
  icon: {
    marginRight: 10,
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
});

export default PrimaryButton;
