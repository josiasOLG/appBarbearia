import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import typography from '../../../styles/typographys/typography';
import {useSelector} from 'react-redux';

interface PropsProfileCard {
  barber?: any;
}

const ProfileCard: React.FC<PropsProfileCard> = ({barber}) => {
  const user = useSelector((state: any) => state.user);
  return (
    <View style={styles.profileCard}>
      <Image
        source={require('../../../assets/images/back-perfil.jpg')}
        style={styles.barberImage}
      />
      <Text style={[styles.barberName, typography.bold]}>
        {user.user.username}
      </Text>
      <Text style={styles.barberTitle}>{barber.descricao}</Text>
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>2000+</Text>
          <Text style={styles.statLabel}>Clientes</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>5 Anos</Text>
          <Text style={styles.statLabel}>Experiência</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileCard: {
    backgroundColor: 'transparent',
    borderRadius: 10,
    padding: 0,
    alignItems: 'center',
    marginVertical: 0,
    marginBottom: 20,
  },
  barberImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 0,
    marginBottom: 5,
  },
  barberName: {
    fontSize: 24,
    color: '#333',
  },
  barberTitle: {
    fontSize: 18,
    marginVertical: 5,
    color: '#666',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  statItem: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
});

export default ProfileCard;
