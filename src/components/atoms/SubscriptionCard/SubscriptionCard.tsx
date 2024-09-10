import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import typography from '../../../styles/typographys/typography';
import {useSelector} from 'react-redux';
import colors from '../../../styles/colors/Colors';
import CustomIcon from '../Icon/Icon';

interface SubscriptionCardProps {
  title: string;
  description: string;
  iconName: string;
  selected: boolean;
  onPress: () => void;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  title,
  description,
  iconName,
  selected,
  onPress,
}) => {
  const user = useSelector((state: any) => state.user);
  const userRole = user.user.type?.toLowerCase() || 'user';
  const themeColors = colors[userRole] || colors.user;
  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: selected
            ? themeColors.azul_roxo_claro
            : themeColors.white,
          borderColor: selected
            ? themeColors.primary
            : themeColors.azul_roxo_claro,
        },
      ]}
      onPress={onPress}>
      <CustomIcon
        name="calendar-today"
        color={selected ? themeColors.white : themeColors.black}
        size={40}
        type="material"
      />
      <Text
        style={[
          styles.title,
          typography.bold,
          {color: selected ? themeColors.white : themeColors.black},
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.description,
          typography.regular,
          {color: selected ? themeColors.white : themeColors.black},
        ]}>
        {description}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    width: 100,
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  title: {
    fontSize: 14,
    marginBottom: 5,
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 10,
  },
  description: {
    fontSize: 14,
  },
});

export default SubscriptionCard;
