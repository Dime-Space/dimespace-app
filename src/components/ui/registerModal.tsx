import React, { useState, useEffect } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';

import { formatCPF, formatTelefone, formatCEP } from '@/components/formatter';
import { validarCPF } from '../cpfchecker';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Esquema para o passo 1
const userStepSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  senha: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  cpf: z
    .string()
    .transform((val) => val.replace(/\D/g, '')) // remove tudo que não for dígito
    .refine((val) => val.length === 11, {
      message: 'CPF deve conter exatamente 11 dígitos numéricos',
    })
    .refine((val) => validarCPF(val), {
      message: 'CPF inválido',
    }),
  telefone: z
    .string()
    .transform((val) => val.replace(/\D/g, '')) // remove () - espaço etc
    .refine((val) => val.length >= 10 && val.length <= 11, {
      message: 'Telefone deve conter entre 10 e 11 dígitos numéricos',
    }),
  area: z.string().min(2, 'Área de atuação inválida'),
  skill: z.string().nonempty('Selecione uma experiência'),
});
// Esquema para o passo 2
const addressStepSchema = z.object({
  cep: z
    .string()
    .min(8, 'CEP inválido')
    .max(9, 'CEP inválido')
    .regex(
      /^\d{5}-?\d{3}$/,
      'CEP deve ter 8 dígitos ou estar no formato 00000-000',
    ),
  estado: z.string().min(2, 'Estado inválido'),
  cidade: z.string().min(2, 'Cidade inválida'),
  rua: z.string().min(2, 'Rua inválida'),
  numero: z.string().min(1, 'Número inválido'),
  complemento: z.string().optional(),
});

// Tipagem com inferência do Zod
type Step1Data = z.infer<typeof userStepSchema>;
type Step2Data = z.infer<typeof addressStepSchema>;

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
    formState: { errors: errorsStep1 },
    reset: resetStep1,
  } = useForm<Step1Data>({
    resolver: zodResolver(userStepSchema),
  });

  const {
    register: registerStep2,
    handleSubmit: handleSubmitStep2,
    formState: { errors: errorsStep2 },
    reset: resetStep2,
  } = useForm<Step2Data>({
    resolver: zodResolver(addressStepSchema),
  });

  useEffect(() => {
    if (open) setStep(1);
    resetStep1();
    resetStep2();
  }, [open, resetStep1, resetStep2]);

  const onSubmitStep1 = (data: Step1Data) => {
    setStep(2);
  };

  const onSubmitStep2 = (data: Step2Data) => {
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
              {...registerStep1('nome')}
              className="w-64"
            />
            {errorsStep1.nome && (
              <p className="text-red-500 text-sm">{errorsStep1.nome.message}</p>
            )}

            <Input
              placeholder="Email"
              type="email"
              {...registerStep1('email')}
              className="w-64"
            />
            {errorsStep1.email && (
              <p className="text-red-500 text-sm">
                {errorsStep1.email.message}
              </p>
            )}

            <Input
              placeholder="Senha"
              type="password"
              {...registerStep1('senha')}
              className="w-64"
            />
            {errorsStep1.senha && (
              <p className="text-red-500 text-sm">
                {errorsStep1.senha.message}
              </p>
            )}

            <Input
              placeholder="CPF"
              {...registerStep1('cpf')}
              onChange={(e) => {
                e.target.value = formatCPF(e.target.value);
              }}
              className="w-64"
            />
            {errorsStep1.cpf && (
              <p className="text-red-500 text-sm">{errorsStep1.cpf.message}</p>
            )}

            <Input
              placeholder="Telefone"
              type="tel"
              {...registerStep1('telefone')}
              onChange={(e) => {
                e.target.value = formatTelefone(e.target.value);
              }}
              className="w-64"
            />
            {errorsStep1.telefone && (
              <p className="text-red-500 text-sm">
                {errorsStep1.telefone.message}
              </p>
            )}

            <Input
              placeholder="Área de atuação"
              {...registerStep1('area')}
              className="w-64"
            />
            {errorsStep1.area && (
              <p className="text-red-500 text-sm">{errorsStep1.area.message}</p>
            )}

            <select
              {...registerStep1('skill')}
              className="w-64 px-3 py-2 border rounded-md text-gray-700"
              defaultValue=""
            >
              <option value="" disabled>
                Experiência
              </option>
              <option value="intern">Estagiário</option>
              <option value="junior">Junior</option>
              <option value="mid-level">Pleno</option>
              <option value="senior">Senior</option>
            </select>
            {errorsStep1.skill && (
              <p className="text-red-500 text-sm">
                {errorsStep1.skill.message}
              </p>
            )}

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
              {...registerStep2('cep')}
              onChange={(e) => {
                e.target.value = formatCEP(e.target.value);
              }}
              className="w-64"
            />
            {errorsStep2.cep && (
              <p className="text-red-500 text-sm">{errorsStep2.cep.message}</p>
            )}

            <Input
              placeholder="Estado"
              {...registerStep2('estado')}
              className="w-64"
            />
            {errorsStep2.estado && (
              <p className="text-red-500 text-sm">
                {errorsStep2.estado.message}
              </p>
            )}

            <Input
              placeholder="Cidade"
              {...registerStep2('cidade')}
              className="w-64"
            />
            {errorsStep2.cidade && (
              <p className="text-red-500 text-sm">
                {errorsStep2.cidade.message}
              </p>
            )}

            <Input
              placeholder="Rua"
              {...registerStep2('rua')}
              className="w-64"
            />
            {errorsStep2.rua && (
              <p className="text-red-500 text-sm">{errorsStep2.rua.message}</p>
            )}

            <Input
              placeholder="Número"
              {...registerStep2('numero')}
              className="w-64"
            />
            {errorsStep2.numero && (
              <p className="text-red-500 text-sm">
                {errorsStep2.numero.message}
              </p>
            )}

            <Input
              placeholder="Complemento"
              {...registerStep2('complemento')}
              className="w-64"
            />
            {/* Campo opcional — não precisa exibir erro */}

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
