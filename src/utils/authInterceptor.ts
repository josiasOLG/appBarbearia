import AsyncStorage from '@react-native-async-storage/async-storage';

export const authInterceptor = async (config: any) => {
  const token = await AsyncStorage.getItem('token'); // Uso do AsyncStorage para armazenamento local seguro
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
};
