import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import dbConnect from './dbConnect';
import apiRouter from './routes';

const app = express();
dotenv.config();

dbConnect();

app.use(express.json());
app.use(cors());

app.use('/api', apiRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port: ${port}`));
