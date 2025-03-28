import mongoose from 'mongoose';
import User from '../models/User';

export const userService = {
  async findById(id: string) {
    return User.findById(id).lean();
  }
};
