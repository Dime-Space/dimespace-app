import axios from 'axios';
import { Step1Data, Step2Data } from '@/components/ui/registermodal/types';

const API_URL = 'http://localhost:3001';

export const registerUser = async (
  userData: Step1Data,
  addressData: Step2Data,
) => {
  const payload = {
    ...userData,
    address: {
      cep: addressData.cep,
      state: addressData.state,
      city: addressData.city,
      street: addressData.street,
      number: addressData.number,
      complement: addressData.complement,
    },
  };

  try {
    const response = await axios.post(`${API_URL}/user`, payload);
    return response.data;
  } catch (error: any) {
    // Você pode melhorar esse tratamento de erro aqui
    throw new Error(error.response?.data?.message || 'Erro ao cadastrar');
  }
};

export const getUserProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}/profile`);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Erro ao buscar perfil do usuário',
    );
  }
};
