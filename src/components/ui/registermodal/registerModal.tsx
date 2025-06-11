import { Sheet, SheetContent } from '@/components/ui/sheet';
import { UserDataForm } from './userDataForm.tsx';
import { AddressDataForm } from './addressDataForm.tsx';
import { useState } from 'react';
import { Step1Data, Step2Data } from './types';
import { registerUser } from '@/services/user/userServices.tsx';

interface RegisterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({
  open,
  onOpenChange,
}) => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState<Step1Data | null>(null); // <-- Guardar os dados do passo 1

  const handleNext = (data: Step1Data) => {
    setUserData(data);
    setStep(2);
  };

  const handleFinish = async (addressData: Step2Data) => {
    if (!userData) return;

    try {
      const result = await registerUser(userData, addressData);
      console.log('Usuário criado:', result);
      onOpenChange(false);
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right">
        <h2 className="text-lg font-bold mb-4 text-center">Crie sua conta</h2>
        {step === 1 ? (
          <UserDataForm onNext={handleNext} />
        ) : (
          <AddressDataForm onSubmit={handleFinish} />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default RegisterModal;
