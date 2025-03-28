import { Request } from 'express';

export type RequestExt = Request & {
  user: Pick<UserType, '_id'>;
};
