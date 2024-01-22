import { PrismaClient } from '@prisma/client';
import { IUser } from '../app/modules/user/user.interface';

const prisma = new PrismaClient();

export async function isUserExist(
  email: string
): Promise<Pick<IUser, 'id' | 'name' | 'role' | 'password' | 'email'> | null> {
  return await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      name: true,
      role: true,
      password: true,
      email: true,
    },
  });
}
