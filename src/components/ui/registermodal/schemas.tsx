import { z } from 'zod';
import { validarCPF } from '@/components/cpfchecker';

export const userStepSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  senha: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  cpf: z
    .string()
    .transform((val) => val.replace(/\D/g, ''))
    .refine((val) => val.length === 11, {
      message: 'CPF deve conter 11 dígitos',
    })
    .refine((val) => validarCPF(val), { message: 'CPF inválido' }),
  telefone: z
    .string()
    .transform((val) => val.replace(/\D/g, ''))
    .refine((val) => val.length >= 10 && val.length <= 11, {
      message: 'Telefone deve conter entre 10 e 11 dígitos',
    }),
  area: z.string().min(2, 'Área de atuação inválida'),
  skill: z.string().nonempty('Selecione uma experiência'),
});

export const addressStepSchema = z.object({
  cep: z
    .string()
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
