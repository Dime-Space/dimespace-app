import { z } from 'zod';
import { userStepSchema, addressStepSchema, companyStepSchema } from '../schemas/schemas';

export type UserStepData = z.infer<typeof userStepSchema>;
export type AddressStepData = z.infer<typeof addressStepSchema>;
export type CompanyStepData = z.infer<typeof companyStepSchema>;
