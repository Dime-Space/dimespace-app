import axios from 'axios';

const API_URL = 'http://localhost:3001';
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

// Faz login, salva o token e os dados do usuário (/me)
export const loginUser = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Erro ao fazer login');
  }

  const data = await response.json();
  localStorage.setItem(TOKEN_KEY, data.token);
  setAuthHeader();

  // Buscar dados do usuário logado
  const meResponse = await fetch(`${API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });

  if (!meResponse.ok) {
    throw new Error('Erro ao buscar dados do usuário');
  }

  const user = await meResponse.json();
  localStorage.setItem(USER_KEY, JSON.stringify(user)); // Salva os dados do usuário

  return user;
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

// Manter o header após refresh
export const initAuth = () => {
  setAuthHeader();
};
