import React from 'react';
import {View, Text, StyleSheet, Image, ImageSourcePropType} from 'react-native';
import typography from '../../../styles/typographys/typography';
import {useSelector} from 'react-redux';
import colors from '../../../styles/colors/Colors';

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
  const user = useSelector((state: any) => state.user);
  const service = useSelector((state: any) => state.service);
  const userRole = user.user.type?.toLowerCase() || 'user';
  const themeColors = colors[userRole] || colors.user;

  return (
    <View style={[styles.container, {backgroundColor: themeColors.primary}]}>
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

    marginBottom: 20,
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
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  description: {
    marginTop: 10,
    fontSize: 16,
    color: '#fff',
    textAlign: 'left',
  },
  description2: {
    marginTop: 10,
    fontSize: 14,
    color: '#fff',
    textAlign: 'left',
  },
});

export default ProfileInfo;
