import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../../styles/colors/Colors';

interface ServiceItemProps {
  service: string;
  icon: string;
  onPress: () => void;
}

const ServiceItem: React.FC<ServiceItemProps> = ({service, icon, onPress}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Icon name={icon} size={50} color="#fff" />
        </View>
        <Text style={styles.text}>{service}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.user.white,
    padding: 20,
    margin: 10,
    alignItems: 'center',
    width: 150,
  },
  container: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.user.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default ServiceItem;
