import { z } from 'zod';

export const validateName = z.string().min(1);
export const validateEmail = z.string().trim().min(1);
export const Membro = z.object({
  email: z
    .string({ required_error: 'O nickname é obrigatório.' })
    .email()
    .trim()
    .min(1),
  nome: z
    .string({
      required_error: 'O nome é obrigatório.',
    })
    .min(1),
  password: z.string({ required_error: 'A senha é obrigatória.' }).min(1),
});

export const Tarefa = z.object({
  nome: z
    .string({
      required_error: 'O nome é obrigatório.',
    })
    .min(1),
  descricao: z.string().max(140),
  prioridade: z.string().min(1),
  membroId: z.string().min(1),
});

// DATA TRANSFER OBJECT
