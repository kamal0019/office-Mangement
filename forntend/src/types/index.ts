export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'employee';
  department?: string;
  position?: string;
  avatar?: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  salary: number;
  joinDate: string;
  status: 'active' | 'inactive';
  avatar?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  assignedBy: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  dueDate: string;
  createdAt: string;
}

export interface Leave {
  id: string;
  employeeId: string;
  employeeName: string;
  type: 'sick' | 'vacation' | 'personal' | 'emergency';
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedAt: string;
}

export interface Attendance {
  id: string;
  employeeId: string;
  date: string;
  checkIn: string;
  checkOut?: string;
  status: 'present' | 'absent' | 'late';
  hours?: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
}

export interface Payroll {
  id: string;
  employeeId: string;
  employeeName: string;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  payPeriod: string;
  status: 'pending' | 'processed' | 'paid';
}