import { z } from 'zod';

const createProductZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    type: z.string({ required_error: 'Type is required' }),
    description: z.string({ required_error: 'Description is required' }),
    quantity: z.number({ required_error: 'Quantity is required' }),
    image: z.string().optional(),
  }),
});

export const ProductValidation = {
  createProductZodSchema,
};
