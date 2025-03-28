import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export type UserBodyType = {
  email: string;
  password: string;
  username: string;
};

export type UserType = UserBodyType & {
  _id: string;
};

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    username: {
      type: String,
      default: 'user'
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model('User', userSchema);

export default User;
