import express from 'express';
import validateRequest from '../../middlewares/validateRequest';

import { ProductController } from './products.controller';
import { ProductValidation } from './products.validate';
const router = express.Router();

router.get('/product-list', ProductController.getProducts);
router.post(
  '/create-product',
  validateRequest(ProductValidation.createProductZodSchema),
  ProductController.createProduct
);

router.post(
  '/create-product-type',
  validateRequest(ProductValidation.createProductTypeZodSchema),
  ProductController.createProductType
);

export const ProductRoutes = router;
