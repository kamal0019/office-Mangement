import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Eye } from 'lucide-react';
import { Employee } from '../../types';

const EmployeeList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editEmployee, setEditEmployee] = useState<Employee | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const departments = ['all', 'Engineering', 'Marketing', 'HR', 'Finance', 'Operations'];

  const fetchEmployees = () => {
    setLoading(true);
    setError(null);
    fetch('https://office-mangement-ss17.onrender.com/employees')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch employees');
        return res.json();
      })
      .then(data => {
        setEmployees(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Add Employee
  const handleAddEmployee = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setActionLoading(true);
    setActionError(null);
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const newEmployee = Object.fromEntries(formData.entries());
    try {
      const res = await fetch('https://office-mangement-ss17.onrender.com/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEmployee),
      });
      if (!res.ok) throw new Error('Failed to add employee');
      setShowAddModal(false);
      fetchEmployees();
    } catch (err: any) {
      setActionError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // Edit Employee
  const handleEditEmployee = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editEmployee) return;
    setActionLoading(true);
    setActionError(null);
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const updatedEmployee = Object.fromEntries(formData.entries());
    try {
      const res = await fetch(`https://office-mangement-ss17.onrender.com/employees/${editEmployee.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedEmployee),
      });
      if (!res.ok) throw new Error('Failed to update employee');
      setShowEditModal(false);
      setEditEmployee(null);
      fetchEmployees();
    } catch (err: any) {
      setActionError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // Delete Employee
  const handleDeleteEmployee = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return;
    setActionLoading(true);
    setActionError(null);
    try {
      const res = await fetch(`https://office-mangement-ss17.onrender.com/employees/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete employee');
      fetchEmployees();
    } catch (err: any) {
      setActionError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || employee.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Employees</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          onClick={() => setShowAddModal(true)}
        >
          <Plus className="h-5 w-5" />
          <span>Add Employee</span>
        </button>
      </div>
      {/* Add Employee Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Add Employee</h2>
            <form className="space-y-4" onSubmit={handleAddEmployee}>
              <input name="name" type="text" placeholder="Name" required className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              <input name="email" type="email" placeholder="Email" required className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              <input name="department" type="text" placeholder="Department" required className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              <input name="position" type="text" placeholder="Position" required className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              <input name="salary" type="number" placeholder="Salary" required className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              <input name="joinDate" type="date" placeholder="Join Date" required className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              <select name="status" className="w-full px-3 py-2 border border-gray-300 rounded-lg" required>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              {actionError && <p className="text-red-500 text-sm">{actionError}</p>}
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={actionLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  disabled={actionLoading}
                >
                  {actionLoading ? 'Adding...' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Edit Employee Modal */}
      {showEditModal && editEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Edit Employee</h2>
            <form className="space-y-4" onSubmit={handleEditEmployee}>
              <input name="name" type="text" defaultValue={editEmployee.name} required className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              <input name="email" type="email" defaultValue={editEmployee.email} required className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              <input name="department" type="text" defaultValue={editEmployee.department} required className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              <input name="position" type="text" defaultValue={editEmployee.position} required className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              <input name="salary" type="number" defaultValue={editEmployee.salary} required className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              <input name="joinDate" type="date" defaultValue={editEmployee.joinDate ? editEmployee.joinDate.split('T')[0] : ''} required className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              <select name="status" defaultValue={editEmployee.status} className="w-full px-3 py-2 border border-gray-300 rounded-lg" required>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              {actionError && <p className="text-red-500 text-sm">{actionError}</p>}
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => { setShowEditModal(false); setEditEmployee(null); }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={actionLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  disabled={actionLoading}
                >
                  {actionLoading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept === 'all' ? 'All Departments' : dept}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading employees...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-6 font-medium text-gray-900">Employee</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-900">Department</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-900">Position</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-900">Salary</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-900">Join Date</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-900">Status</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredEmployees.map((employee) => (
                    <tr key={employee.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-sm font-semibold text-white">
                              {employee.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{employee.name}</p>
                            <p className="text-sm text-gray-500">{employee.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-900">{employee.department}</td>
                      <td className="py-4 px-6 text-gray-900">{employee.position}</td>
                      <td className="py-4 px-6 text-gray-900">${employee.salary?.toLocaleString?.() ?? employee.salary}</td>
                      <td className="py-4 px-6 text-gray-900">{employee.joinDate ? new Date(employee.joinDate).toLocaleDateString() : ''}</td>
                      <td className="py-4 px-6">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          employee.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {employee.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <button className="p-1 text-gray-600 hover:text-blue-600 transition-colors">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            className="p-1 text-gray-600 hover:text-green-600 transition-colors"
                            onClick={() => { setEditEmployee(employee); setShowEditModal(true); }}
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            className="p-1 text-gray-600 hover:text-red-600 transition-colors"
                            onClick={() => handleDeleteEmployee(employee.id)}
                            disabled={actionLoading}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredEmployees.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No employees found matching your criteria.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EmployeeList;