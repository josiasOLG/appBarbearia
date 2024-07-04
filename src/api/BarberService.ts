import ApiClient from './ApiClient';

const getServices = async (id: number) => {
  return ApiClient.get(`/barber-services/${id}`);
};

const addService = async (userId: string, serviceName: string) => {
  return ApiClient.post('/barber-services', {userId, name: serviceName});
};

const deleteService = async (id: number) => {
  return ApiClient.delete(`/barber-services/${id}`);
};

const getAllServicePerfils = async (barberId: string) => {
  console.log(barberId);
  return ApiClient.get(`/barber-services/services/${barberId}`);
};

export const BarberService = {
  getServices,
  addService,
  deleteService,
  getAllServicePerfils,
};
