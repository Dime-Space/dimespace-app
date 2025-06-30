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

import { toast } from 'sonner';

import { createContext, useContext, useState, useEffect } from 'react';
import {
  loginUser,
  getToken,
  logoutUser,
  fetchUserFromAPI,
} from '@/services/auth/authService';
import axios from 'axios';

interface User {
  id: string;
  name: string;
  email: string;
  address_id?: string;
  // outros campos
}

interface Company {
  id: string;
  name: string;
  cnpj: string;
  phone: string;
}

interface AuthContextType {
  user: User | null;
  company: Company | null; // opcional, se você quiser armazenar a empresa do usuário
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
  const [user, setUser] = useState<User | null>(null);
  const [company, setCompany] = useState<Company | null>(null);

  const fetchUser = async () => {
    try {
      const response = await fetchUserFromAPI(); // retorna { statusCode, message, data }
      console.log('Dados do /me:', response);
      setUser(response.data); // assume que data contém o usuário
      if (response.data.companyOwned != null) {
        setCompany(response.data.companyOwned);
        console.log('Empresa do usuário:', response.data.companyOwned);
      }
    } catch (err) {
      console.error('Erro ao buscar /me', err);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const token = await loginUser(email, password);
      console.log(
        'Token atual:',
        axios.defaults.headers.common['Authorization'],
      );
      await fetchUser();
      toast.success('Login realizado com sucesso!');
    } catch (err) {
      toast.error('Erro ao fazer login');
      throw err; // importante propagar o erro se necessário
    }
  };

  const logout = () => {
    logoutUser();
    setUser(null);
    toast.success('Logout realizado com sucesso!');
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser();
    }
  }, []);

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
