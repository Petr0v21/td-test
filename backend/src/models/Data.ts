import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export type DataBodyType = Record<string, any>;

export type DataType = DataBodyType & {
  _id: string;
};

const dataSchema = new Schema({
  row: { type: Schema.Types.Mixed, required: true }
});

const Data = mongoose.model('FileData', dataSchema);

export default Data;
