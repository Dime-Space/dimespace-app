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
