import { Response, Router } from 'express';
import authMiddleware from '../middleware/authMiddlewate';
import { RequestExt } from '../types/request';
import { userService } from '../services/user.service';

const router = Router();

router.get('/me', authMiddleware, async (req: RequestExt, res: Response) => {
  try {
    const candidate = await userService.findById(req.user._id);

    if (!candidate) {
      res.status(400).json({ message: 'Not found!' });
    }

    res.status(200).json({ ...candidate, password: null });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Something go wrong!' });
  }
});

export default router;
