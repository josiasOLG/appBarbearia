import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import CustomIcon from '../../atoms/Icon/Icon';
import typography from '../../../styles/typographys/typography';

interface ReportCardProps {
  title: string;
  description: string;
  onPress: () => void;
  iconName: string;
  themeColors?: any;
}

const ReportCard: React.FC<ReportCardProps> = ({
  title,
  description,
  onPress,
  iconName,
  themeColors,
}) => {
  return (
    <TouchableOpacity
      style={[styles.card, {backgroundColor: themeColors.white}]}
      onPress={onPress}>
      <View style={styles.iconContainer}>
        <CustomIcon name={iconName} size={30} color="#333" />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.title, typography.bold]}>{title}</Text>
        <Text style={[styles.description, typography.regular]}>
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    height: 180,
    borderRadius: 15,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16, // Adiciona espaçamento entre o ícone e o texto
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    color: '#333',

    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    color: '#333',
    fontSize: 14,
    marginTop: 2,
    textAlign: 'center',
  },
});

export default ReportCard;
