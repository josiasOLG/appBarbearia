import ApiClient from './ApiClient';

export const getAddressByUserId = async (userId: string) => {
  const response = await ApiClient.get(`/addresses/${userId}`);
  return response.data;
};

export const updateAddress = async (userId: string, addressData: any) => {
  const response = await ApiClient.put(
    `/addresses/create-or-update/${userId}`,
    addressData,
  );
  return response.data;
};
