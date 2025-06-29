import { z } from 'zod';
import { userStepSchema, addressStepSchema, companyStepSchema } from '../schemas/schemas';

export type UserStepData = z.infer<typeof userStepSchema>;
export type AddressStepData = z.infer<typeof addressStepSchema>;
export type CompanyStepData = z.infer<typeof companyStepSchema>;

export type UserType = {
  id: number;
  name: string;
  phone: string;
  cpf: string;
  email: string;
  skill: string;
  area: string;
  biography: string;
  credits: number;
  birthdate: string;
  image_key?: string | null;
  address: {
    city: string;
    state: string;
    street: string;
    number: string;
    complement?: string;
  };
};

type AddressType = {
  cep: string;
  state: string;
  city: string;
  street: string;
  number: string;
  complement?: string;
};

export interface Company {
  id: number;
  name: string;
  cnpj: string;
  phone: string;
  image_key: string | null;
  created_at: string; 
  updated_at: string | null;
  deleted_at: string | null;
}

export interface User {
  id: number;
  name: string;
  email: string;
  image_key: string | null;
}

export interface Proposal {
  id: number;
  company_id: number;
  user_id: number;
  title: string;
  description: string;
  value: string; // valor como string com casas decimais
  final_date: string; // ISO date string
  skill_requested: string; // Ex: "Node.js, React, PostgreSQL"
  status: string; // Ex: "aberta"
  company: Company;
  user: User;
  created_at: string; // ISO date string
  updated_at: string;
  deleted_at: string | null;
}