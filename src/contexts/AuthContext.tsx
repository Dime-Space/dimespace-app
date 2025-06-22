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

interface AuthContextType {
  user: User | null;
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

  const fetchUser = async () => {
    try {
      const userData = await fetchUserFromAPI();
      console.log('Dados do /me:', userData);
      setUser(userData);
    } catch (err) {
      console.error('Erro ao buscar /me', err);
    }
  };

  const login = async (email: string, password: string) => {
    const token = await loginUser(email, password);
    console.log('Token atual:', axios.defaults.headers.common['Authorization']);
    await fetchUser(); // fetchUser chama /me e seta o estado
  };

  const logout = () => {
    logoutUser();
    setUser(null);
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
      value={{ user, login, logout, isAuthenticated: !!user }}
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
