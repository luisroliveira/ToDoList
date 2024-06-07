import { z } from 'zod';

export const validateDescription = z.string().max(300);
export const validateName = z.string().min(1);
export const validateEmail = z.string().trim().min(1);
export const Membro = z.object({
  email: z
    .string({ required_error: 'O nickname é obrigatório.' })
    .trim()
    .min(1),
  name: z
    .string({
      required_error: 'O nome é obrigatório.',
    })
    .min(1),
  password: z.string({ required_error: 'A senha é obrigatória.' }).min(1),
  description: z.string({ required_error: 'A descrição é obrigatória.' }),
});

export const Comment = z.object({
  membroId: z.string().min(1),
  prioridade: z.string().min(1),
  dataTermino: z.coerce.date(),
  describe: z.string().min(1),
  finalizada: z.boolean()
});

// DATA TRANSFER OBJECT
