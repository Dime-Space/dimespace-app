import { useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import CompanyDataForm from '@/components/ui/registermodal/companyDataForm';
import { AddressDataForm } from '@/components/ui/registermodal/addressDataForm';
import { CompanyStepData, AddressStepData } from '@/types/types';
import { createCompany } from '@/services/company/companyService';
import { useAuth } from '@/contexts/AuthContext';

type AddressFull = {
  cep: string;
  state: string;
  city: string;
  street: string;
  number: string;
  complement?: string;
};

type AddressById = {
  id: string;
};

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateCompany: React.FC<Props> = ({ open, onOpenChange }) => {
  const [step, setStep] = useState(1);
  const [companyData, setCompanyData] = useState<CompanyStepData | null>(null);
  const { user } = useAuth();

  const handleFinalSubmit = async (
    company: CompanyStepData,
    address?: AddressStepData,
  ) => {
    let addressPayload: AddressFull | AddressById | undefined;

    if (company.useSameAddress) {
      if (user?.address_id) {
        addressPayload = { id: user.address_id };
      } else {
        addressPayload = undefined; // ou lançar erro, dependendo do caso
      }
    } else {
      addressPayload = address;
    }

    const payload = {
      name: company.name,
      cnpj: company.cnpj,
      phone: company.phone,
      address: addressPayload,
    };

    try {
      const response = await createCompany(payload);
      console.log('Empresa criada:', response);
      onOpenChange(false); // agora funciona
    } catch (error) {
      console.error('Erro ao criar empresa:', error);
    }
  };

  const handleStep1Submit = (data: CompanyStepData) => {
    if (data.useSameAddress) {
      handleFinalSubmit(data); // já chama direto se marcar usar mesmo endereço
    } else {
      setCompanyData(data);
      setStep(2);
    }
  };

  const handleStep2Submit = (address: AddressStepData) => {
    if (companyData) {
      handleFinalSubmit(companyData, address);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right">
        <h2 className="text-lg font-bold mb-4 text-center">
          Cadastrar Empresa
        </h2>

        {step === 1 && <CompanyDataForm onNext={handleStep1Submit} />}

        {step === 2 && (
          <>
            <AddressDataForm onSubmit={handleStep2Submit} />
            <button
              onClick={() => setStep(1)}
              className="mt-4 text-blue-500 underline"
            >
              Voltar
            </button>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CreateCompany;
