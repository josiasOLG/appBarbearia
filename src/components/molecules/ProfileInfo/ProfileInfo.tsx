import React from 'react';
import {View, Text, StyleSheet, Image, ImageSourcePropType} from 'react-native';
import typography from '../../../styles/typographys/typography';

interface ProfileInfoProps {
  name: string;
  description: string;
  description2: string;
  imageUrl: ImageSourcePropType;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({
  name,
  description,
  description2,
  imageUrl,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerText}>
        <Image source={imageUrl} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={[styles.name, typography.bold]}>{name}</Text>
        </View>
      </View>
      <Text style={[styles.description, typography.bold]}>{description}</Text>
      <Text style={[styles.description2, typography.light]}>
        {description2}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    flex: 1,
  },
  containerText: {
    flexDirection: 'row',
    paddingHorizontal: 0,
    alignItems: 'flex-start',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  name: {
    color: '#333',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  description: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
    textAlign: 'left',
  },
  description2: {
    marginTop: 10,
    fontSize: 14,
    color: '#999999',
    textAlign: 'left',
  },
});

export default ProfileInfo;
