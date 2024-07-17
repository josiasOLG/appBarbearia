import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import typography from '../../../styles/typographys/typography';

interface ServiceCardProps {
  service: string;
  points: number;
  userPoints: number;
  description: string;
  themeColors: any;
  onRedeem: () => void;
}

const ServiceCardDetailFidelity: React.FC<ServiceCardProps> = ({
  service,
  points,
  userPoints,
  description,
  onRedeem,
  themeColors,
}) => {
  const isUnlocked = userPoints >= points;

  return (
    <View style={styles.cardContainer}>
      <LinearGradient
        colors={[themeColors.secondary, themeColors.primary]}
        style={styles.gradientBackground}>
        <View style={styles.cardContent}>
          <View style={styles.textContainer}>
            <Text style={[styles.serviceText, typography.bold]}>{service}</Text>
            <Text
              style={[
                styles.pointsText,
                typography.bold,
              ]}>{`${points} pontos`}</Text>
          </View>
          <Text style={[styles.descriptionText, typography.light]}>
            {description}
          </Text>
        </View>
      </LinearGradient>
      <View style={styles.cardFooter}>
        <Text
          style={[
            styles.lockText,
            typography.regular,
            {color: isUnlocked ? themeColors.primary : '#333'},
          ]}>
          {isUnlocked ? 'Liberado' : `Faltam ${points - userPoints} pontos`}
        </Text>
        <TouchableOpacity
          style={[
            styles.redeemButton,
            {backgroundColor: isUnlocked ? themeColors.primary : '#cccccc'},
          ]}
          onPress={onRedeem}
          disabled={!isUnlocked}>
          <Text style={{color: '#ffffff'}}>
            {isUnlocked ? `Resgatar por ${points} pontos` : `Indisponível`}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e3e3e3',
  },
  gradientBackground: {
    padding: 15,
  },
  cardContent: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  serviceText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  pointsText: {
    color: '#ffffff',
    fontSize: 14,
    textTransform: 'uppercase',
  },
  descriptionText: {
    color: '#ffffff',
    fontSize: 14,
    marginTop: 5,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  lockText: {
    fontSize: 14,
  },
  redeemButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
    alignItems: 'center',
    backgroundColor: '#333',
  },
});

export default ServiceCardDetailFidelity;
