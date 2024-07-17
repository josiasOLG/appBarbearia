import React from 'react';
import {View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import CustomIcon from '../../atoms/Icon/Icon';
import FormInputs from '../../molecules/FormInputsPerfil/FormInputsPerfil';

interface FormPerfilProps {
  profileImage: string | null;
  requestPermissions: () => void;
  name: string;
  setName: (text: string) => void;
  description: string;
  setDescription: (text: string) => void;
  certifications: string;
  setCertifications: (text: string) => void;
  startTime: string;
  setStartTime: (text: string) => void;
  lunchStartTime: string;
  setLunchStartTime: (text: string) => void;
  lunchEndTime: string;
  setLunchEndTime: (text: string) => void;
  endTime: string;
  setEndTime: (text: string) => void;
  interval: string;
  setInterval: (text: string) => void;
}

const FormPerfil: React.FC<FormPerfilProps> = ({
  profileImage,
  requestPermissions,
  name,
  setName,
  description,
  setDescription,
  certifications,
  setCertifications,
  startTime,
  setStartTime,
  lunchStartTime,
  setLunchStartTime,
  lunchEndTime,
  setLunchEndTime,
  endTime,
  setEndTime,
  interval,
  setInterval,
}) => {
  return (
    <View>
      <View style={styles.profileImageContainer}>
        <TouchableOpacity onPress={requestPermissions}>
          {profileImage ? (
            <Image source={{uri: profileImage}} style={styles.profileImage} />
          ) : (
            <View style={styles.placeholderImage}>
              <CustomIcon name="camera" size={40} color="#aaa" type="feather" />
            </View>
          )}
        </TouchableOpacity>
      </View>
      <FormInputs
        name={name}
        setName={setName}
        description={description}
        setDescription={setDescription}
        certifications={certifications}
        setCertifications={setCertifications}
        startTime={startTime}
        setStartTime={setStartTime}
        lunchStartTime={lunchStartTime}
        setLunchStartTime={setLunchStartTime}
        lunchEndTime={lunchEndTime}
        setLunchEndTime={setLunchEndTime}
        endTime={endTime}
        setEndTime={setEndTime}
        interval={interval}
        setInterval={setInterval}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  placeholderImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FormPerfil;
