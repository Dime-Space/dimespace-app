import React, { useState, useEffect } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from "react-hook-form"

interface RegisterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface CreateAddressDTO {
  cep: string;
  estado: string;
  cidade: string;
  rua: string;
  numero: string;
  complemento?: string;
}

interface CompanyFormStep1 {
  name: string;
  cnpj: string;
  phone: string;
  useSameAddress: boolean;
}

interface CompanyFormStep2 extends CreateAddressDTO {}

const RegisterModal: React.FC<RegisterModalProps> = ({ open, onOpenChange }) => {
  const [step, setStep] = useState(1);
  const [companyData, setCompanyData] = useState<CompanyFormStep1 | null>(null);

  const {
    register: registerStep1,
    handleSubmit: handleSubmitStep1,
    reset: resetStep1,
    watch: watchStep1,
  } = useForm<CompanyFormStep1>({
    defaultValues: { useSameAddress: false }
  });

  const {
    register: registerStep2,
    handleSubmit: handleSubmitStep2,
    reset: resetStep2,
  } = useForm<CompanyFormStep2>();

  const useSameAddress = watchStep1('useSameAddress');

  useEffect(() => {
    if (open) setStep(1);
    resetStep1();
    resetStep2();
    setCompanyData(null);
  }, [open, resetStep1, resetStep2]);

  const onSubmitStep1 = (data: CompanyFormStep1) => {
    if (data.useSameAddress) {
      handleCompanyRegister(data, undefined);
    } else {
      setCompanyData(data);
      setStep(2);
    }
  };

  const onSubmitStep2 = (address: CompanyFormStep2) => {
    if (companyData) {
      handleCompanyRegister(companyData, address);
    }
  };

  function handleCompanyRegister(company: CompanyFormStep1, address?: CompanyFormStep2) {
    const payload = {
      name: company.name,
      cnpj: company.cnpj,
      phone: company.phone,
      address: address ? address : undefined,
    };
    onOpenChange(false);
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right">
        <h2 className="text-lg font-bold mb-4 text-center">Cadastrar Empresa</h2>
        {step === 1 && (
          <form
            className="flex flex-col gap-4 items-center"
            onSubmit={handleSubmitStep1(onSubmitStep1)}
          >
            <Input placeholder="Nome da empresa" {...registerStep1('name', { required: true })} className="w-64" />
            <Input placeholder="CNPJ" {...registerStep1('cnpj', { required: true })} className="w-64" />
            <Input placeholder="Telefone" type="tel" {...registerStep1('phone', { required: true })} className="w-64" />
            <label className="flex items-center gap-2 w-64">
              <input type="checkbox" {...registerStep1('useSameAddress')} />
              Usar mesmo endereço cadastrado
            </label>
            <Button type="submit" className="w-64">
              {useSameAddress ? 'Finalizar Cadastro' : 'Prosseguir'}
            </Button>
          </form>
        )}
        {step === 2 && (
          <form
            className="flex flex-col gap-4 items-center"
            onSubmit={handleSubmitStep2(onSubmitStep2)}
          >
            <Input placeholder="CEP" {...registerStep2('cep', { required: true })} className="w-64" />
            <Input placeholder="Estado" {...registerStep2('estado', { required: true })} className="w-64" />
            <Input placeholder="Cidade" {...registerStep2('cidade', { required: true })} className="w-64" />
            <Input placeholder="Rua" {...registerStep2('rua', { required: true })} className="w-64" />
            <Input placeholder="Número" {...registerStep2('numero', { required: true })} className="w-64" />
            <Input placeholder="Complemento" {...registerStep2('complemento')} className="w-64" />
            <Button type="submit" className="w-64">Finalizar Cadastro</Button>
          </form>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default RegisterModal;