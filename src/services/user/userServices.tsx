import axios from 'axios';
import { UserStepData, AddressStepData } from '@/types/types';
import { useInvalidateUser } from '@/contexts/hooks/useUserQuery';

const API_URL = 'http://localhost:3001';

export const registerUser = async (
  userData: UserStepData,
  addressData: AddressStepData,
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
    const response = await axios.get(`${API_URL}/user`);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Erro ao buscar perfil do usuário',
    );
  }
};

export const getUserById = async (id: number) => {
  const response = await axios.get(`${API_URL}/user/${id}`);
  console.log('Response from getUserById:', response.data);
  return response.data.data;
};

export const useUpdateUserProfile = () => {
  const invalidateUser = useInvalidateUser();

  const updateUserProfile = async (
    userId: string,
    userData: Partial<UserStepData>,
  ) => {
    const response = await axios.patch(`${API_URL}/user/${userId}`, userData);
    await invalidateUser(); // Isso fará com que os dados sejam buscados novamente
    return response.data;
  };

  return { updateUserProfile };
};

export const updateUserAddress = async (
  userId: string,
  addressData: Partial<UpdateAddressDTO>,
) => {
  return axios.patch(`${API_URL}/user/${userId}/address`, addressData);
};
