import React from 'react';
import {
  View,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import IconBackBlack from '../../../assets/icons/BackBlack.svg';

interface ProfileHeaderProps {
  onBackPress: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({onBackPress}) => {
  return (
    <ImageBackground
      source={require('../../../assets/images/back-perfil.jpg')}
      style={styles.backgroundImage}>
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
        <IconBackBlack color={'#fff'} width={30} height={30} />
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    height: '70%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  backButton: {
    margin: 20,
  },
});

export default ProfileHeader;
