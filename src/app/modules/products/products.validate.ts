import { z } from 'zod';

const createProductZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    typeId: z.number({ required_error: 'TypeId is required' }),
    description: z.string({ required_error: 'Description is required' }),
    quantity: z.number({ required_error: 'Quantity is required' }),
    image: z.string().optional(),
  }),
});

const createProductTypeZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
  }),
});

export const ProductValidation = {
  createProductZodSchema,
  createProductTypeZodSchema,
};
