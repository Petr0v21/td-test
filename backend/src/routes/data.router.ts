import express, { Request, Response } from 'express';
import { query, validationResult } from 'express-validator';
import { Readable, Transform } from 'stream';
import csv from 'csv-parser';
import { dataService } from '../services/data.service';
import { upload } from '../utils/upload';
import { PaginationInput } from '../utils/pagination';
import authMiddleware from '../middleware/authMiddlewate';

const multiSeparatorParser = (separators: string[], target: string = ',') => {
  return new Transform({
    transform(chunk, encoding, callback) {
      let data = chunk.toString();
      separators.forEach((sep) => {
        if (sep !== target) {
          data = data.replaceAll(sep, target);
        }
      });
      callback(null, data);
    }
  });
};

const processCSVAndInsert = async (buffer: Buffer) => {
  const results: Record<string, any>[] = [];

  return new Promise((resolve, reject) => {
    const readable = Readable.from(buffer);

    readable
      .pipe(multiSeparatorParser([',', ';', '\t'], ','))
      .pipe(csv({ separator: ',' }))
      .on('data', (data: Record<string, any>) => {
        results.push(data);
      })
      .on('end', async () => {
        try {
          await dataService.insertDataWithClear(results);
          resolve(true);
        } catch (error) {
          reject(error);
        }
      })
      .on('error', (err: Error) => {
        reject(err);
      });
  });
};

const router = express.Router();

router.post(
  '/upload',
  [authMiddleware, upload],
  async (req: Request, res: Response) => {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    try {
      await processCSVAndInsert(req.file.buffer);
      return res
        .status(200)
        .json({ message: 'File processed and data inserted successfully.' });
    } catch (error) {
      console.error('Error during file upload and data insertion:', error);
      return res.status(500).json({ message: 'Error processing file.' });
    }
  }
);

router.get(
  '',
  [
    query('page')
      .optional()
      .isInt({ min: 1 })
      .withMessage('Page must be an integer greater than or equal to 1')
      .toInt(),
    query('take')
      .optional()
      .isInt({ min: 1, max: 100 })
      .withMessage('Page size must be an integer between 1 and 100')
      .toInt()
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { page = 1, take = 10 } = req.query as unknown as PaginationInput;
    const paginationInput = new PaginationInput({ page, take });

    try {
      const paginatedData = await dataService.getAll(paginationInput);
      return res.status(200).json(paginatedData);
    } catch (error) {
      console.error('Error fetching paginated data:', error);
      return res.status(500).json({ message: 'Error fetching data.' });
    }
  }
);

export default router;
