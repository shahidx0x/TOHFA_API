import httpStatus from 'http-status';
import ApiError from '../../../../errors/ApiError';
import { ISingleProduct } from './sp.interface';
import { SingleProduct } from './sp.model';

const createSingleProduct = async (
  payload: ISingleProduct
): Promise<ISingleProduct> => {
  try {
    const singleProduct = await SingleProduct.create(payload);
    if (singleProduct) {
      return singleProduct;
    } else {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'SingleProduct Creation Failed'
      );
    }
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Something went wrong'
    );
  }
};
const updateSingleProduct = async (
  id: string,
  payload: Partial<ISingleProduct>
): Promise<ISingleProduct | null> => {
  try {
    const result = await SingleProduct.findOneAndUpdate({ _id: id }, payload, {
      new: true,
    });
    return result;
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Something went wrong'
    );
  }
};
export const SingleProductServices = {
  createSingleProduct,
  updateSingleProduct,
};
