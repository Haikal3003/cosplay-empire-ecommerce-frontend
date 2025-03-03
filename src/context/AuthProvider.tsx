import { createContext, ReactNode, useState } from 'react';
import { LoginPayload, RegisterPayload } from '../utils/types';
import api from '../utils/api';
import { delayResponse } from '../utils/delayResponse';

export interface AuthContextTypes {
  loading: boolean;
  user: any;
  role: string;
  message: string;
  login: (payload: LoginPayload, navigate: (path: string) => void) => void;
  register: (payload: RegisterPayload, navigate: (path: string) => void) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextTypes | undefined>(undefined);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [role, setRole] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const login = async (payload: LoginPayload, navigate: (path: string) => void) => {
    setLoading(true);
    setMessage('');

    try {
      const response = await api.post('/auth/login', payload);
      const { token, user, message } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('role', user.role);

      setUser(user);
      setRole(user.role);
      setMessage(message);

      await delayResponse(2000);

      navigate(user.role === 'ADMIN' ? '/admin/dashboard' : '/home');
    } catch (error: any) {
      console.error(error);
      setMessage(error.response?.data?.message || 'Login gagal. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload: RegisterPayload, navigate: (path: string) => void) => {
    setLoading(true);
    setMessage('');

    try {
      const response = await api.post('/auth/register', payload);
      setMessage(response.data.message);
      await delayResponse(2000);

      navigate('/login');
    } catch (error: any) {
      console.error(error);
      setMessage(error.response?.data?.message || 'Register gagal. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setUser(null);
    setRole('');
  };

  return <AuthContext.Provider value={{ user, loading, role, message, login, register, logout }}>{children}</AuthContext.Provider>;
}
