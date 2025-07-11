import axios from 'axios';
import { API_URL } from '@/services/auth/authService';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export async function getProposals() {
  const response = await axios.get(`${API_URL}/proposals`);
  return response.data.data;
}

export async function getProposalById(id: string) {
  const response = await axios.get(`${API_URL}/proposals/${id}`);
  return response.data.data;
}

export const createProposal = async (proposalData: any) => {
  try {
    const response = await axios.post(
      `${API_URL}/proposals/create`,
      proposalData,
    );
    return response.data;
  } catch (error: any) {
    toast.error('Erro ao criar proposta!');
    throw error;
  }
};

export const updateProposal = async (id: number, data: any) => {
  try {
    const response = await axios.put(`${API_URL}/proposals/${id}`, data);
    toast.success('Proposta atualizada com sucesso!');
    return response.data;
  } catch (error: any) {
    toast.error('Erro ao atualizar proposta!');
    throw error;
  }
};

export const useUpdateProposal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) =>
      updateProposal(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['proposals'] });
    },
  });
};
