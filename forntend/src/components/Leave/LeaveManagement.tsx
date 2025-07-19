import React, { useState } from 'react';
import { Plus, Search, Filter, Calendar, User, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Leave } from '../../types';
import { useAuth } from '../../context/AuthContext';

const LeaveManagement: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const leaves: Leave[] = [
    {
      id: '1',
      employeeId: '1',
      employeeName: 'John Doe',
      type: 'vacation',
      startDate: '2024-02-01',
      endDate: '2024-02-05',
      reason: 'Family vacation to Europe',
      status: 'pending',
      appliedAt: '2024-01-15',
    },
    {
      id: '2',
      employeeId: '2',
      employeeName: 'Sarah Johnson',
      type: 'sick',
      startDate: '2024-01-20',
      endDate: '2024-01-22',
      reason: 'Flu symptoms and recovery',
      status: 'approved',
      appliedAt: '2024-01-18',
    },
    {
      id: '3',
      employeeId: '3',
      employeeName: 'Mike Chen',
      type: 'personal',
      startDate: '2024-01-25',
      endDate: '2024-01-25',
      reason: 'Personal appointment',
      status: 'rejected',
      appliedAt: '2024-01-20',
    },
  ];

  const statuses = ['all', 'pending', 'approved', 'rejected'];
  const types = ['all', 'sick', 'vacation', 'personal', 'emergency'];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'rejected': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'pending': return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'sick': return 'bg-red-100 text-red-800';
      case 'vacation': return 'bg-blue-100 text-blue-800';
      case 'personal': return 'bg-purple-100 text-purple-800';
      case 'emergency': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredLeaves = leaves.filter(leave => {
    const matchesSearch = leave.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         leave.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || leave.status === selectedStatus;
    const matchesType = selectedType === 'all' || leave.type === selectedType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const calculateDays = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {user?.role === 'admin' ? 'Leave Management' : 'My Leave Requests'}
          </h1>
          <p className="text-gray-600 mt-1">
            {user?.role === 'admin' 
              ? 'Manage and approve employee leave requests' 
              : 'View and manage your leave applications'
            }
          </p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>{user?.role === 'admin' ? 'Review Leaves' : 'Apply for Leave'}</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">
                {leaves.filter(l => l.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-gray-900">
                {leaves.filter(l => l.status === 'approved').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="bg-red-100 p-3 rounded-lg">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Rejected</p>
              <p className="text-2xl font-bold text-gray-900">
                {leaves.filter(l => l.status === 'rejected').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Days</p>
              <p className="text-2xl font-bold text-gray-900">
                {leaves.reduce((acc, leave) => acc + calculateDays(leave.startDate, leave.endDate), 0)}
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
                placeholder="Search leave requests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
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
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid gap-4">
            {filteredLeaves.map((leave) => (
              <div key={leave.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{leave.employeeName}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(leave.type)}`}>
                        {leave.type}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{leave.reason}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{calculateDays(leave.startDate, leave.endDate)} days</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>Applied: {new Date(leave.appliedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end space-y-3">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(leave.status)}
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(leave.status)}`}>
                        {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                      </span>
                    </div>
                    
                    {user?.role === 'admin' && leave.status === 'pending' && (
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                          Approve
                        </button>
                        <button className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredLeaves.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No leave requests found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* Create/Review Leave Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            {user?.role === 'admin' ? (
              <>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Review Pending Leave Requests</h2>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {leaves.filter(l => l.status === 'pending').length === 0 ? (
                    <div className="text-gray-500 text-center">No pending leave requests.</div>
                  ) : (
                    leaves.filter(l => l.status === 'pending').map((leave) => (
                      <div key={leave.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-medium text-gray-900">{leave.employeeName}</p>
                            <p className="text-xs text-gray-500">{leave.type.charAt(0).toUpperCase() + leave.type.slice(1)} | {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}</p>
                          </div>
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">Pending</span>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">Reason: {leave.reason}</p>
                        <div className="flex space-x-2">
                          <button
                            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            onClick={() => setShowCreateModal(false)}
                          >
                            Approve
                          </button>
                          <button
                            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            onClick={() => setShowCreateModal(false)}
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="mt-4 w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Apply for Leave</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Leave Type</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="sick">Sick Leave</option>
                      <option value="vacation">Vacation</option>
                      <option value="personal">Personal</option>
                      <option value="emergency">Emergency</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                    <textarea 
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Please provide a reason for your leave request..."
                    ></textarea>
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
                      Submit Request
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveManagement;