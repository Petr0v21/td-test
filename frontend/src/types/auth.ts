import { FullUser } from './user';

export type LoginArgs = {
  email: string;
  password: string;
};

export type AuthContextType = {
  user: FullUser | null;
  login: (args: LoginArgs) => Promise<boolean>;
  logout: () => void;
  refersh: () => void;
};
