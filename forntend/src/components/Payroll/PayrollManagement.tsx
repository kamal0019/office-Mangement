import React, { useState } from 'react';
import { Plus, Search, Filter, DollarSign, Download, Eye, Edit, Calendar, TrendingUp } from 'lucide-react';
import { Payroll } from '../../types';
import { useAuth } from '../../context/AuthContext';

const PayrollManagement: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [viewPayroll, setViewPayroll] = useState<Payroll | null>(null);
  const [editPayroll, setEditPayroll] = useState<Payroll | null>(null);

  const payrollRecords: Payroll[] = [
    {
      id: '1',
      employeeId: '1',
      employeeName: 'John Doe',
      basicSalary: 5000,
      allowances: 1000,
      deductions: 500,
      netSalary: 5500,
      payPeriod: '2024-01',
      status: 'paid',
    },
    {
      id: '2',
      employeeId: '2',
      employeeName: 'Sarah Johnson',
      basicSalary: 6000,
      allowances: 1200,
      deductions: 600,
      netSalary: 6600,
      payPeriod: '2024-01',
      status: 'processed',
    },
    {
      id: '3',
      employeeId: '3',
      employeeName: 'Mike Chen',
      basicSalary: 7000,
      allowances: 1400,
      deductions: 700,
      netSalary: 7700,
      payPeriod: '2024-01',
      status: 'pending',
    },
    {
      id: '4',
      employeeId: '1',
      employeeName: 'John Doe',
      basicSalary: 5000,
      allowances: 1000,
      deductions: 500,
      netSalary: 5500,
      payPeriod: '2023-12',
      status: 'paid',
    },
  ];

  const statuses = ['all', 'pending', 'processed', 'paid'];
  const periods = ['all', '2024-01', '2023-12', '2023-11'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'processed': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredPayroll = payrollRecords.filter(record => {
    const matchesSearch = record.employeeName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || record.status === selectedStatus;
    const matchesPeriod = selectedPeriod === 'all' || record.payPeriod === selectedPeriod;
    return matchesSearch && matchesStatus && matchesPeriod;
  });

  const calculateStats = () => {
    const totalPayroll = filteredPayroll.reduce((acc, record) => acc + record.netSalary, 0);
    const avgSalary = filteredPayroll.length > 0 ? totalPayroll / filteredPayroll.length : 0;
    const totalAllowances = filteredPayroll.reduce((acc, record) => acc + record.allowances, 0);
    const totalDeductions = filteredPayroll.reduce((acc, record) => acc + record.deductions, 0);

    return { totalPayroll, avgSalary, totalAllowances, totalDeductions };
  };

  const stats = calculateStats();

  // Add a mock download handler
  const handleDownload = (record: Payroll) => {
    alert(`Download payroll for ${record.employeeName} (${record.payPeriod})`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {user?.role === 'admin' ? 'Payroll Management' : 'My Payroll'}
          </h1>
          <p className="text-gray-600 mt-1">
            {user?.role === 'admin' 
              ? 'Manage employee salaries and payroll processing' 
              : 'View your salary details and payment history'
            }
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
            <Download className="h-5 w-5" />
            <span>Export</span>
          </button>
          {user?.role === 'admin' && (
            <button 
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Process Payroll</span>
            </button>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Payroll</p>
              <p className="text-2xl font-bold text-gray-900">${stats.totalPayroll.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Average Salary</p>
              <p className="text-2xl font-bold text-gray-900">${Math.round(stats.avgSalary).toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Plus className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Allowances</p>
              <p className="text-2xl font-bold text-gray-900">${stats.totalAllowances.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="bg-red-100 p-3 rounded-lg">
              <Filter className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Deductions</p>
              <p className="text-2xl font-bold text-gray-900">${stats.totalDeductions.toLocaleString()}</p>
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
                placeholder="Search payroll records..."
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
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {periods.map((period) => (
                  <option key={period} value={period}>
                    {period === 'all' ? 'All Periods' : period}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Employee</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Pay Period</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Basic Salary</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Allowances</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Deductions</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Net Salary</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPayroll.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-white">
                          {record.employeeName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{record.employeeName}</p>
                        <p className="text-sm text-gray-500">ID: {record.employeeId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-900">{record.payPeriod}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-900">${record.basicSalary.toLocaleString()}</td>
                  <td className="py-4 px-6 text-green-600">${record.allowances.toLocaleString()}</td>
                  <td className="py-4 px-6 text-red-600">${record.deductions.toLocaleString()}</td>
                  <td className="py-4 px-6">
                    <span className="text-lg font-semibold text-gray-900">
                      ${record.netSalary.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(record.status)}`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-600 hover:text-blue-600 transition-colors" onClick={() => setViewPayroll(record)}>
                        <Eye className="h-4 w-4" />
                      </button>
                      {user?.role === 'admin' && (
                        <button className="p-1 text-gray-600 hover:text-green-600 transition-colors" onClick={() => setEditPayroll(record)}>
                          <Edit className="h-4 w-4" />
                        </button>
                      )}
                      <button className="p-1 text-gray-600 hover:text-purple-600 transition-colors" onClick={() => handleDownload(record)}>
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPayroll.length === 0 && (
          <div className="text-center py-12">
            <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No payroll records found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Create Payroll Modal */}
      {showCreateModal && user?.role === 'admin' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Process Payroll</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employee</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Select Employee</option>
                  <option value="1">John Doe</option>
                  <option value="2">Sarah Johnson</option>
                  <option value="3">Mike Chen</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pay Period</label>
                <input 
                  type="month" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Basic Salary</label>
                <input 
                  type="number" 
                  placeholder="5000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Allowances</label>
                <input 
                  type="number" 
                  placeholder="1000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deductions</label>
                <input 
                  type="number" 
                  placeholder="500"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                />
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
                  Process
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* View Payroll Modal */}
      {viewPayroll && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Payroll Details</h2>
            <div className="space-y-2">
              <div><strong>Employee:</strong> {viewPayroll.employeeName}</div>
              <div><strong>Pay Period:</strong> {viewPayroll.payPeriod}</div>
              <div><strong>Basic Salary:</strong> ${viewPayroll.basicSalary.toLocaleString()}</div>
              <div><strong>Allowances:</strong> ${viewPayroll.allowances.toLocaleString()}</div>
              <div><strong>Deductions:</strong> ${viewPayroll.deductions.toLocaleString()}</div>
              <div><strong>Net Salary:</strong> ${viewPayroll.netSalary.toLocaleString()}</div>
              <div><strong>Status:</strong> {viewPayroll.status}</div>
            </div>
            <button
              type="button"
              onClick={() => setViewPayroll(null)}
              className="mt-6 w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {/* Edit Payroll Modal (Admin only) */}
      {editPayroll && user?.role === 'admin' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Edit Payroll</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Basic Salary</label>
                <input
                  type="number"
                  defaultValue={editPayroll.basicSalary}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Allowances</label>
                <input
                  type="number"
                  defaultValue={editPayroll.allowances}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deductions</label>
                <input
                  type="number"
                  defaultValue={editPayroll.deductions}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setEditPayroll(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PayrollManagement;