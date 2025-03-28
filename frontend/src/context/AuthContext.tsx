import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import { AuthContextType, LoginArgs } from '../types/auth';
import { FullUser } from '../types/user';
import { useAuthHttp } from '@hooks/useAuthHttp';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<FullUser | null>(null);
  const fetchWithAuth = useAuthHttp();

  const login = async (args: LoginArgs) => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const result = await fetchWithAuth({
      url: `${process.env.BACKEND_URL}/api/auth/signin`,
      input: {
        method: 'POST',
        body: JSON.stringify(args),
        headers: myHeaders,
      },
    });

    if (result && result.accessToken) {
      localStorage.setItem('token', result.accessToken);
      refersh();
      return true;
    }

    return false;
  };
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const refersh = useCallback(() => {
    fetchWithAuth({ url: `${process.env.BACKEND_URL}/api/user/me` }).then(
      (res) => {
        if (res) {
          setUser(res);
        }
      },
    );
  }, [fetchWithAuth]);

  useEffect(() => {
    refersh();
  }, [refersh]);

  return (
    <AuthContext.Provider value={{ user, login, logout, refersh }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
