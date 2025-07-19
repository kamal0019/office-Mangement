import React from 'react';
import { Users, ClipboardList, Calendar, DollarSign, TrendingUp, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const stats = [
    { title: 'Total Employees', value: '156', icon: Users, color: 'bg-blue-500', change: '+12%' },
    { title: 'Active Tasks', value: '42', icon: ClipboardList, color: 'bg-green-500', change: '+5%' },
    { title: 'Pending Leaves', value: '8', icon: Calendar, color: 'bg-yellow-500', change: '-2%' },
    { title: 'Monthly Payroll', value: '$124,500', icon: DollarSign, color: 'bg-purple-500', change: '+8%' },
  ];

  const recentActivities = [
    { id: 1, action: 'New employee registered', user: 'Sarah Johnson', time: '2 hours ago' },
    { id: 2, action: 'Leave request approved', user: 'Mike Chen', time: '4 hours ago' },
    { id: 3, action: 'Task completed', user: 'Emily Davis', time: '6 hours ago' },
    { id: 4, action: 'Attendance marked', user: 'John Smith', time: '8 hours ago' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Clock className="h-4 w-4" />
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium text-green-500">{stat.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-500">by {activity.user}</p>
                </div>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
              onClick={() => setShowAddEmployeeModal(true)}
            >
              <Users className="h-8 w-8 text-gray-400 mb-2" />
              <span className="text-sm font-medium text-gray-600">Add Employee</span>
            </button>
            <button
              className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors"
              onClick={() => setShowCreateTaskModal(true)}
            >
              <ClipboardList className="h-8 w-8 text-gray-400 mb-2" />
              <span className="text-sm font-medium text-gray-600">Create Task</span>
            </button>
            <button
              className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors"
              onClick={() => navigate('/payroll')}
            >
              <DollarSign className="h-8 w-8 text-gray-400 mb-2" />
              <span className="text-sm font-medium text-gray-600">Process Payroll</span>
            </button>
            <button
              className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-yellow-500 hover:bg-yellow-50 transition-colors"
              onClick={() => navigate('/leaves')}
            >
              <Calendar className="h-8 w-8 text-gray-400 mb-2" />
              <span className="text-sm font-medium text-gray-600">Review Leaves</span>
            </button>
          </div>
        </div>
      </div>
      {/* Add Employee Modal */}
      {showAddEmployeeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Add Employee</h2>
            <form className="space-y-4">
              <input type="text" placeholder="Name" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              <input type="email" placeholder="Email" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              <input type="text" placeholder="Department" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              <input type="text" placeholder="Position" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddEmployeeModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Create Task Modal */}
      {showCreateTaskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Create Task</h2>
            <form className="space-y-4">
              <input type="text" placeholder="Title" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              <textarea placeholder="Description" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              <input type="text" placeholder="Assign To" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              <input type="date" placeholder="Due Date" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateTaskModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;