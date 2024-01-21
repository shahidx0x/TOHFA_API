import express from 'express';

import { AuthRoutes } from '../modules/auth/auth.route';
import { SingleProductRoutes } from '../modules/products/singleProduct/sp.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/products',
    route: SingleProductRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
