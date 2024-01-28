import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../server';
import { IProduct, IproductType } from './products.interface';

const createProduct = async (payload: IProduct): Promise<IProduct> => {
  try {
    const product = await prisma.product.create({ data: payload });
    return product;
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Something went wrong'
    );
  }
};

const createProductType = async (
  payload: IproductType
): Promise<IproductType> => {
  try {
    const productType = await prisma.productType.create({ data: payload });
    return productType;
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Something went wrong'
    );
  }
};

const getProducts = async (options: any) => {
  const { page, limit } = options;
  const skip = parseInt(limit) * parseInt(page) - parseInt(limit) || 0;
  const take = parseInt(limit) || 10;

  const result = await prisma.product.findMany({
    skip,
    take,
    include: {
      type: true,
    },
  });
  const total = await prisma.product.count();
  return { total, result };
};

export const ProductService = {
  getProducts,
  createProduct,
  createProductType,
};
