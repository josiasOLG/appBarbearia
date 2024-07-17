import ApiClient from './ApiClient';

export const createAppointment = async (appointmentData: any) => {
  const response = await ApiClient.post('/appointments', appointmentData);
  return response.data;
};

export const approveAppointment = async (appointmentId: any) => {
  const response = await ApiClient.put(
    `/appointments/${appointmentId}/approve`,
  );
  return response.data;
};

export const rejectAppointment = async (
  appointmentId: any,
  cancelReason: string,
) => {
  const response = await ApiClient.put(
    `/appointments/${appointmentId}/reject`,
    {cancelReason},
  );
  return response.data;
};

export const checkAppointment = async (data: {
  userId: string;
  date: string;
}) => {
  const response = await ApiClient.post(
    '/appointments/check-appointment',
    data,
  );
  return response.data;
};

export const getAllAppointamentUserId = async (userId: any) => {
  const response = await ApiClient.get(`/appointments/user/${userId}`);
  return response.data;
};

export const getAllPoints = async (userId: any) => {
  const response = await ApiClient.get(`/appointments/points/${userId}`);
  return response.data;
};

export const getAllAppointamentBarberId = async (
  barberId: any,
  filter?: string,
) => {
  const url = filter
    ? `/appointments/barber/${barberId}?filter=${filter}`
    : `/appointments/barber/${barberId}`;
  const response = await ApiClient.get(url);
  return response.data;
};

export const addPoints = async (
  appointmentId: any,
  userId: any,
  barberId: any,
  barberName: any,
) => {
  const response = await ApiClient.post('/appointments/add-points', {
    appointmentId,
    userId,
    barberId,
    barberName,
  });
  return response.data;
};

export const AppointmentService = {
  createAppointment,
  approveAppointment,
  rejectAppointment,
  checkAppointment,
  getAllAppointamentUserId,
  getAllAppointamentBarberId,
  addPoints,
  getAllPoints,
};
