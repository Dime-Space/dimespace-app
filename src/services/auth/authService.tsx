import axios from 'axios';

/**
 * Serviço de autenticação
 *
 * Este arquivo é responsável por realizar comunicações diretas com a API de autenticação,
 * como login, logout, e buscar os dados do usuário logado (/me). Ele **NÃO deve ser usado
 * diretamente em componentes React**, pois não lida com estado global nem reatividade.
 *
 * Use este serviço apenas dentro de contextos ou hooks customizados.
 *
 * ✅ Use para:
 *   - Fazer requisições como login, logout, buscar /me, etc.
 *   - Configurar headers de autenticação com axios.
 *
 * ❌ NÃO use para:
 *   - Controlar estado de autenticação.
 *   - Guardar ou recuperar o usuário logado no React.
 *
 * Exemplo correto de uso:
 *   Dentro do AuthContext, para chamar loginUser(email, senha)
 */

export const API_URL = 'http://localhost:3001';
const TOKEN_KEY = 'token';
const USER_KEY = 'user'; // <- chave para guardar o user logado

// Define o header Authorization global do axios
const setAuthHeader = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Faz login, salva o token
export const loginUser = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Erro ao fazer login');
  }

  const result = await response.json();

  const token = result.data.access_token;

  console.log('[loginUser] Token recebido da API:', token);

  localStorage.setItem(TOKEN_KEY, token);
  setAuthHeader();

  return token;
};

export const logoutUser = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  setAuthHeader();
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const getCurrentUser = () => {
  const userString = localStorage.getItem(USER_KEY);
  return userString ? JSON.parse(userString) : null;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem(TOKEN_KEY);
};

export const fetchUserFromAPI = async () => {
  const token = getToken(); // pega do localStorage
  const response = await axios.get(`${API_URL}/user/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Manter o header após refresh
export const initAuth = () => {
  setAuthHeader();
};
