import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { userStepSchema } from './schemas';
import { Step1Data } from './types';
import { formatCPF, formatTelefone } from '@/components/formatter';

interface Props {
  onNext: (data: Step1Data) => void;
}

export const UserDataForm: React.FC<Props> = ({ onNext }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step1Data>({
    resolver: zodResolver(userStepSchema),
  });

  return (
    <form
      onSubmit={handleSubmit(onNext)}
      className="flex flex-col gap-4 items-center"
    >
      <Input placeholder="Nome" {...register('nome')} className="w-64" />
      {errors.nome && (
        <p className="text-red-500 text-sm">{errors.nome.message}</p>
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
        {...register('senha')}
        className="w-64"
      />
      {errors.senha && (
        <p className="text-red-500 text-sm">{errors.senha.message}</p>
      )}

      <Input
        placeholder="CPF"
        {...register('cpf')}
        onChange={(e) => (e.target.value = formatCPF(e.target.value))}
        className="w-64"
      />
      {errors.cpf && (
        <p className="text-red-500 text-sm">{errors.cpf.message}</p>
      )}

      <Input
        placeholder="Telefone"
        {...register('telefone')}
        onChange={(e) => (e.target.value = formatTelefone(e.target.value))}
        className="w-64"
      />
      {errors.telefone && (
        <p className="text-red-500 text-sm">{errors.telefone.message}</p>
      )}

      <Input
        placeholder="Área de atuação"
        {...register('area')}
        className="w-64"
      />
      {errors.area && (
        <p className="text-red-500 text-sm">{errors.area.message}</p>
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
