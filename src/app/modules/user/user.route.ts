import express from 'express';
import { UserControllers } from './user.controller';
const router = express.Router();

router.get('/fetch-all', UserControllers.getUsers);

export const UserRoutes = router;
