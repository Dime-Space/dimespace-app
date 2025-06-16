'use client';

import type React from 'react';

import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Step2Data {
  cep: string;
  state: string;
  city: string;
  street: string;
  number: string;
  complement?: string;
}

interface AddressDataFormProps {
  onSubmit: (data: Step2Data) => void;
}

export const AddressDataForm: React.FC<AddressDataFormProps> = ({
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Step2Data>();

  const cepValue = watch('cep');

  // Formatar CEP ao digitar
  const formatCEP = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .slice(0, 9);
  };

  // Buscar dados do endereço com o CEP
  useEffect(() => {
    const cleanedCep = cepValue?.replace(/\D/g, '');
    if (cleanedCep?.length === 8) {
      fetch(`https://viacep.com.br/ws/${cleanedCep}/json/`)
        .then((res) => res.json())
        .then((data) => {
          if (!data.erro) {
            setValue('state', data.uf);
            setValue('city', data.localidade);
            setValue('street', data.logradouro);
          }
        })
        .catch((err) => console.error('Erro ao buscar CEP:', err));
    }
  }, [cepValue, setValue]);

  const handleFormSubmit = (data: Step2Data) => {
    console.log('Form data being submitted:', data);
    onSubmit(data);
  };

  return (
    <form
      className="flex flex-col gap-4 items-center"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <Input
        placeholder="CEP"
        {...register('cep', {
          required: 'CEP obrigatório',
          onChange: (e) => {
            const formatted = formatCEP(e.target.value);
            setValue('cep', formatted);
          },
        })}
        className="w-64"
      />
      {errors.cep && (
        <p className="text-red-500 text-sm">{errors.cep.message}</p>
      )}

      <Input
        placeholder="Estado"
        {...register('state', { required: 'Estado obrigatório' })}
        className="w-64 bg-gray-100 cursor-not-allowed select-none"
        readOnly
      />
      {errors.state && (
        <p className="text-red-500 text-sm">{errors.state.message}</p>
      )}

      <Input
        placeholder="Cidade"
        {...register('city', { required: 'Cidade obrigatória' })}
        className="w-64 bg-gray-100 cursor-not-allowed select-none"
        readOnly
      />
      {errors.city && (
        <p className="text-red-500 text-sm">{errors.city.message}</p>
      )}

      <Input
        placeholder="Rua"
        {...register('street', { required: 'Rua obrigatória' })}
        className="w-64 bg-gray-100 cursor-not-allowed select-none"
        readOnly
      />
      {errors.street && (
        <p className="text-red-500 text-sm">{errors.street.message}</p>
      )}

      <Input
        placeholder="Número"
        {...register('number', { required: 'Número obrigatório' })}
        className="w-64"
      />
      {errors.number && (
        <p className="text-red-500 text-sm">{errors.number.message}</p>
      )}

      <Input
        placeholder="Complemento"
        {...register('complement')}
        className="w-64"
      />

      <Button type="submit" className="w-64">
        Finalizar Cadastro
      </Button>
    </form>
  );
};
