import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import LoginModal from '@/components/ui/loginModal';
import RegisterModal from '@/components/ui/registerModal';
import CreateCompany from '@/components/ui/createCompany';


const Components = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  return (
    <div className="relative min-h-screen">
      <div className="absolute top-4 left-4">
        <Card className="w-64">
          <CardHeader>
            <CardTitle>Create a Job</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">Quickly create a job.</p>
            <Button className="mt-4 w-full" variant="default">Create</Button>
          </CardContent>
        </Card>
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
      <LoginModal open={isLoginOpen} onOpenChange={setIsLoginOpen} onRegisterClick={() => {
        setIsLoginOpen(false);
        setIsRegisterOpen(true);
      }} />
      <RegisterModal open={isRegisterOpen} onOpenChange={setIsRegisterOpen} />
      <CreateCompany open={isCompanyOpen} onOpenChange={setIsCompanyOpen} />
    </div>
  );
};

export default Components;