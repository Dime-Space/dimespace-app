import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useForm} from "react-hook-form"

interface LoginModalProps {
  open: boolean;
  onRegisterClick: () => void;
  onOpenChange: (open: boolean) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, onOpenChange, onRegisterClick }) => {

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right">
        <div className="mt-6" />
        <h2 className="text-lg font-bold mb-4 text-center">Acesse sua conta</h2>
        <form className="flex flex-col gap-4 items-center">
          <Input placeholder="Email" type="email" required className="w-64" />
          <Input placeholder="Senha" type="password" required className="w-64" />
          <Button type="submit" className="w-64">Entrar</Button>
        </form>
        <div className="flex flex-col items-center mt-4">
          <span className="text-sm text-gray-600 mb-2">Não possui uma conta?</span>
          <Button
            type="button"
            variant="default"
            className="w-64"
            onClick={onRegisterClick}
          >
            Registrar
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default LoginModal;