import { useMemo } from 'react';
import { links } from '../../constants/links';
import { RiNotification4Line } from 'react-icons/ri';
import { useLocation } from 'react-router-dom';

export default function AdminHeader() {
  // const [notificationCount, setNotificationCount] = useState<number>(0);
  const location = useLocation();
  const pathname = location.pathname;

  const prefix = pathname.startsWith('/admin') ? '/admin' : '/user';

  const currentPage = useMemo(() => {
    return links.find((link) => pathname.startsWith(`${prefix}${link.href}`));
  }, [pathname]);

  const headerText = currentPage?.name;

  const headerList = useMemo(
    () => [
      {
        name: 'Notification',
        icon: <RiNotification4Line size={18} />,
        href: `${prefix}/notification`,
      },
    ],
    [prefix]
  );

  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-lg font-semibold text-gray-800">{headerText}</h1>
    </div>
  );
}
