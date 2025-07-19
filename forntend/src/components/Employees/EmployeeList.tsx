import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Eye } from 'lucide-react';
import { Employee } from '../../types';

const EmployeeList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const employees: Employee[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@company.com',
      department: 'Engineering',
      position: 'Software Developer',
      salary: 75000,
      joinDate: '2023-01-15',
      status: 'active',
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      department: 'Marketing',
      position: 'Marketing Manager',
      salary: 85000,
      joinDate: '2022-11-20',
      status: 'active',
    },
    {
      id: '3',
      name: 'Mike Chen',
      email: 'mike.chen@company.com',
      department: 'Engineering',
      position: 'Senior Developer',
      salary: 95000,
      joinDate: '2022-08-10',
      status: 'active',
    },
    {
      id: '4',
      name: 'Emily Davis',
      email: 'emily.davis@company.com',
      department: 'HR',
      position: 'HR Specialist',
      salary: 60000,
      joinDate: '2023-03-05',
      status: 'active',
    },
  ];

  const departments = ['all', 'Engineering', 'Marketing', 'HR', 'Finance', 'Operations'];

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
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Plus className="h-5 w-5" />
          <span>Add Employee</span>
        </button>
      </div>

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
                  <td className="py-4 px-6 text-gray-900">${employee.salary.toLocaleString()}</td>
                  <td className="py-4 px-6 text-gray-900">{new Date(employee.joinDate).toLocaleDateString()}</td>
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
                      <button className="p-1 text-gray-600 hover:text-green-600 transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-gray-600 hover:text-red-600 transition-colors">
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
      </div>
    </div>
  );
};

export default EmployeeList;