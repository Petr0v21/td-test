import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { seed } from './seed';
dotenv.config();

mongoose.set('strictQuery', false);

const dbConnect = () => {
  mongoose.connect(process.env.MONGO_URI!, {});

  mongoose.connection.on('connected', () => {
    console.log('Connected to database sucessfully');
    seed();
  });

  mongoose.connection.on('error', (err) => {
    console.log('Error while connecting to database :' + err);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Mongodb connection disconnected');
  });
};

export default dbConnect;
