import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { UserType } from '../models/User';
dotenv.config();

const generateToken = async (payload: Pick<UserType, '_id'>) => {
  try {
    const accessToken = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_PRIVATE_KEY!,
      { expiresIn: '60m' }
    );
    return Promise.resolve({ accessToken });
  } catch (err) {
    return Promise.reject(err);
  }
};

export default generateToken;
