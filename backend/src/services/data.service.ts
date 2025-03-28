import DataModel, { DataType } from '../models/Data';
import { PaginationInput, PaginatedOutput } from '../utils/pagination';

const batchSize = 1000;

export const dataService = {
  async insertDataWithClear(rows: Record<string, any>[]) {
    //We can use transction with session if we have a replics. If we have only one mongo we can do manual rollback(choreography) but it slow and maybe exist problem with memory. That's why I'm doing the simple method!
    try {
      await DataModel.deleteMany({});
      await Promise.all(
        Array.from({ length: Math.ceil(rows.length / batchSize) }, (_, i) => {
          return DataModel.insertMany(
            rows.slice(i * batchSize, (i + 1) * batchSize).map((row) => ({
              row
            }))
          );
        })
      );
    } catch (error) {
      console.error('Error during insertDataWithClear transaction:', error);
      throw error;
    }
  },
  async getAll(args: PaginationInput): Promise<PaginatedOutput<DataType>> {
    try {
      const data = await DataModel.find<DataType>({})
        .skip(args.skip)
        .limit(args.take)
        .exec();

      const total = await DataModel.countDocuments();

      return new PaginatedOutput(data, total, args);
    } catch (error) {
      console.error('Error while fetching data with pagination:', error);
      throw error;
    }
  }
};
