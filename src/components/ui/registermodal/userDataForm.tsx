import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { userStepSchema } from '../../../schemas/schemas';
import { UserStepData } from '../../../types/types';
import { formatCPF, formatTelefone } from '@/components/formatter';

interface UserDataFormProps {
  onNext: (data: UserStepData) => void;
  defaultValues?: UserStepData; // <-- Aqui
}

export const UserDataForm: React.FC<UserDataFormProps> = ({
  onNext,
  defaultValues,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<UserStepData>({
    defaultValues,
    resolver: zodResolver(userStepSchema),
  });

  const cpf = watch('cpf');
  const phone = watch('phone');

  return (
    <form
      onSubmit={handleSubmit(onNext)}
      className="flex flex-col gap-4 items-center"
    >
      <Input placeholder="Nome" {...register('name')} className="w-64" />
      {errors.name && (
        <p className="text-red-500 text-sm">{errors.name.message}</p>
      )}

      <Input
        placeholder="Email"
        type="email"
        {...register('email')}
        className="w-64"
      />
      {errors.email && (
        <p className="text-red-500 text-sm">{errors.email.message}</p>
      )}

      <Input
        placeholder="Senha"
        type="password"
        {...register('password')}
        className="w-64"
      />
      {errors.password && (
        <p className="text-red-500 text-sm">{errors.password.message}</p>
      )}

      <Input
        placeholder="CPF"
        {...register('cpf')}
        value={cpf}
        onChange={(e) => setValue('cpf', formatCPF(e.target.value))}
        className="w-64"
      />
      {errors.cpf && (
        <p className="text-red-500 text-sm">{errors.cpf.message}</p>
      )}

      <Input
        placeholder="Telefone"
        {...register('phone')}
        value={phone}
        onChange={(e) => setValue('phone', formatTelefone(e.target.value))}
        className="w-64"
      />
      {errors.phone && (
        <p className="text-red-500 text-sm">{errors.phone.message}</p>
      )}

      <Input
        placeholder="Área de atuação"
        {...register('area')}
        className="w-64"
      />
      {errors.area && (
        <p className="text-red-500 text-sm">{errors.area.message}</p>
      )}

      <Input
        placeholder="Biografia"
        {...register('biography')}
        className="w-64"
      />

      <Input
        placeholder="Data de nascimento"
        type="date"
        {...register('birthdate')}
        className="w-64"
      />
      {errors.birthdate && (
        <p className="text-red-500 text-sm">{errors.birthdate.message}</p>
      )}

      <select
        {...register('skill')}
        className="w-64 px-3 py-2 border rounded-md"
      >
        <option value="">Experiência</option>
        <option value="intern">Estagiário</option>
        <option value="junior">Junior</option>
        <option value="mid-level">Pleno</option>
        <option value="senior">Senior</option>
      </select>
      {errors.skill && (
        <p className="text-red-500 text-sm">{errors.skill.message}</p>
      )}

      <Button type="submit" className="w-64">
        Prosseguir
      </Button>
    </form>
  );
};
