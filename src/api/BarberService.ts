import ApiClient from './ApiClient';

const getServices = async (id: number) => {
  return ApiClient.get(`/barber-services/${id}`);
};

const addService = async (userId: string, serviceName: string, points: any) => {
  return ApiClient.post('/barber-services', {
    userId,
    name: serviceName,
    points: points,
  });
};

const deleteService = async (id: number) => {
  return ApiClient.delete(`/barber-services/${id}`);
};

const getAllServicePerfils = async (barberId: string) => {
  return ApiClient.get(`/barber-services/services/${barberId}`);
};

const getAllServices = async () => {
  return ApiClient.get('/services');
};

export const BarberService = {
  getServices,
  addService,
  deleteService,
  getAllServicePerfils,
  getAllServices,
};
