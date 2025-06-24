import React, { useState, useRef, useEffect } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { Chat, getChatHistory, listChats } from '@/services/chat/chatService';

interface ChatUser {
  id: number;
  nome: string;
  avatar: string;
  lastMessage: string;
}

interface ChatModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const testUsers: ChatUser[] = [
  {
    id: 1,
    nome: 'Microsoft',
    avatar: '/src/assets/images/microsoft.jpeg',
    lastMessage: 'Bem vindo a microsft...',
  },
  {
    id: 2,
    nome: 'Google',
    avatar: '/src/assets/images/google.png',
    lastMessage: 'bem vindo ao google...',
  },
  {
    id: 3,
    nome: 'Nvidia',
    avatar: '/src/assets/images/nvidia.jpg',
    lastMessage: 'bem vindo a nvidia  ...',
  },
];

type ChatFormValues = {
  message: string;
};

const ChatModal: React.FC<ChatModalProps> = ({ open, onOpenChange }) => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [search, setSearch] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const { data: chats } = useQuery({
    queryKey: ['chats'],
    queryFn: async () => {
      const response = await listChats();
      return response.data;
    },
  });

  const { data: chatHistory } = useQuery({
    queryKey: ['chat-history'],
    enabled: !!selectedChat,
    queryFn: async () => {
      if (!selectedChat) return undefined;
      const response = await getChatHistory(selectedChat?.id);
      return response.data;
    },
  });

  const { register, handleSubmit, reset } = useForm<ChatFormValues>();

  const messages = [];
  const onSendMessage = (message: string) => {};

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open, selectedChat]);

  const filteredUsers = testUsers.filter((user) =>
    user.nome.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSend = (data: ChatFormValues) => {
    if (data.message.trim()) {
      onSendMessage(data.message.trim());
      reset();
    }
  };

  const handleClose = () => {
    setSelectedChat(null);
    onOpenChange(false);
    reset();
  };

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent
        side="right"
        className="flex flex-col h-full p-0 max-w-md w-full bg-white"
      >
        {!selectedChat ? (
          <div className="flex flex-col h-full ">
            <div className="p-4 border-b border-[#eee] bg-[#f9f9f9]">
              <Input
                placeholder="Pesquisar"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-[#f9f9f9] text-black border border-[#ddd] placeholder:text-[#888]"
              />
            </div>
            <div className="flex-1 overflow-y-auto">
              {chats?.map((chat, idx) => (
                <button
                  key={chat.id}
                  className={`flex items-center w-full px-4 py-3 transition-colors border-b border-[#eee] cursor-pointer ${
                    idx === 1 ? 'bg-[#f3f3f3]' : 'bg-white'
                  } hover:bg-[#f3f3f3]`}
                  onClick={() => setSelectedChat(chat)}
                  style={{ outline: 'none' }}
                >
                  <img
                    // src={chat.avatar}
                    // alt={chat.nome}
                    className="w-12 h-12 rounded-full object-cover mr-4 bg-gray-200"
                  />
                  <div className="flex-1 text-left">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-black text-base">
                        {chat.company.name}
                      </span>
                    </div>
                    <span className="text-[#666] text-sm truncate block max-w-[180px]">
                      {new Date(chat.created_at).toLocaleDateString('pt-BR')}{' '}
                      {new Date(chat.created_at).toLocaleTimeString('pt-BR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-3 p-4 border-b border-[#eee] bg-[#f9f9f9]">
              <Button
                variant="ghost"
                size="icon"
                className="mr-2"
                onClick={() => setSelectedChat(null)}
              >
                <span className="text-2xl text-black">{'←'}</span>
              </Button>
              <img
                // src={selectedChat.avatar}
                // alt={selectedChat.nome}
                className="w-12 h-12 rounded-full object-cover bg-gray-200"
              />
              <div>
                <div className="font-semibold text-black">
                  {selectedChat.name}
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-2 flex flex-col bg-white">
              {chatHistory?.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-2 rounded-lg max-w-xs mb-2 ${
                    msg.user
                      ? 'bg-blue-500 text-white self-end ml-auto'
                      : 'bg-gray-200 text-gray-900 self-start mr-auto'
                  }`}
                >
                  {msg.content}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <form
              onSubmit={handleSubmit(handleSend)}
              className="flex items-center gap-2 p-4 bg-white"
            >
              <Input
                placeholder="Digite uma mensagem..."
                {...register('message')}
                className="flex-1 rounded-full bg-[#eee] border-none text-black"
                autoComplete="off"
              />
              <Button
                type="submit"
                className="rounded-full w-10 h-10 p-0 flex items-center justify-center bg-[#eee] text-black"
                variant="ghost"
              >
                <span className="text-xl">{'→'}</span>
              </Button>
            </form>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default ChatModal;
