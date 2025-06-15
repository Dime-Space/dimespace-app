import axios from 'axios';

const API_URL = 'http://localhost:3001';
const TOKEN_KEY = 'token';

// Define o header Authorization global do axios
const setAuthHeader = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const loginUser = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/login`, {
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
  setAuthHeader(); // <- define header após login

  return data;
};

export const logoutUser = () => {
  localStorage.removeItem(TOKEN_KEY);
  setAuthHeader(); // <- remove header após logout
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const isAuthenticated = () => {
  return !!localStorage.getItem(TOKEN_KEY);
};

// (Opcional) Chamar isso no App.tsx para manter o header se o usuário já estiver logado
export const initAuth = () => {
  setAuthHeader();
};
