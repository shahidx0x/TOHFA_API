import { z } from 'zod';

const createSingleProductZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    description: z.string({ required_error: 'Description is required' }),
    image: z.string().optional(),
  }),
});
export const SingleProductValidation = {
  createSingleProductZodSchema,
};
