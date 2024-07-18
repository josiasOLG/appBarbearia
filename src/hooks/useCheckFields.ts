import {useState, useCallback} from 'react';
import {getAddressByUserId} from '../api/AddressService';
import {UserService} from '../api/UserService';

const useCheckFields = (userId: string) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [missingFields, setMissingFields] = useState<string[]>([]);

  const addressRequiredFields = [
    {key: 'zipCode', label: 'CEP'},
    {key: 'cpf', label: 'CPF'},
    {key: 'phoneNumber', label: 'Telefone'},
    {key: 'number', label: 'Número'},
    {key: 'complement', label: 'Complemento'},
  ];

  const hoursRequiredFields = [
    {key: 'startTime', label: 'Horário de Início'},
    {key: 'lunchStartTime', label: 'Início do Almoço'},
    {key: 'lunchEndTime', label: 'Fim do Almoço'},
    {key: 'endTime', label: 'Horário de Término'},
    {key: 'interval', label: 'Intervalo'},
  ];

  const checkAddress = useCallback(async () => {
    try {
      const address = await getAddressByUserId(userId);
      const missingFieldsList: string[] = [];

      if (address.length > 0 && address[0]) {
        addressRequiredFields.forEach(field => {
          if (!address[0][field.key]) {
            missingFieldsList.push(field.label);
          }
        });

        if (missingFieldsList.length === 0) {
          await checkUserHours();
        } else {
          setMissingFields(missingFieldsList);
          setModalVisible(true);
        }
      } else {
        addressRequiredFields.forEach(field =>
          missingFieldsList.push(field.label),
        );
        setMissingFields(missingFieldsList);
        setModalVisible(true);
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      setMissingFields(addressRequiredFields.map(field => field.label));
      setModalVisible(true);
    }
  }, [userId]);

  const checkUserHours = async () => {
    try {
      const response = await UserService.getUserDataHors(userId);
      const hours = response.data;
      const missingFieldsList: string[] = [];

      if (hours) {
        hoursRequiredFields.forEach(field => {
          if (!hours[field.key]) {
            missingFieldsList.push(field.label);
          }
        });
        if (missingFieldsList.length === 0) {
          setModalVisible(false);
          return;
        } else {
          setMissingFields(missingFieldsList);
          setModalVisible(true);
        }
      } else {
        hoursRequiredFields.forEach(field =>
          missingFieldsList.push(field.label),
        );
        setMissingFields(missingFieldsList);
        setModalVisible(true);
      }
    } catch (error) {
      console.error('Error fetching user hours:', error);
      setMissingFields(hoursRequiredFields.map(field => field.label));
      setModalVisible(true);
    }
  };

  return {modalVisible, missingFields, checkAddress, setModalVisible};
};

export default useCheckFields;
