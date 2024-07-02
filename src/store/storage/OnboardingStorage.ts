import AsyncStorage from '@react-native-async-storage/async-storage';

export const setOnboardingCompleted = async () => {
  try {
    await AsyncStorage.setItem('onboardingCompleted', 'true');
  } catch (error) {
    console.error('Erro ao definir o status do onboarding:', error);
  }
};

export const checkOnboardingStatus = async () => {
  try {
    const onboardingCompleted = await AsyncStorage.getItem(
      'onboardingCompleted',
    );
    return !!onboardingCompleted; // Retorna true se o onboarding já foi completado
  } catch (error) {
    console.error('Erro ao verificar o status do onboarding:', error);
    return false; // Retorna false por padrão se houver algum erro
  }
};
