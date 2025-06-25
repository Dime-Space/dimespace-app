import axios from 'axios';

const API_URL = 'http://localhost:3001';

export type ResponseWithData<T> = {
  data: T;
};

export type Chat = {
  id: number;
  name: string;
  user: {
    id: number;
    name: string;
  };
  company: {
    id: number;
    name: string;
  };
  created_at: string;
};

export const listChats = async () => {
  try {
    const response = await axios.get(`${API_URL}/chat`);
    return response.data as ResponseWithData<Chat[]>;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Erro ao buscar conversas',
    );
  }
};

export type ChatHistory = {
  id: number;
  name: string;
  messages: Message[];
  created_at: string;
};

export type Message = {
  id: number;
  content: string;
  user: {
    id: number;
    name: string;
  };
  created_at: string;
};

export const getChatHistory = async (chatId: number) => {
  try {
    const response = await axios.get(`${API_URL}/chat/${chatId}`);
    return response.data as ResponseWithData<ChatHistory>;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Erro ao buscar conversas',
    );
  }
};
