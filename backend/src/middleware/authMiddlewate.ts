import jwt from 'jsonwebtoken';
import { NextFunction, Response, Request } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

export type AdvancedJwtPayload = jwt.JwtPayload & {
  _id: string;
};

export interface TypedRequestBody extends Request {
  user: AdvancedJwtPayload;
}

const authMiddleware = async (
  req: TypedRequestBody,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res
      .status(403)
      .json({ error: true, message: 'Access Denied: No token provided' });

  const token = authHeader.split(' ')[1];
  if (!token)
    return res
      .status(403)
      .json({ error: true, message: 'Access Denied: No token provided' });

  try {
    const tokenDetails = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_PRIVATE_KEY!
    );

    req.user = tokenDetails as AdvancedJwtPayload;

    next();
  } catch (err) {
    res
      .status(403)
      .json({ error: true, message: 'Access Denied: Invalid token' });
  }
};

export default authMiddleware;
