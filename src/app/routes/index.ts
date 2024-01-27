import express from 'express';

import { AuthRoutes } from '../modules/auth/auth.route';
import { ProductRoutes } from '../modules/products/products.route';
import { UserRoutes } from '../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/products',
    route: ProductRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
