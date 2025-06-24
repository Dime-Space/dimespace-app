import React, { useState, useRef, useEffect } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import {
  Chat,
  getChatHistory,
  listChats,
  Message,
} from '@/services/chat/chatService';
import { useAuth } from '@/contexts/hooks/useAuth';
import { useChatSocket } from '@/contexts/hooks/useChatWs';
import { LucideArrowRight, User } from 'lucide-react';

interface ChatModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type ChatFormValues = {
  message: string;
};

const ChatModal: React.FC<ChatModalProps> = ({ open, onOpenChange }) => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [search, setSearch] = useState('');
  const { user } = useAuth();
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

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!chatHistory) return;
    setMessages(
      chatHistory.messages.sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      ),
    );
  }, [chatHistory]);

  const { sendMessage } = useChatSocket({
    chatId: String(selectedChat?.id || -1),
    onMessage: (message: Message) => {
      if (message && message.content) {
        setMessages((prev) => {
          const newMessages = [...prev, message];
          return newMessages.sort(
            (a, b) =>
              new Date(a.created_at).getTime() -
              new Date(b.created_at).getTime(),
          );
        });
      }
    },
  });

  const onSendMessage = (message: string) => {
    sendMessage(message);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open, selectedChat]);

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
                  <div className="w-12 h-12 rounded-full object-cover mr-4 bg-gray-100 items-center justify-center flex ">
                    <User />
                  </div>
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
                className="mr-2 cursor-pointer"
                onClick={() => setSelectedChat(null)}
              >
                <span className="text-2xl text-black">{'←'}</span>
              </Button>
              <div className="w-12 h-12 rounded-full object-cover mr-4 bg-gray-100 items-center justify-center flex ">
                <User />
              </div>
              <div>
                <div className="font-semibold text-black pr-4">
                  {selectedChat.name}
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-2 flex flex-col bg-white">
              {messages.map((msg) => (
                <React.Fragment key={msg.id}>
                  <div
                    className={`p-2 rounded-lg max-w-xs break-words ${
                      user && Number(msg.user.id) === Number(user.id)
                        ? 'bg-blue-500 text-white self-end ml-auto'
                        : 'bg-gray-200 text-gray-900 self-start mr-auto'
                    }`}
                  >
                    {msg.content}
                  </div>
                  <label
                    className={`rounded-lg max-w-xs break-words mb-4 text-[10px] mt-1 ${
                      user && Number(msg.user.id) === Number(user.id)
                        ? ' text-gray-800 self-end ml-auto'
                        : ' text-gray-800 self-start mr-auto'
                    }`}
                  >
                    {new Date(
                      new Date(msg.created_at).getTime() - 3 * 60 * 60 * 1000,
                    ).toLocaleDateString('pt-BR')}{' '}
                    {new Date(
                      new Date(msg.created_at).getTime() - 3 * 60 * 60 * 1000,
                    ).toLocaleTimeString('pt-BR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </label>
                </React.Fragment>
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
                className="cursor-pointer rounded-full w-10 h-10 p-0 flex items-center justify-center bg-[#eee] text-black"
                variant="ghost"
              >
                <span className="text-xl">
                  <LucideArrowRight />
                </span>
              </Button>
            </form>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default ChatModal;
