import { useState, useMemo } from 'react';
import { links } from '../../constants/links';
import { RiNotification4Line } from 'react-icons/ri';
import { Link, useLocation } from 'react-router-dom';

export default function AdminHeader() {
  const [notificationCount, setNotificationCount] = useState<number>(3); // Default 3 notifikasi
  const location = useLocation();
  const pathname = location.pathname;

  const prefix = pathname.startsWith('/admin') ? '/admin' : '/user';

  const currentPage = useMemo(() => {
    return links.find((link) => pathname.startsWith(`${prefix}${link.href}`));
  }, [pathname]);

  const headerText = currentPage?.name || 'Dashboard';

  const headerList = useMemo(
    () => [
      {
        icon: <RiNotification4Line size={22} />,
        href: `${prefix}/notification`,
      },
    ],
    [prefix]
  );

  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-lg font-semibold text-gray-800">{headerText}</h1>
      <div className="relative">
        {headerList.map((headerItem, index) => (
          <Link to={headerItem.href} key={index} className="relative">
            {headerItem.icon}
            {notificationCount > 0 && <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">{notificationCount}</span>}
          </Link>
        ))}
      </div>
    </div>
  );
}
