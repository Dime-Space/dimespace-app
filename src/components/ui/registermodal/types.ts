import { z } from 'zod';
import { userStepSchema, addressStepSchema } from './schemas';

export type Step1Data = z.infer<typeof userStepSchema>;
export type Step2Data = z.infer<typeof addressStepSchema>;
