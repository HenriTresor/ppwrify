import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import {
  BarChart3,
  Rows,
  Package,
  PieChart,
  ChevronDown,
  ChevronUp,
  ChevronDown as ChevronSelector
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActiveRoute = (path: string) => {
    return location.pathname.startsWith(path);
  };

  const navigation = [
    {
      name: t('dashboard'),
      href: '/dashboard',
      icon: BarChart3,
      hasSubmenu: false
    },
    {
      name: t('products'),
      href: '/products',
      icon: Rows,
      hasSubmenu: false
    },
    {
      name: t('packaging'),
      href: '/packaging',
      icon: Package,
      hasSubmenu: true,
      isOpen: isActiveRoute('/packaging'),
      subItems: [
        {
          name: t('packagingManagement'),
          href: '/packaging',
          current: location.pathname === '/packaging'
        },
        {
          name: t('categories'),
          href: '/packaging/categories',
          current: location.pathname === '/packaging/categories'
        }
      ]
    },
    {
      name: t('reporting'),
      href: '/reporting',
      icon: PieChart,
      hasSubmenu: false
    }
  ];

  return (
    <div className="flex flex-col w-72 bg-white border-r border-gray-200 h-full">
      {/* Header */}
      <div className="flex flex-col gap-5 p-5">
        <h1 className="text-2xl font-bold text-black">PPWRify</h1>
      </div>

      {/* Navigation */}
      <div className="flex flex-col flex-1 px-4">
        <nav className="flex flex-col space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = isActiveRoute(item.href);
            
            return (
              <div key={item.name}>
                {item.hasSubmenu ? (
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between p-3 text-gray-700 rounded-md hover:bg-gray-50">
                      <div className="flex items-center space-x-3">
                        <Icon className="w-5 h-5 text-gray-400" />
                        <span className="text-base font-semibold">{item.name}</span>
                      </div>
                      {item.isOpen ? (
                        <ChevronUp className="w-4 h-4 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                    
                    {item.isOpen && item.subItems && (
                      <div className="ml-6 space-y-1">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.href}
                            className={`flex items-center px-3 py-2 text-base font-semibold rounded-md ${
                              subItem.current
                                ? 'bg-gray-50 text-gray-900'
                                : 'text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    className={`flex items-center justify-between p-3 text-gray-700 rounded-md hover:bg-gray-50 ${
                      isActive ? 'bg-gray-50 text-gray-900' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-5 h-5 text-gray-400" />
                      <span className="text-base font-semibold">{item.name}</span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </Link>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* User Account */}
      <div className="p-4">
        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-xl bg-white">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-purple-600">
                  {user?.name?.charAt(0)}
                </span>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-900">{user?.name}</span>
              <span className="text-sm text-gray-600 truncate">{user?.email}</span>
            </div>
          </div>
          <button
            onClick={logout}
            className="p-1.5 rounded-md hover:bg-gray-100"
          >
            <ChevronSelector className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
