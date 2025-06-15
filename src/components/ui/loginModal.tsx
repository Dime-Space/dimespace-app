import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useForm } from 'react-hook-form';
import { loginUser } from '@/services/auth/authService';

interface LoginModalProps {
  open: boolean;
  onRegisterClick: () => void;
  onOpenChange: (open: boolean) => void;
}

type LoginFormData = {
  email: string;
  password: string;
};

const LoginModal: React.FC<LoginModalProps> = ({
  open,
  onOpenChange,
  onRegisterClick,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      const result = await loginUser(data.email, data.password);
      console.log('Usuário autenticado:', result);
      // redireciona ou atualiza o estado de login
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right">
        <div className="mt-6" />
        <h2 className="text-lg font-bold mb-4 text-center">Acesse sua conta</h2>
        <form
          className="flex flex-col gap-4 items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-64">
            <Input
              placeholder="Email"
              type="email"
              {...register('email', {
                required: 'Email é obrigatório',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Email inválido',
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="w-64">
            <Input
              placeholder="Senha"
              type="password"
              {...register('password', {
                required: 'Senha é obrigatória',
                minLength: {
                  value: 6,
                  message: 'Senha deve ter pelo menos 6 caracteres',
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-64">
            Entrar
          </Button>
        </form>

        <div className="flex flex-col items-center mt-4">
          <span className="text-sm text-gray-600 mb-2">
            Não possui uma conta?
          </span>
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
};

export default LoginModal;
