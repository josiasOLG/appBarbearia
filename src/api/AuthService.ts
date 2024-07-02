import ApiClient from './ApiClient';

const login = async (credentials: {username: string; password: string}) => {
  return ApiClient.post('/login', credentials);
};

const register = async (data: {
  username: string;
  password: string;
  email: string;
}) => {
  return ApiClient.post('/auth/register', data);
};

const googleSignIn = async (idToken: any, uid: any, role: any) => {
  return ApiClient.post('/auth/google', {token: idToken, uid: uid, role: role});
};

const recoverPassword = async (email: string) => {
  return ApiClient.post('/sendVerificationCode', {email});
};

export const AuthService = {
  login,
  register,
  googleSignIn,
  recoverPassword,
};
