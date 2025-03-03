import { RxDashboard } from 'react-icons/rx';
import { BsBoxSeam } from 'react-icons/bs';
import { PiUsersThree, PiShoppingCartLight } from 'react-icons/pi';
import { HiOutlineChartBarSquare } from 'react-icons/hi2';
import { IoSettingsOutline } from 'react-icons/io5';

export const links = [
  { name: 'Dashboard', icon: <RxDashboard />, href: '/dashboard' },
  { name: 'Products', icon: <BsBoxSeam />, href: '/products' },
  { name: 'Customers', icon: <PiUsersThree />, href: '/customers' },
  { name: 'Orders', icon: <PiShoppingCartLight />, href: '/orders' },
  { name: 'Reports', icon: <HiOutlineChartBarSquare />, href: '/reports' },
  { name: 'Settings', icon: <IoSettingsOutline />, href: '/settings' },
];
