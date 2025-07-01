// contexts/AuthContext.tsx
/**
 * AuthContext.tsx
 *
 * Este arquivo cria o contexto de autenticação da aplicação React.
 * Ele fornece funções como `login`, `logout` e mantém o usuário logado em memória
 * (além de configurar automaticamente o token do axios).
 *
 * É aqui que conectamos a API (via authService) ao React.
 *
 * ✅ Use para:
 *   - Fornecer o estado global do usuário para toda a aplicação.
 *   - Inicializar o usuário automaticamente ao abrir o app (useEffect).
 *   - Proteger rotas ou componentes com base em `isAuthenticated`.
 *
 * Como usar:
 *   - Envolver a aplicação com <AuthProvider> no App.tsx.
 *   - Usar o hook useAuth() dentro de componentes para acessar o contexto.
 *
 * ❌ NÃO use diretamente em componentes (use o hook useAuth para isso).
 */

// contexts/AuthContext.tsx
import { toast } from 'sonner';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createContext, useContext, useState, useEffect } from 'react';
import {
  loginUser,
  getToken,
  logoutUser,
  fetchUserFromAPI,
} from '@/services/auth/authService';
import axios from 'axios';

interface User {
  birthdate: string;
  biography: string;
  skill: string;
  area: string;
  phone: string;
  cpf: string;
  id: string;
  name: string;
  email: string;
  address_id?: string;
  companyOwned?: Company;
}

interface Company {
  id: string;
  name: string;
  cnpj: string;
  phone: string;
}

interface AuthContextType {
  user: User | null;
  company: Company | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const queryClient = useQueryClient();
  const [company, setCompany] = useState<Company | null>(null);

  // Configuração inicial do Axios
  useEffect(() => {
    const token = getToken();
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  const { data: userData, refetch } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      try {
        const response = await fetchUserFromAPI();
        return response;
      } catch (error) {
        // Se houver erro (como token inválido), faz logout
        logoutUser();
        return { data: null };
      }
    },
    enabled: !!getToken(),
  });

  const user = userData?.data || null;

  useEffect(() => {
    if (user?.companyOwned) {
      setCompany(user.companyOwned);
    } else {
      setCompany(null);
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    try {
      const token = await loginUser(email, password);
      // Atualiza o header do Axios com o novo token
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Força a atualização dos dados do usuário
      await refetch();
      toast.success('Login realizado com sucesso!');
    } catch (err) {
      toast.error('Erro ao fazer login');
      throw err;
    }
  };

  const logout = () => {
    logoutUser();
    // Remove o header do Axios
    delete axios.defaults.headers.common['Authorization'];
    // Limpa os dados do usuário no cache
    queryClient.removeQueries({ queryKey: ['user'] });
    setCompany(null);
    toast.success('Logout realizado com sucesso!');
  };

  return (
    <AuthContext.Provider
      value={{ user, company, login, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
