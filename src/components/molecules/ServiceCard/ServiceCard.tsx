import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import typography from '../../../styles/typographys/typography';
import CustomIcon from '../../atoms/Icon/Icon';

interface ServiceCardProps {
  title: string;
  text: string;
  onPress: () => void;
  themeColors: any;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  text,
  onPress,
  themeColors,
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.card, {backgroundColor: themeColors.secondary}]}>
    <View style={styles.colum1}>
      <Text style={[styles.cardTitle, typography.semiBold]}>{title}</Text>
      <Text style={styles.cardText}>{text}</Text>
    </View>
    <View style={styles.colum2}>
      <View
        style={[
          styles.roundedIconSearch,
          {backgroundColor: themeColors.primary},
        ]}>
        <CustomIcon color={'#fff'} size={25} name="plus" type="feather" />
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    height: 100,
    borderRadius: 15,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginVertical: 10,
  },
  colum1: {
    flex: 4,
  },
  colum2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 0,
  },
  cardText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 8,
  },
  roundedIconSearch: {
    borderRadius: 50,
    padding: 10,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ServiceCard;
