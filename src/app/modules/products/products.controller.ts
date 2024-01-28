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

const getProducts = catchAsync(async (req: Request, res: Response) => {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 10);
  const result = await ProductService.getProducts({ page, limit });
  const { total, ...rest } = result;
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Product fetched successfully',
    meta: {
      limit,
      page,
      total,
    },
    data: rest,
  });
});

export const ProductController = {
  getProducts,
  createProduct,
  createProductType,
};
