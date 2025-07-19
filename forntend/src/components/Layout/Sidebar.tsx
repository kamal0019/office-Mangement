import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  ClipboardList, 
  Bell, 
  DollarSign, 
  Clock,
  LogOut,
  Building2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();

  const adminLinks = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/employees', icon: Users, label: 'Employees' },
    { to: '/tasks', icon: ClipboardList, label: 'Tasks' },
    { to: '/leaves', icon: Calendar, label: 'Leave Requests' },
    { to: '/payroll', icon: DollarSign, label: 'Payroll' },
    { to: '/attendance', icon: Clock, label: 'Attendance' },
    { to: '/notifications', icon: Bell, label: 'Notifications' },
  ];

  const employeeLinks = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/my-tasks', icon: ClipboardList, label: 'My Tasks' },
    { to: '/my-leaves', icon: Calendar, label: 'My Leaves' },
    { to: '/my-attendance', icon: Clock, label: 'My Attendance' },
    { to: '/my-payroll', icon: DollarSign, label: 'My Payroll' },
    { to: '/notifications', icon: Bell, label: 'Notifications' },
  ];

  const links = user?.role === 'admin' ? adminLinks : employeeLinks;

  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen flex flex-col">
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <Building2 className="h-8 w-8 text-blue-400" />
          <div>
            <h1 className="text-xl font-bold">OfficeHub</h1>
            <p className="text-sm text-gray-400">Management System</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`
                }
              >
                <link.icon className="h-5 w-5" />
                <span>{link.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold">
              {user?.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center space-x-3 w-full px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;