import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ChatModal from '@/components/ui/chatModal';
import EditUserModal from '@/components/ui/editmodal/editUserModal';

type JobOffer = {
  id: number;
  companyName: string;
  value: number;
  description: string;
  image?: string;
  cnpj?: string;
  address?: string;
  phone?: string;
  logo?: string;
  workPhotos?: string[]; // Novo campo para fotos do trabalho
};

const exampleOffer: JobOffer = {
  id: 1,
  companyName: 'Microsoft',
  value: 5000,
  description: 'Desenvolvimento de console Xbox 720.',
  image: '/src/assets/images/microsoft.jpeg',
  cnpj: '12.345.678/0001-99',
  address: 'Avenida das Empresas, 1000, São Paulo - SP',
  phone: '(11) 99999-8888',
  logo: '/src/assets/images/microsoft.jpeg',
  workPhotos: [
    '/src/assets/images/xbox720.jpg',
  ],
};

const JobOffer: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [chatMessages, setChatMessages] = useState<
    { id: number; text: string; sender: 'bot' | 'user' }[]
  >([
    { id: 1, text: 'Olá! Como posso ajudar?', sender: 'bot' },
  ]);

  const handleSendMessage = (message: string) => {
    setChatMessages((msgs) => [
      ...msgs,
      { id: msgs.length + 1, text: message, sender: 'user' as const },
      { id: msgs.length + 2, text: 'Recebi sua mensagem!', sender: 'bot' as const },
    ]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f9f9f9] p-4 relative">
      <Card className="w-full max-w-xl">
        <CardHeader className="flex flex-row items-center gap-4">
          {exampleOffer.logo && (
            <img
              src={exampleOffer.logo}
              alt={exampleOffer.companyName + ' logo'}
              className="w-12 h-12 rounded-full object-cover"
            />
          )}
          <div>
            <CardTitle className="text-xl">{exampleOffer.companyName}</CardTitle>
            <span className="text-lg font-semibold text-blue-600">
              R$ {exampleOffer.value.toLocaleString('pt-BR')}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <span className="block text-gray-700 font-medium mb-1">Descrição:</span>
            <p className="text-gray-900">{exampleOffer.description}</p>
          </div>
          <div className="mb-2">
            <span className="block text-gray-700 font-medium">CNPJ:</span>
            <span className="text-gray-900">{exampleOffer.cnpj}</span>
          </div>
          <div className="mb-2">
            <span className="block text-gray-700 font-medium">Endereço:</span>
            <span className="text-gray-900">{exampleOffer.address}</span>
          </div>
          <div className="mb-2">
            <span className="block text-gray-700 font-medium">Telefone:</span>
            <span className="text-gray-900">{exampleOffer.phone}</span>
          </div>
          {exampleOffer.workPhotos && exampleOffer.workPhotos.length > 0 && (
            <div className="mb-4">
              <span className="block text-gray-700 font-medium mb-1">Fotos do trabalho:</span>
              <div className="flex gap-2 flex-wrap">
                {exampleOffer.workPhotos.map((photo, idx) => (
                  <img
                    key={idx}
                    src={photo}
                    alt={`Foto do trabalho ${idx + 1}`}
                    className="w-64 h-64 object-cover rounded"
                  />
                ))}
              </div>
            </div>
          )}
          <Button
            className="mt-4 w-full"
            variant="outline"
            onClick={() => setIsChatOpen(true)}
          >
            Entrar em contato
          </Button>
        </CardContent>
      </Card>
      <Button
        className="fixed bottom-6 right-6 z-50 shadow-lg"
        variant="secondary"
        onClick={() => setShowUserModal(true)}
      >
        Editar perfil
      </Button>
      <Button
        className="fixed bottom-6 left-6 z-50 shadow-lg"
        variant="default"
        onClick={() => setIsChatOpen(true)}
      >
        Abrir chat
      </Button>
      <ChatModal
        open={isChatOpen}
        onOpenChange={setIsChatOpen}
        messages={chatMessages}
        onSendMessage={handleSendMessage}
      />
      <EditUserModal
        open={showUserModal}
        onOpenChange={setShowUserModal}
        onSubmit={() => setShowUserModal(false)}
      />
    </div>
  );
};

export default JobOffer;