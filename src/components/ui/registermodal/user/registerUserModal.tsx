import { Sheet, SheetContent } from '@/components/ui/sheet';
import { UserDataForm } from '../userDataForm.tsx';
import { AddressDataForm } from '../addressDataForm.tsx';
import { useState } from 'react';
import { UserStepData, AddressStepData } from '../../../../types/types.ts';
import { registerUser } from '@/services/user/userServices.tsx';

interface RegisterUserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RegisterUserModal: React.FC<RegisterUserModalProps> = ({
  open,
  onOpenChange,
}) => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState<UserStepData | null>(null); // <-- Guardar os dados do passo 1

  const handleNext = (data: UserStepData) => {
    setUserData(data);
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleFinish = async (addressData: AddressStepData) => {
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

        {step === 1 && <UserDataForm onNext={handleNext} />}

        {step === 2 && (
          <>
            <button
              type="button"
              onClick={handleBack}
              className="mb-4 px-3 py-1 text-sm text-gray-600 hover:text-gray-900"
            >
              ← Voltar
            </button>

            <AddressDataForm onSubmit={handleFinish} />
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default RegisterUserModal;
