import ApiClient from './ApiClient';

export const getCardToken = async (cardData: any) => {
  const response = await ApiClient.post(
    `/subscription/get-card-token`,
    cardData,
  );
  return response.data;
};

export const getPlans = async () => {
  const response = await ApiClient.get(`/subscription/plans`);
  return response.data;
};

export const subscribeUser = async (subscriptionData: any) => {
  const response = await ApiClient.post(
    `/subscription/subscribe`,
    subscriptionData,
  );
  return response.data;
};

export const cancelSubscription = async (subscriptionCode: string) => {
  const response = await ApiClient.put(`/subscription/cancel`, {
    subscriptionCode,
  });
  return response.data;
};

export const getCards = async (idUser: any) => {
  const response = await ApiClient.get(`/subscription/cards/${idUser}`);
  return response.data;
};

export const checkSubscriptionStatus = async (userId: string) => {
  const response = await ApiClient.get(`/subscription/status/${userId}`);
  return response.data;
};

export const assinantes = async (userId: string) => {
  const response = await ApiClient.post(`/subscription/customers`, {userId});
  return response.data;
};

export const getInvoices = async (subscriptionId: string) => {
  const response = await ApiClient.get(
    `/subscription/list/invoices/${subscriptionId}`,
  );
  return response.data;
};

export const renewSubscription = async (subscriptionData: any) => {
  const response = await ApiClient.post(
    `/subscription/renewSubscription`,
    subscriptionData,
  );
  return response.data;
};

export const atualizarCartao = async (subscriptionData: any) => {
  const response = await ApiClient.put(
    `/subscription/atualizar/cartao`,
    subscriptionData,
  );
  return response.data;
};
