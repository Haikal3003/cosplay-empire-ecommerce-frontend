import { Link, useLocation } from 'react-router-dom';
import { links } from '../../constants/links';
import { motion } from 'motion/react';

export default function Sidebar() {
  const location = useLocation();
  const pathname = location.pathname;

  const prefix = pathname.startsWith('/admin') ? '/admin' : '/user';

  return (
    <div id="sidebar" className="flex flex-col bg-white fixed top-0 pt-6 w-[15%] h-[100vh] border-r border-r-slate-200">
      <div className="px-6">
        <h1 className="font-space-grotesk">C•E</h1>
      </div>

      <div className="mt-6">
        <h1 className="text-sm font-spaceGrotesk text-gray-500 mb-3 px-6 uppercase">Menu</h1>
        <ul className="relative">
          {links.map((link, index) => {
            const fullPath = `${prefix}${link.href}`;
            const isActive = pathname.startsWith(fullPath);

            return (
              <li key={index} className="relative">
                <Link to={fullPath} className="flex items-center gap-4 py-2 px-6 transition-all duration-300 text-gray-700 hover:bg-gray-100">
                  <div className={`text-lg ${isActive ? 'text-red-500' : 'text-gray-500'}`}>{link.icon}</div>
                  <h2 className={`text-sm font-medium ${isActive ? 'text-red-500' : 'text-gray-700'}`}>{link.name}</h2>
                </Link>

                {isActive && <motion.div layoutId="active-link" className="absolute left-0 top-0 bottom-0 w-1 bg-red-500 rounded-full" transition={{ type: 'spring', stiffness: 300, damping: 30 }} />}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
