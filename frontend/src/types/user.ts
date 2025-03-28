export type User = {
  email: string;
  phone: string;
  password?: string;
};

export type FullUser = User & {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
};
