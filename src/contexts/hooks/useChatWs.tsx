// hooks/useChatSocket.ts
import { API_URL, getToken } from '@/services/auth/authService';
import { Message } from '@/services/chat/chatService';
import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './useAuth';

interface UseChatSocketOptions {
  chatId: string;
  onMessage: (message: Message) => void;
}

export const useChatSocket = ({ chatId, onMessage }: UseChatSocketOptions) => {
  const socketRef = useRef<Socket | null>(null);
  const token = getToken();
  const { user } = useAuth();

  useEffect(() => {
    if (Number(chatId) <= 0) return;
    const socket = io(API_URL, {
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('Conectado ao servidor WebSocket:', socket.id);
      socket.emit('joinRoom', chatId);
    });

    socket.on('receiveMessage', (message) => {
      onMessage(message);
    });

    socket.on('disconnect', () => {
      console.log('Desconectado do servidor WebSocket');
    });

    return () => {
      socket.disconnect();
    };
  }, [chatId, token]);

  const sendMessage = (content: string) => {
    if (!socketRef.current || !user) return;

    socketRef.current.emit('sendMessage', {
      chatId,
      content,
      senderId: user.id,
    });
  };

  return { sendMessage };
};
