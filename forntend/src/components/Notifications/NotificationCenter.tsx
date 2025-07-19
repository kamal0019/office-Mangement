import React, { useState } from 'react';
import { Bell, Plus, Search, Filter, CheckCircle, AlertCircle, Info, XCircle, Trash2, Eye } from 'lucide-react';
import { Notification } from '../../types';
import { useAuth } from '../../context/AuthContext';

const NotificationCenter: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const notifications: Notification[] = [
    {
      id: '1',
      title: 'Leave Request Approved',
      message: 'Your vacation leave request for Feb 1-5 has been approved by your manager.',
      type: 'success',
      isRead: false,
      createdAt: '2024-01-15T10:30:00Z',
    },
    {
      id: '2',
      title: 'New Task Assigned',
      message: 'You have been assigned a new task: "Complete project proposal". Due date: Jan 20, 2024.',
      type: 'info',
      isRead: false,
      createdAt: '2024-01-15T09:15:00Z',
    },
    {
      id: '3',
      title: 'Payroll Processed',
      message: 'Your salary for January 2024 has been processed and will be credited to your account.',
      type: 'success',
      isRead: true,
      createdAt: '2024-01-14T16:45:00Z',
    },
    {
      id: '4',
      title: 'Attendance Reminder',
      message: 'Please remember to mark your attendance. You have 2 unmarked days this week.',
      type: 'warning',
      isRead: false,
      createdAt: '2024-01-14T08:00:00Z',
    },
    {
      id: '5',
      title: 'System Maintenance',
      message: 'The system will be under maintenance on Jan 20, 2024 from 2:00 AM to 4:00 AM.',
      type: 'info',
      isRead: true,
      createdAt: '2024-01-13T14:20:00Z',
    },
  ];

  const types = ['all', 'info', 'success', 'warning', 'error'];
  const statuses = ['all', 'read', 'unread'];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'warning': return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case 'error': return <XCircle className="h-5 w-5 text-red-600" />;
      case 'info': return <Info className="h-5 w-5 text-blue-600" />;
      default: return <Bell className="h-5 w-5 text-gray-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-100 border-green-200';
      case 'warning': return 'bg-yellow-100 border-yellow-200';
      case 'error': return 'bg-red-100 border-red-200';
      case 'info': return 'bg-blue-100 border-blue-200';
      default: return 'bg-gray-100 border-gray-200';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || notification.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || 
                         (selectedStatus === 'read' && notification.isRead) ||
                         (selectedStatus === 'unread' && !notification.isRead);
    return matchesSearch && matchesType && matchesStatus;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600 mt-1">
            Stay updated with important announcements and updates
            {unreadCount > 0 && (
              <span className="ml-2 px-2 py-1 bg-red-100 text-red-800 text-sm rounded-full">
                {unreadCount} unread
              </span>
            )}
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
            Mark All Read
          </button>
          {user?.role === 'admin' && (
            <button 
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Create Notification</span>
            </button>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Bell className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total</p>
              <p className="text-2xl font-bold text-gray-900">{notifications.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="bg-red-100 p-3 rounded-lg">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Unread</p>
              <p className="text-2xl font-bold text-gray-900">{unreadCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Read</p>
              <p className="text-2xl font-bold text-gray-900">{notifications.length - unreadCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Info className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Today</p>
              <p className="text-2xl font-bold text-gray-900">
                {notifications.filter(n => {
                  const today = new Date().toDateString();
                  const notifDate = new Date(n.createdAt).toDateString();
                  return today === notifDate;
                }).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`border rounded-lg p-4 transition-all hover:shadow-md ${
                  notification.isRead ? 'bg-white border-gray-200' : 'bg-blue-50 border-blue-200'
                } ${getTypeColor(notification.type)}`}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    {getTypeIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className={`text-lg font-semibold ${notification.isRead ? 'text-gray-900' : 'text-gray-900'}`}>
                          {notification.title}
                          {!notification.isRead && (
                            <span className="ml-2 w-2 h-2 bg-blue-600 rounded-full inline-block"></span>
                          )}
                        </h3>
                        <p className="text-gray-600 mt-1 text-sm leading-relaxed">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          {formatTime(notification.createdAt)}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        {!notification.isRead && (
                          <button className="p-1 text-gray-600 hover:text-blue-600 transition-colors">
                            <Eye className="h-4 w-4" />
                          </button>
                        )}
                        {user?.role === 'admin' && (
                          <button className="p-1 text-gray-600 hover:text-red-600 transition-colors">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredNotifications.length === 0 && (
            <div className="text-center py-12">
              <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No notifications found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* Create Notification Modal */}
      {showCreateModal && user?.role === 'admin' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Create Notification</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input 
                  type="text" 
                  placeholder="Notification title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="info">Info</option>
                  <option value="success">Success</option>
                  <option value="warning">Warning</option>
                  <option value="error">Error</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea 
                  rows={4}
                  placeholder="Notification message..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Recipients</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="all">All Employees</option>
                  <option value="department">Specific Department</option>
                  <option value="individual">Individual Employee</option>
                </select>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Send Notification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;