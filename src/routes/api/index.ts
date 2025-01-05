import { Router } from 'express';
import { thoughtsRoutes } from './routes-thoughts.js';
import { usersRoutes } from './routes-users.js';

const router = Router();

router.use('/thoughts', thoughtsRoutes);
router.use('/users', usersRoutes);

export default router;