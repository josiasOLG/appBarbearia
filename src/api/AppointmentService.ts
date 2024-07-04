import ApiClient from './ApiClient';

export const createAppointment = async (appointmentData: any) => {
  const response = await ApiClient.post('/appointments', appointmentData);
  return response.data;
};

export const approveAppointment = async (appointmentId: string) => {
  const response = await ApiClient.put(
    `/appointments/${appointmentId}/approve`,
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

export const AppointmentService = {
  createAppointment,
  approveAppointment,
  checkAppointment,
  getAllAppointamentUserId,
};
