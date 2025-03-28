import { Router } from 'express';
import authRoutes from './auth.router';
import userRoutes from './users.router';
import dataRoutes from './data.router';

const router = Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/data', dataRoutes);

export default router;
