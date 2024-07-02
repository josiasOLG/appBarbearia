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
    backgroundColor: colors.user.secondary,
    borderRadius: 10,
    padding: 20,
    margin: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default ServiceItem;
