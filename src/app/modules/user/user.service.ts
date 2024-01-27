import prisma from '../../../server';

const getUsers = async (options: any) => {
  const { page, limit } = options;
  const skip = parseInt(limit) * parseInt(page) - parseInt(limit) || 0;
  const take = parseInt(limit) || 10;

  const result = await prisma.user.findMany({
    skip,
    take,
  });
  const total = await prisma.user.count();
  return { total, result };
};

export const userService = {
  getUsers,
};
