import React from 'react';
import { Bell, Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="h-6 w-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold text-white">
                {user?.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="text-sm">
              <p className="font-medium text-gray-900">{user?.name}</p>
              <p className="text-gray-500 capitalize">{user?.role}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;