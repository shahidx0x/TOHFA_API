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

export const ProductService = {
  createProduct,
  createProductType,
};
