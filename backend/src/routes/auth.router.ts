import { Request, Response, Router } from 'express';
import { body, validationResult } from 'express-validator';
import { UserBodyType } from '../models/User';
import { authService } from '../services/auth.service';

const router = Router();

router.post(
  '/signup',
  [
    body('email').isEmail().withMessage('Invalid email'),
    body('password')
      .isLength({ min: 6, max: 32 })
      .withMessage('Min Length of password must be more than 6'),
    body('username')
      .isLength({ min: 6, max: 64 })
      .withMessage('Min Length of password must be more than 6')
  ],
  async (req: Request<{}, {}, UserBodyType>, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const result = await authService.signUp(req.body);
      res.status(201).json(result);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: true, message: err.message });
    }
  }
);

router.post(
  '/signin',
  [
    body('email')
      .isEmail()
      .withMessage('Invalid email')
      .default('test@gmail.com'),
    body('password')
      .isLength({ min: 6, max: 32 })
      .withMessage('Min Length of password must be more than 6')
      .default('01010101')
  ],
  async (
    req: Request<{}, {}, Omit<UserBodyType, 'username'>>,
    res: Response
  ) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const result = await authService.login(req.body);
      res.status(201).json(result);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: true, message: err.message });
    }
  }
);

export default router;
