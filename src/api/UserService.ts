import ApiClient from './ApiClient';

const validateCode = async (data: {email: string; code: string}) => {
  return ApiClient.post('/validateCode', data);
};

const resetPassword = async (data: {email: string; password: string}) => {
  return ApiClient.post('/reset-password', data);
};

const register = async (data: {
  name: string;
  email: string;
  password: string;
  role: string;
}) => {
  return ApiClient.post('/register', data);
};

const updateUserService = async (userId: string, service: string) => {
  return ApiClient.put(`/users/${userId}/service`, {service});
};

const searchUsers = async (query: string, service: string) => {
  return ApiClient.get(`/users/pesquisar/${service}`, {
    params: {query},
  });
};

export const UserService = {
  validateCode,
  resetPassword,
  register,
  updateUserService,
  searchUsers,
};
