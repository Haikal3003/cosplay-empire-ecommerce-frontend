import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import AdminHeader from '../../components/layout/AdminHeader';
import { ToastContainer } from 'react-toastify';

export default function AdminLayout() {
  return (
    <>
      <Sidebar />
      <ToastContainer />
      <div className="pl-[220px] py-[40px] pr-[80px]">
        <AdminHeader />
        <Outlet />
      </div>
    </>
  );
}
