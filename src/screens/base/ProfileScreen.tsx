import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  Platform,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../styles/colors/Colors';
import {launchImageLibrary} from 'react-native-image-picker';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {UserService} from '../../api/UserService';
import FormPerfil from '../../components/organisms/FormPerfil/FormPerfil';
import LoadingModal from '../../components/organisms/LoadingModal/LoadingModal';
import {updateProfile} from '../../store/reducers/user.reducer';

const ProfileScreen: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const userRole = user?.user.type?.toLowerCase() || 'user';
  const themeColors = colors[userRole] || colors.user;

  const [profileImage, setProfileImage] = useState<string | null>(
    user.user.profileImage || null,
  );

  const [name, setName] = useState(user.user.username || '');
  const [description, setDescription] = useState(user.user.descricao || '');
  const [certifications, setCertifications] = useState<string>(
    user.user.certificacoes || '',
  );
  const [startTime, setStartTime] = useState(user.user.startTime || '');
  const [lunchStartTime, setLunchStartTime] = useState(
    user.user.lunchStartTime || '',
  );
  const [lunchEndTime, setLunchEndTime] = useState(
    user.user.lunchEndTime || '',
  );
  const [endTime, setEndTime] = useState(user.user.endTime || '');
  const [interval, setInterval] = useState(user.user.interval || '');
  const [loading, setLoading] = useState(false);

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      let granted;
      if (Platform.Version >= 33) {
        granted = await request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
      } else {
        granted = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      }
      granted = await request(PERMISSIONS.ANDROID.CAMERA);

      pickImage();
    }
  };

  const pickImage = () => {
    launchImageLibrary({}, (response: any) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const uri = response.assets && response.assets[0]?.uri;
        if (uri) {
          setProfileImage(uri);
        }
      }
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const profileData = {
        name: name,
        descricao: description,
        certificacoes: certifications,
        startTime: startTime,
        lunchStartTime: lunchStartTime,
        lunchEndTime: lunchEndTime,
        endTime: endTime,
        interval: interval,
      };

      const response = await UserService.updateProfile(
        user.user.id,
        profileData,
      );

      if (response.data) {
        dispatch(updateProfile(response.data));
      }
    } catch (error) {
      console.error('Failed to update profile', error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async () => {
    // if (!profileImage) return;
    // setLoading(true);
    // try {
    //   const formData = new FormData();
    //   formData.append('profileImage', {
    //     uri: profileImage,
    //     type: 'image/jpeg',
    //     name: 'profile.jpg',
    //   });
    //   const response = await UserService.uploadProfileImage(user.user.id, formData);
    //   if (response.data) {
    //     dispatch({type: 'UPDATE_USER_IMAGE', payload: response.data});
    //   }
    // } catch (error) {
    //   console.error('Failed to upload image', error);
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <LinearGradient
      colors={[themeColors.white, themeColors.white]}
      style={styles.gradient}>
      <StatusBar backgroundColor={themeColors.primary} />
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.container}>
          <FormPerfil
            profileImage={profileImage}
            requestPermissions={requestPermissions}
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
          <TouchableOpacity
            style={[
              styles.submitButton,
              {backgroundColor: themeColors.primary},
            ]}
            onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Salvar</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={[
              styles.submitButton,
              {backgroundColor: themeColors.primary, marginTop: 10},
            ]}
            onPress={handleImageUpload}>
            <Text style={styles.submitButtonText}>Upload Imagem</Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
      {loading && <LoadingModal />}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
    padding: 20,
  },
  container: {
    flex: 1,
  },
  submitButton: {
    backgroundColor: '#0066cc',
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default ProfileScreen;
