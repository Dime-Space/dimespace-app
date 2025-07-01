// hooks/useUserProfile.ts
import { useQuery } from '@tanstack/react-query';
import { fetchUserFromAPI, getToken } from '@/services/auth/authService';

export const useUserProfile = () => {
  const token = getToken();

  return useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => {
      if (!token) return null; // Sem token, usuário é null
      const res = await fetchUserFromAPI();
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!token, // só executa query se tiver token
  });
};
