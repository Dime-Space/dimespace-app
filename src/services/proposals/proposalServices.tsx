import axios from 'axios';
import { API_URL } from '@/services/auth/authService'; // ou ajuste conforme o caminho

export async function getProposals() {
  const response = await axios.get(`${API_URL}/proposals`);
  return response.data.data; // ou ajuste conforme a estrutura
}

export async function getProposalById(id: string) {
  const response = await axios.get(`${API_URL}/proposals/${id}`);
  return response.data.data; // ou ajuste conforme a estrutura
}
