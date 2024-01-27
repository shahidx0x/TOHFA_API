import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ProductService } from './products.service';

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const { ...productData } = req.body;
  const result = await ProductService.createProduct(productData);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Product created successfully',
    data: result,
  });
});

const createProductType = catchAsync(async (req: Request, res: Response) => {
  const { ...productTypeData } = req.body;
  const result = await ProductService.createProductType(productTypeData);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Product Type created successfully',
    data: result,
  });
});

export const ProductController = {
  createProduct,
  createProductType,
};
