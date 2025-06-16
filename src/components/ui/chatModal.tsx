import React, { useState, useRef, useEffect } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';

interface ChatUser {
  id: number;
  nome: string;
  avatar: string;
  lastMessage: string;
}

interface ChatModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  messages: { id: number; text: string; sender: 'user' | 'bot' }[];
  onSendMessage: (message: string) => void;
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
  }
];

type ChatFormValues = {
  message: string;
};

const ChatModal: React.FC<ChatModalProps> = ({
  open,
  onOpenChange,
  messages,
  onSendMessage,
}) => {
  const [selectedChat, setSelectedChat] = useState<ChatUser | null>(null);
  const [search, setSearch] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const { register, handleSubmit, reset } = useForm<ChatFormValues>();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open, selectedChat]);

  const filteredUsers = testUsers.filter((user) =>
    user.nome.toLowerCase().includes(search.toLowerCase())
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
          <div className="flex flex-col h-full">
            <div className="p-4 border-b border-[#eee] bg-[#f9f9f9]">
              <Input
                placeholder="Pesquisar"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-[#f9f9f9] text-black border border-[#ddd] placeholder:text-[#888]"
              />
            </div>
            <div className="flex-1 overflow-y-auto">
              {filteredUsers.map((user, idx) => (
                <button
                  key={user.id}
                  className={`flex items-center w-full px-4 py-3 transition-colors border-b border-[#eee] ${
                    idx === 1 ? 'bg-[#f3f3f3]' : 'bg-white'
                  } hover:bg-[#f3f3f3]`}
                  onClick={() => setSelectedChat(user)}
                  style={{ outline: 'none' }}
                >
                  <img
                    src={user.avatar}
                    alt={user.nome}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div className="flex-1 text-left">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-black text-base">{user.nome}</span>
                    </div>
                    <span className="text-[#666] text-sm truncate block max-w-[180px]">
                      {user.lastMessage}
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
                src={selectedChat.avatar}
                alt={selectedChat.nome}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="font-semibold text-black">{selectedChat.nome}</div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-2 flex flex-col bg-white">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-2 rounded-lg max-w-xs mb-2 ${
                    msg.sender === 'user'
                      ? 'bg-blue-500 text-white self-end ml-auto'
                      : 'bg-gray-200 text-gray-900 self-start mr-auto'
                  }`}
                >
                  {msg.text}
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