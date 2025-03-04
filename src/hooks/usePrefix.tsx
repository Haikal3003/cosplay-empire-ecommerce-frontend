import { useLocation } from 'react-router-dom';

export function usePrefix() {
  const location = useLocation();
  return location.pathname.startsWith('/admin') ? '/admin' : '/user';
}
