export type PaginatedOutput<T> = {
  take: number;
  page: number;
  totalPages: number;
  total: number;
  data: T[];
};

export type DataType = {
  _id: string;
  row: Record<string, any>;
};
