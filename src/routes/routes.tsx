import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App';
import LoginPage from '../pages/main/LoginPage';
import RegisterPage from '../pages/main/RegisterPage';
import AdminLayout from '../pages/admin/layout';
import DashboardPage from '../pages/admin/Dashboard';
import ProductsPage from '../pages/admin/Products';
import CustomersPage from '../pages/admin/Customers';
import OrdersPage from '../pages/admin/Orders';
import ReportsPage from '../pages/admin/Reports';
import SettingsPage from '../pages/admin/Settings';

const router = createBrowserRouter([
  // MAIN ROUTES
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/login" replace />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
    ],
  },

  // ADMIN ROUTES
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={'/dashboard'} replace />,
      },
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      {
        path: 'products',
        element: <ProductsPage />,
        children: [
          {
            path: 'add-product',
            element: <div>Add Product</div>,
          },
        ],
      },
      {
        path: 'customers',
        element: <CustomersPage />,
      },
      {
        path: 'orders',
        element: <OrdersPage />,
      },
      {
        path: 'reports',
        element: <ReportsPage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
    ],
  },

  // USER ROUTES
]);

export default router;
