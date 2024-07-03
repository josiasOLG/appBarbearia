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

export const BarberService = {
  getServices,
  addService,
  deleteService,
};
