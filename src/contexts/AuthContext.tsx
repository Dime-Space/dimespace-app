// contexts/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, getToken, logoutUser } from '@/services/auth/authService';
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
      const res = await axios.get('http://localhost:3001/auth/me');
      setUser(res.data);
    } catch (err) {
      console.error('Erro ao buscar /me', err);
    }
  };

  const login = async (email: string, password: string) => {
    const { token } = await loginUser(email, password); // salva token no localStorage
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    await fetchUser();
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
