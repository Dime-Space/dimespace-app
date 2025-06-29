import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { companyStepSchema } from '@/schemas/schemas';
import { CompanyStepData } from '@/types/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { formatTelefone } from '@/components/formatter';

interface Props {
  onNext: (data: CompanyStepData) => void;
}

export const CompanyDataForm: React.FC<Props> = ({ onNext }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CompanyStepData>({
    resolver: zodResolver(companyStepSchema),
    defaultValues: {
      useSameAddress: false,
    },
  });

  const useSameAddress = watch('useSameAddress');

  return (
    <form
      onSubmit={handleSubmit(onNext)}
      className="flex flex-col gap-4 items-center"
    >
      <Input
        placeholder="Nome da empresa"
        {...register('name')}
        className="w-64"
      />
      {errors.name && (
        <p className="text-red-500 text-sm">{errors.name.message}</p>
      )}

      <Input placeholder="CNPJ" {...register('cnpj')} className="w-64" />
      {errors.cnpj && (
        <p className="text-red-500 text-sm">{errors.cnpj.message}</p>
      )}

      <Input
        placeholder="Telefone"
        {...register('phone')}
        className="w-64"
        onChange={(e) => {
          const value = formatTelefone(e.target.value);
          setValue('phone', value);
        }}
      />
      {errors.phone && (
        <p className="text-red-500 text-sm">{errors.phone.message}</p>
      )}

      <label className="flex items-center gap-2 w-64">
        <input type="checkbox" {...register('useSameAddress')} />
        Usar mesmo endereço cadastrado
      </label>

      <Button type="submit" className="w-64">
        {useSameAddress ? 'Finalizar Cadastro' : 'Prosseguir'}
      </Button>
    </form>
  );
};

export default CompanyDataForm;
