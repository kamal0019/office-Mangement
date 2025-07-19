import React from 'react';
import { CheckCircle, Clock, Calendar, DollarSign, Bell, TrendingUp } from 'lucide-react';

const EmployeeDashboard: React.FC = () => {
  const stats = [
    { title: 'Tasks Completed', value: '24', icon: CheckCircle, color: 'bg-green-500', change: '+3 this week' },
    { title: 'Hours Worked', value: '168', icon: Clock, color: 'bg-blue-500', change: 'This month' },
    { title: 'Leave Balance', value: '12', icon: Calendar, color: 'bg-yellow-500', change: 'Days remaining' },
    { title: 'Last Salary', value: '$4,200', icon: DollarSign, color: 'bg-purple-500', change: 'Paid on time' },
  ];

  const todayTasks = [
    { id: 1, title: 'Complete project proposal', priority: 'high', status: 'in-progress' },
    { id: 2, title: 'Review code changes', priority: 'medium', status: 'pending' },
    { id: 3, title: 'Team meeting preparation', priority: 'low', status: 'completed' },
    { id: 4, title: 'Update documentation', priority: 'medium', status: 'pending' },
  ];

  const recentNotifications = [
    { id: 1, title: 'Leave request approved', time: '2 hours ago', type: 'success' },
    { id: 2, title: 'New task assigned', time: '4 hours ago', type: 'info' },
    { id: 3, title: 'Payroll processed', time: '1 day ago', type: 'success' },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600';
      case 'in-progress': return 'text-blue-600';
      case 'pending': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, John!</h1>
          <p className="text-gray-600 mt-1">Here's what's happening with your work today.</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Mark Attendance
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500">{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Today's Tasks</h2>
          <div className="space-y-3">
            {todayTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(task.status)}`}></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{task.title}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                      <span className={`text-xs ${getStatusColor(task.status)}`}>
                        {task.status.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Notifications</h2>
          <div className="space-y-3">
            {recentNotifications.map((notification) => (
              <div key={notification.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className={`w-2 h-2 rounded-full ${notification.type === 'success' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                  <p className="text-xs text-gray-500">{notification.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;