import express from 'express';
import { ENUM_USER_ROLE } from '../../../../enums/user';
import auth from '../../../middlewares/auth';
import validateRequest from '../../../middlewares/validateRequest';
import { SingleProductController } from './sp.controller';
import { SingleProductValidation } from './sp.validate';
const router = express.Router();

router.post(
  '/single-product',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(SingleProductValidation.createSingleProductZodSchema),
  SingleProductController.createSingleProduct
);

router.patch(
  '/single-product',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(SingleProductValidation.updateSingleProductZodSchema),
  SingleProductController.updateSingleProduct
);

export const SingleProductRoutes = router;
