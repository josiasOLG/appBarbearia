import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiClient from '../api/ApiClient';

export const refreshTokenInterceptor = async (error: any) => {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    try {
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      const response = await ApiClient.post('/auth/refresh', {refreshToken});
      await AsyncStorage.setItem('token', response.data.accessToken);
      ApiClient.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${response.data.accessToken}`;
      return ApiClient(originalRequest);
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
  }
  return Promise.reject(error);
};
