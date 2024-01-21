import { Request, Response } from 'express';
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

export const SingleProductController = {
  createSingleProduct,
};
