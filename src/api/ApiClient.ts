import axios from 'axios';
import * as Keychain from 'react-native-keychain';

const API_BASE_URL = 'https://apib-arbearia.vercel.app';

const ApiClient = axios.create({
  baseURL: API_BASE_URL,
});

ApiClient.interceptors.request.use(async config => {
  const accessToken = await Keychain.getGenericPassword({
    service: 'accessToken',
  });
  const refreshToken = await Keychain.getGenericPassword({
    service: 'refreshToken',
  });
  const userId = await Keychain.getGenericPassword({
    service: 'userId',
  });

  if (accessToken && accessToken.password) {
    config.headers.Authorization = `Bearer ${accessToken.password}`;
  }
  if (refreshToken && refreshToken.password) {
    config.headers['x-refresh-token'] = refreshToken.password;
  }
  if (userId && userId.password) {
    config.headers['x-user-id'] = userId.password;
  }
  return config;
});

ApiClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        let refreshToken = await Keychain.getGenericPassword({
          service: 'refreshToken',
        });
        if (!refreshToken || !refreshToken.password) {
          // Tentar obter um novo refresh token do backend
          const userId = await Keychain.getGenericPassword({
            service: 'userId',
          });

          if (userId && userId.password) {
            const response = await axios.post(`${API_BASE_URL}/refresh-token`, {
              userId: userId.password,
            });

            refreshToken = response.data.refreshToken;

            if (refreshToken) {
              await Keychain.setGenericPassword('refreshToken', refreshToken, {
                service: 'refreshToken',
              });
            } else {
              throw new Error('Failed to obtain new refresh token');
            }
          } else {
            throw new Error('User ID not found');
          }
        }

        const response = await axios.post(`${API_BASE_URL}/refresh-token`, {
          refreshToken: refreshToken.password,
        });

        const newAccessToken = response.data.accessToken;

        if (newAccessToken) {
          await Keychain.setGenericPassword('accessToken', newAccessToken, {
            service: 'accessToken',
          });
          ApiClient.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${newAccessToken}`;
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return ApiClient(originalRequest);
        }
      } catch (refreshError) {
        await Keychain.resetGenericPassword({service: 'accessToken'});
        await Keychain.resetGenericPassword({service: 'refreshToken'});
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default ApiClient;
