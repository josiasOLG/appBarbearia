import ApiClient from './ApiClient';

const getQRCode = async (id: string) => {
  return ApiClient.get(`/qrcode/${id}`);
};

const createQRCode = async (userId: string, barberId: string) => {
  return ApiClient.post('/qrcode/generate', {
    userId,
    barberId,
  });
};

const updateQRCode = async (id: string, updateData: any) => {
  return ApiClient.put(`/qrcode/${id}`, updateData);
};

const updateQRCodeBarberId = async (id: string, updateData: any) => {
  return ApiClient.put(`/qrcode/updateByBarberIdAndCode/${id}`, updateData);
};

const deleteQRCode = async (id: string) => {
  return ApiClient.delete(`/qrcode/${id}`);
};

const getQRCodesByUserId = async (userId: string) => {
  return ApiClient.get(`/qrcode/user/${userId}`);
};

export const QRCodeServices = {
  getQRCode,
  createQRCode,
  updateQRCode,
  deleteQRCode,
  getQRCodesByUserId,
  updateQRCodeBarberId,
};
