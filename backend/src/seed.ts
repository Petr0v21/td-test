import User from './models/User';
import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
dotenv.config();

export const seed = async () => {
  const mockUser = {
    email: 'test@gmail.com',
    password: '01010101',
    username: 'testuser'
  };

  const user = await User.findOne({
    email: mockUser.email
  }).lean();
  if (user) {
    console.log('Seeds already setted!');
    return;
  }

  const passwordHashed = await bcrypt.hash(
    '01010101',
    Number(process.env.PASSWORD_HASH_SALT!)
  );

  const newUser = await User.create({
    password: passwordHashed
  });
  await newUser.save();
  console.log('Seeds setted successfully!');
};
