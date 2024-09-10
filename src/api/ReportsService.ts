import ApiClient from './ApiClient';

const getClientsPDF = async (barberId: string) => {
  const response = await ApiClient.get(`/pdf/clients/${barberId}`);
  return response.data.base64;
};

const getSubscriptionsPDF = async (barberId: string) => {
  const response = await ApiClient.get(`/pdf/subscriptions/${barberId}`);
  return response.data.base64;
};

const getAppointmentsPDF = async (barberId: string) => {
  const response = await ApiClient.get(`/pdf/appointments/${barberId}`);
  return response.data.base64;
};

const getAvailabilityPDF = async (barberId: string) => {
  const response = await ApiClient.get(`/pdf/availability/${barberId}`);
  return response.data.base64;
};

const getServicePointsPDF = async (barberId: string) => {
  const response = await ApiClient.get(`/pdf/service-points/${barberId}`);
  return response.data.base64;
};

const getClientAddressesPDF = async (barberId: string) => {
  const response = await ApiClient.get(`/pdf/client-addresses/${barberId}`);
  return response.data.base64;
};

const getRevenueReportPDF = async (barberId: string) => {
  const response = await ApiClient.get(`/pdf/revenue-report/${barberId}`);
  return response.data.base64;
};

const getTopServicesPDF = async (barberId: string) => {
  const response = await ApiClient.get(`/pdf/top-services/${barberId}`);
  return response.data.base64;
};

const getExpensesPDF = async (barberId: string) => {
  const response = await ApiClient.get(`/pdf/expenses/${barberId}`);
  return response.data.base64;
};

const getRevenueByClientPDF = async (barberId: string) => {
  const response = await ApiClient.get(`/pdf/revenue-by-client/${barberId}`);
  return response.data.base64;
};

export const ReportsService = {
  getClientsPDF,
  getSubscriptionsPDF,
  getAppointmentsPDF,
  getAvailabilityPDF,
  getServicePointsPDF,
  getClientAddressesPDF,
  getRevenueReportPDF,
  getTopServicesPDF,
  getExpensesPDF,
  getRevenueByClientPDF,
};
