import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      if (role === 'ADMIN') {
        navigate('/admin/dashboard', { replace: true });
      } else {
        navigate('/home', { replace: true });
      }
    } else {
      navigate('/login', { replace: true });
    }
  }, [navigate, role, token]);

  return (
    <>
      <main className="relative w-full h-[100vh] px-6 bg-primary flex flex-col items-center justify-center">
        <Outlet />
      </main>
    </>
  );
}

export default App;
