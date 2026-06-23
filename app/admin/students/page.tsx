'use client';

import { useState } from 'react';
import { Search, UserPlus, Filter, MoreVertical, Edit2, Trash2, ShieldAlert, Check, X } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  email: string;
  course: string;
  joinedDate: string;
  status: 'active' | 'suspended' | 'pending';
}

export default function AdminStudentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'suspended' | 'pending'>('all');
  const [students, setStudents] = useState<Student[]>([
    {
      id: 'stud-1',
      name: 'Aarav Patel',
      email: 'aarav.patel@gmail.com',
      course: 'Spoken English Mastery',
      joinedDate: 'May 10, 2026',
      status: 'active',
    },
    {
      id: 'stud-2',
      name: 'Neha Sharma',
      email: 'neha.sharma@yahoo.com',
      course: 'Business Communication',
      joinedDate: 'June 02, 2026',
      status: 'active',
    },
    {
      id: 'stud-3',
      name: 'Rohit Verma',
      email: 'rohit.verma@gmail.com',
      course: 'Vocabulary Accelerator',
      joinedDate: 'June 15, 2026',
      status: 'pending',
    },
    {
      id: 'stud-4',
      name: 'Priya Nair',
      email: 'priya.nair@outlook.com',
      course: 'Spoken English Mastery',
      joinedDate: 'April 20, 2026',
      status: 'suspended',
    },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: '', email: '', course: 'Spoken English Mastery' });

  // Filters
  const filteredStudents = students.filter((s) => {
    const matchesQuery = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Student = {
      id: `stud-${students.length + 1}`,
      name: newStudent.name,
      email: newStudent.email,
      course: newStudent.course,
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      status: 'active',
    };
    setStudents([created, ...students]);
    setNewStudent({ name: '', email: '', course: 'Spoken English Mastery' });
    setIsAdding(false);
  };

  const handleDeleteStudent = (id: string) => {
    setStudents(students.filter(s => s.id !== id));
  };

  const handleToggleStatus = (id: string, status: 'active' | 'suspended') => {
    setStudents(students.map(s => s.id === id ? { ...s, status } : s));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">Students Directory</h1>
          <p className="text-xs text-gray-400 font-semibold mt-0.5">Manage and track student enrollment statuses</p>
        </div>

        <button
          onClick={() => setIsAdding(true)}
          className="inline-flex items-center justify-center gap-1.5 px-5 py-3 bg-primary hover:bg-primary-600 text-white rounded-xl text-xs font-bold transition-all shadow-soft self-start sm:self-auto"
        >
          <UserPlus className="h-4 w-4" />
          Add Student
        </button>
      </div>

      {/* Filters and Search toolbar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-4 py-2.5 w-full md:w-[280px] shadow-soft">
          <Search className="h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-xs text-gray-700 outline-none placeholder:text-gray-400"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <Filter className="h-4 w-4 text-gray-400 flex-shrink-0" />
          {['all', 'active', 'pending', 'suspended'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all uppercase tracking-wider ${
                statusFilter === status
                  ? 'bg-primary-50 text-primary border border-primary-200'
                  : 'bg-white border border-gray-100 text-gray-500 hover:bg-gray-50'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Add Student Modal overlay */}
      {isAdding && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-gray-100 rounded-3xl p-6 w-full max-w-md shadow-2xl animate-scale-up">
            <div className="flex justify-between items-center pb-4 border-b border-gray-50">
              <h3 className="text-base font-bold text-gray-800">Add New Student</h3>
              <button onClick={() => setIsAdding(false)} className="p-1 rounded-lg text-gray-400 hover:bg-gray-50">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleAddStudent} className="space-y-4 pt-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500">Student Name</label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Kumar"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-xs text-gray-800 focus:bg-white focus:border-primary outline-none"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500">Email Address</label>
                <input
                  type="email"
                  placeholder="name@email.com"
                  value={newStudent.email}
                  onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-xs text-gray-800 focus:bg-white focus:border-primary outline-none"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500">Select Course</label>
                <select
                  value={newStudent.course}
                  onChange={(e) => setNewStudent({ ...newStudent, course: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-xs text-gray-800 focus:bg-white focus:border-primary outline-none"
                >
                  <option>Spoken English Mastery</option>
                  <option>Business Communication</option>
                  <option>Vocabulary Accelerator</option>
                </select>
              </div>
              <div className="flex gap-3 justify-end pt-4 border-t border-gray-50">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2.5 rounded-xl border border-gray-150 text-gray-500 text-xs font-bold hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-600 shadow-soft"
                >
                  Create Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Directory Table */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-50 bg-gray-50/50 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                <th className="p-4 sm:p-5">Student Info</th>
                <th className="p-4 sm:p-5">Enrolled Course</th>
                <th className="p-4 sm:p-5">Joined Date</th>
                <th className="p-4 sm:p-5">Status</th>
                <th className="p-4 sm:p-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-xs font-medium text-gray-700">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-gray-400 font-medium">
                    No matching student records found.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50/30 transition-colors">
                    <td className="p-4 sm:p-5">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-primary-50 text-primary flex items-center justify-center font-bold">
                          {s.name[0]}
                        </div>
                        <div>
                          <p className="font-bold text-gray-800">{s.name}</p>
                          <p className="text-[10px] text-gray-400 mt-0.5">{s.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 sm:p-5 text-gray-500">{s.course}</td>
                    <td className="p-4 sm:p-5 text-gray-400">{s.joinedDate}</td>
                    <td className="p-4 sm:p-5">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          s.status === 'active'
                            ? 'bg-emerald-50 text-emerald-600'
                            : s.status === 'pending'
                            ? 'bg-amber-50 text-amber-600'
                            : 'bg-rose-50 text-rose-600'
                        }`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        {s.status}
                      </span>
                    </td>
                    <td className="p-4 sm:p-5 text-right">
                      <div className="inline-flex items-center gap-2">
                        {s.status === 'active' ? (
                          <button
                            onClick={() => handleToggleStatus(s.id, 'suspended')}
                            className="p-1.5 rounded-lg border border-gray-100 text-amber-600 hover:bg-amber-50"
                            title="Suspend Student"
                          >
                            <ShieldAlert className="h-3.5 w-3.5" />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleToggleStatus(s.id, 'active')}
                            className="p-1.5 rounded-lg border border-gray-100 text-emerald-600 hover:bg-emerald-50"
                            title="Activate Student"
                          >
                            <Check className="h-3.5 w-3.5" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteStudent(s.id)}
                          className="p-1.5 rounded-lg border border-gray-100 text-rose-600 hover:bg-rose-50"
                          title="Delete Student"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
