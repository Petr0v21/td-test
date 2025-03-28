import multer, { FileFilterCallback, StorageEngine } from 'multer';
import { Request } from 'express';

const storage: StorageEngine = multer.memoryStorage();

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (!file.originalname.endsWith('.csv')) {
    return cb(new Error('Only CSV files are allowed.'));
  }

  if (
    file.mimetype !== 'text/csv' &&
    file.mimetype !== 'application/vnd.ms-excel'
  ) {
    return cb(new Error('Only CSV files are allowed.'));
  }

  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter
}).single('file');

export { upload };
