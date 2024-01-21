import { Request, Response } from 'express';
import httpStatus from 'http-status';
import ApiError from '../../../../errors/ApiError';
import catchAsync from '../../../../shared/catchAsync';
import sendResponse from '../../../../shared/sendResponse';
import { ISingleProduct } from './sp.interface';
import { SingleProductServices } from './sp.service';

const createSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const { ...singleProductData } = req.body;
  const result = await SingleProductServices.createSingleProduct(
    singleProductData
  );
  sendResponse<ISingleProduct>(res, {
    statusCode: 201,
    success: true,
    message: 'SingleProduct created successfully !',
    data: result,
  });
});

const updateSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const { ...singleProductData } = req.body;
  const result = await SingleProductServices.updateSingleProduct(
    req.query.id as string,
    singleProductData
  );
  if (!result) {
    const errorMessage = `Result is ${result}, either SingleProduct not found or update failed`;
    throw new ApiError(httpStatus.NOT_FOUND, errorMessage);
  }

  sendResponse<ISingleProduct>(res, {
    statusCode: 200,
    success: true,
    message: 'SingleProduct updated successfully !',
    data: result,
  });
});
export const SingleProductController = {
  createSingleProduct,
  updateSingleProduct,
};
