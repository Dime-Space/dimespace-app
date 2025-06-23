import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import LoginModal from '@/components/ui/loginModal';
import RegisterUserModal from '@/components/ui/registermodal/user/registerUserModal';
import RegisterCompanyModal from '@/components/ui/registermodal/company/registerCompanyModal';
import ChatModal from '@/components/ui/chatModal';
import EditUserModal from '@/components/ui/editmodal/editUserModal';
import EditCompanyModal from '@/components/ui/editmodal/editCompanyModal';

const Components = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showCompanyModal, setShowCompanyModal] = useState(false);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<
    { id: number; text: string; sender: 'bot' | 'user' }[]
  >([{ id: 1, text: 'Olá! Como posso ajudar?', sender: 'bot' }]);

  const handleSendMessage = (message: string) => {
    setChatMessages((msgs) => [
      ...msgs,
      { id: msgs.length + 1, text: message, sender: 'user' as const },
      {
        id: msgs.length + 2,
        text: 'Recebi sua mensagem!',
        sender: 'bot' as const,
      },
    ]);
  };

  return (
    <div className="relative min-h-screen">
      <div className="absolute top-4 left-4">
        <Card className="w-64">
          <CardHeader>
            <CardTitle>Create a Job</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">Quickly create a job.</p>
            <Button className="mt-4 w-full" variant="default">
              Create
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="p-4">
        <button onClick={() => setShowUserModal(true)}>Editar usuário</button>
        <button onClick={() => setShowCompanyModal(true)}>
          Editar empresa
        </button>
      </div>

      <div className="absolute top-4 right-4 flex items-center space-x-2">
        <Avatar>
          <img src="" alt="User Avatar" />
        </Avatar>
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="outline">Menu</Button>
          </SheetTrigger>
          <SheetContent side="right">
            <h2 className="text-lg font-bold">Profile</h2>
            <p>Profile...</p>
            <div className="mt-4">
              <label className="flex items-center space-x-2">
                <Checkbox />
                <span>Check me</span>
              </label>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Notes
              </label>
              <Textarea placeholder="Write something..." />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex flex-col items-center justify-center min-h-svh">
        <Input placeholder="search..." />
        <Button>Click me</Button>
      </div>

      <Button
        className="fixed bottom-6 right-32 z-50 shadow-lg"
        variant="secondary"
        onClick={() => setIsCompanyOpen(true)}
      >
        Cadastrar Empresa
      </Button>

      <Button
        className="fixed bottom-6 right-6 z-50 shadow-lg"
        variant="default"
        onClick={() => setIsLoginOpen(true)}
      >
        Entrar
      </Button>

      <Button
        className="fixed bottom-6 right-80 z-50 shadow-lg"
        onClick={() => setShowUserModal(true)}
      >
        Editar usuário
      </Button>
      <Button
        className="fixed bottom-6 right-120 z-50 shadow-lg"
        onClick={() => setShowCompanyModal(true)}
      >
        Editar empresa
      </Button>

      {}
      <Button
        className="fixed bottom-6 left-6 z-50 shadow-lg"
        variant="default"
        onClick={() => setIsChatOpen(true)}
      >
        Abrir Chat
      </Button>

      <ChatModal
        open={isChatOpen}
        onOpenChange={setIsChatOpen}
        messages={chatMessages}
        onSendMessage={handleSendMessage}
      />

      <LoginModal
        open={isLoginOpen}
        onOpenChange={setIsLoginOpen}
        onRegisterClick={() => {
          setIsLoginOpen(false);
          setIsRegisterOpen(true);
        }}
      />
      <RegisterUserModal
        open={isRegisterOpen}
        onOpenChange={setIsRegisterOpen}
      />
      <RegisterCompanyModal
        open={isCompanyOpen}
        onOpenChange={setIsCompanyOpen}
      />
      <EditUserModal
        open={showUserModal}
        onOpenChange={setShowUserModal}
        onSubmit={(data) => {
          console.log('User data:', data);
          setShowUserModal(false);
        }}
      />

      <EditCompanyModal
        open={showCompanyModal}
        onOpenChange={setShowCompanyModal}
        onSubmit={(data) => {
          console.log('Company data:', data);
          setShowCompanyModal(false);
        }}
      />
    </div>
  );
};

export default Components;
