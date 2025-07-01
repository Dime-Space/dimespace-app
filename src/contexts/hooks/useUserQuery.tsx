// hooks/useUserQuery.ts
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchUserFromAPI } from '@/services/auth/authService';

export const useUserQuery = () => {
  return useQuery({
    queryKey: ['user'], // Chave única para esta query
    queryFn: fetchUserFromAPI, // Função que busca os dados
    select: (response) => response.data, // Extrai apenas os dados do usuário da resposta
  });
};

export const useInvalidateUser = () => {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: ['user'] });
};
//
