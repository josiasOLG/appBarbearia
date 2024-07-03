import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import typography from '../../../styles/typographys/typography';
import {useSelector} from 'react-redux';
import colors from '../../../styles/colors/Colors';

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
  const service = useSelector((state: any) => state.service);
  const userRole = user.user.type?.toLowerCase() || 'user';
  const themeColors = colors[userRole] || colors.user;
  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: selected
            ? themeColors.primary
            : themeColors.secondary,
        },
      ]}
      onPress={onPress}>
      <View style={styles.iconColumn}>
        <Icon name={iconName} size={40} color="#fff" />
      </View>
      <View style={styles.textColumn}>
        <Text style={[styles.title, typography.bold]}>{title}</Text>
        <Text style={[styles.description, typography.light]}>
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    height: 100,
    borderRadius: 15,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginVertical: 10,
    alignItems: 'center',
  },
  iconColumn: {
    marginRight: 20,
  },
  textColumn: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 5,
  },
  description: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SubscriptionCard;
