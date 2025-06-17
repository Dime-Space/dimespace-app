// services/companyServices.ts

import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const createCompany = async (companyData: {
  name: string;
  cnpj: string;
  phone: string;
  address?: {
    cep: string;
    state: string;
    city: string;
    street: string;
    number: string;
    complement?: string;
  };
}) => {
  const response = await axios.post(`${API_URL}/company`, companyData);
  return response.data;
};
