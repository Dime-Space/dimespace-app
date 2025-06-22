// services/companyServices.ts

import axios from 'axios';

const API_URL = 'http://localhost:3001';

type AddressFull = {
  cep: string;
  state: string;
  city: string;
  street: string;
  number: string;
  complement?: string;
};

type AddressById = {
  id: string;
};

export const createCompany = async (companyData: {
  name: string;
  cnpj: string;
  phone: string;
  address?: AddressFull | AddressById;
}) => {
  const response = await axios.post(`${API_URL}/company`, companyData);
  return response.data;
};
