import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Step2Data } from './types';

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
            setValue('estado', data.uf);
            setValue('cidade', data.localidade);
            setValue('rua', data.logradouro);
          }
        })
        .catch((err) => console.error('Erro ao buscar CEP:', err));
    }
  }, [cepValue, setValue]);

  return (
    <form
      className="flex flex-col gap-4 items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        placeholder="CEP"
        {...register('cep', { required: 'CEP obrigatório' })}
        onChange={(e) => {
          const formatted = formatCEP(e.target.value);
          setValue('cep', formatted);
        }}
        value={cepValue}
        className="w-64"
      />
      {errors.cep && (
        <p className="text-red-500 text-sm">{errors.cep.message}</p>
      )}

      <Input
        placeholder="Estado"
        {...register('estado', { required: 'Estado obrigatório' })}
        className="w-64"
        readOnly
      />
      {errors.estado && (
        <p className="text-red-500 text-sm">{errors.estado.message}</p>
      )}

      <Input
        placeholder="Cidade"
        {...register('cidade', { required: 'Cidade obrigatória' })}
        className="w-64 bg-gray-100 cursor-not-allowed select-none"
        readOnly
      />
      {errors.cidade && (
        <p className="text-red-500 text-sm">{errors.cidade.message}</p>
      )}

      <Input
        placeholder="Rua"
        {...register('rua', { required: 'Rua obrigatória' })}
        className="w-64 bg-gray-100 cursor-not-allowed select-none"
        readOnly
      />
      {errors.rua && (
        <p className="text-red-500 text-sm">{errors.rua.message}</p>
      )}

      <Input
        placeholder="Número"
        {...register('numero', { required: 'Número obrigatório' })}
        className="w-64 bg-gray-100 cursor-not-allowed select-none"
      />
      {errors.numero && (
        <p className="text-red-500 text-sm">{errors.numero.message}</p>
      )}

      <Input
        placeholder="Complemento"
        {...register('complemento')}
        className="w-64"
      />

      <Button type="submit" className="w-64">
        Finalizar Cadastro
      </Button>
    </form>
  );
};
