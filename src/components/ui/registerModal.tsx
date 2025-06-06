import React, { useState, useEffect } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';

interface RegisterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({
  open,
  onOpenChange,
}) => {
  const [step, setStep] = useState(1);
  const {
    register: registerStep1,
    handleSubmit: handleSubmitStep1,
    reset: resetStep1,
  } = useForm();

  const {
    register: registerStep2,
    handleSubmit: handleSubmitStep2,
    reset: resetStep2,
  } = useForm();

  useEffect(() => {
    if (open) setStep(1);
    resetStep1();
    resetStep2();
  }, [open, resetStep1, resetStep2]);

  const onSubmitStep1 = (data: any) => {
    setStep(2);
  };

  const onSubmitStep2 = (data: any) => {
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right">
        <h2 className="text-lg font-bold mb-4 text-center">Crie sua conta</h2>
        {step === 1 && (
          <form
            className="flex flex-col gap-4 items-center"
            onSubmit={handleSubmitStep1(onSubmitStep1)}
          >
            <Input
              placeholder="Nome"
              {...registerStep1('nome', { required: true })}
              className="w-64"
            />
            <Input
              placeholder="Email"
              type="email"
              {...registerStep1('email', { required: true })}
              className="w-64"
            />
            <Input
              placeholder="Senha"
              type="password"
              {...registerStep1('senha', { required: true })}
              className="w-64"
            />
            <Input
              placeholder="CPF"
              {...registerStep1('cpf', { required: true })}
              className="w-64"
            />
            <Input
              placeholder="Telefone"
              type="tel"
              {...registerStep1('telefone', { required: true })}
              className="w-64"
            />
            <Input
              placeholder="Área de atuação"
              {...registerStep1('area', { required: true })}
              className="w-64"
            />
            <select
              {...registerStep1('skill', { required: true })}
              className="w-64 px-3 py-2 border rounded-md text-gray-700"
              defaultValue=""
              name="skill"
            >
              <option value="" disabled>
                Experiência
              </option>
              <option value="intern">Estagiário</option>
              <option value="junior">Junior</option>
              <option value="mid-level">Pleno</option>
              <option value="senior">Senior</option>
            </select>

            <Button type="submit" className="w-64">
              Prosseguir
            </Button>
          </form>
        )}
        {step === 2 && (
          <form
            className="flex flex-col gap-4 items-center"
            onSubmit={handleSubmitStep2(onSubmitStep2)}
          >
            <Input
              placeholder="CEP"
              {...registerStep2('cep', { required: true })}
              className="w-64"
            />
            <Input
              placeholder="Estado"
              {...registerStep2('estado', { required: true })}
              className="w-64"
            />
            <Input
              placeholder="Cidade"
              {...registerStep2('cidade', { required: true })}
              className="w-64"
            />
            <Input
              placeholder="Rua"
              {...registerStep2('rua', { required: true })}
              className="w-64"
            />
            <Input
              placeholder="Número"
              {...registerStep2('numero', { required: true })}
              className="w-64"
            />
            <Input
              placeholder="Complemento"
              {...registerStep2('complemento')}
              className="w-64"
            />
            <Button type="submit" className="w-64">
              Finalizar Cadastro
            </Button>
          </form>
        )}
      </SheetContent>
    </Sheet>
  );
};
export default RegisterModal;
