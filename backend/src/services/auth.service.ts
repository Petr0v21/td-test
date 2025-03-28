import bcrypt from 'bcrypt';
import User, { UserBodyType } from '../models/User';
import generateToken from '../utils/generateToken';
import * as dotenv from 'dotenv';
dotenv.config();

export const authService = {
  async login({ email, password }: Omit<UserBodyType, 'username'>) {
    const user = await User.findOne({
      email
    }).lean();
    if (!user) {
      throw new Error('This user not exist');
    }

    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error('Invalid password');
    }

    return await generateToken({ _id: user._id.toString() });
  },
  async signUp(args: UserBodyType) {
    const user = await User.findOne({
      email: args.email
    }).lean();
    if (user) {
      throw new Error('This user already exist');
    }

    const passwordHashed = await bcrypt.hash(
      args.password,
      Number(process.env.PASSWORD_HASH_SALT!)
    );

    const newUser = await User.create({
      ...args,
      password: passwordHashed
    });
    await newUser.save();

    return generateToken({ _id: newUser._id.toString() });
  }
};
