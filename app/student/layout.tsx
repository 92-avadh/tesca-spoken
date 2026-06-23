'use client';

import { LayoutDashboard, BookOpen, Video, FileText, User, Home } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import type { NavGroup } from '@/components/dashboard/DashboardSidebar';

const studentNavGroups: NavGroup[] = [
  {
    title: 'Dashboard',
    items: [
      { label: 'Overview', href: '/student', icon: LayoutDashboard },
      { label: 'My Courses', href: '/student/courses', icon: BookOpen, badge: 2 },
      { label: 'Live Classes', href: '/student/live-classes', icon: Video, badge: 1 },
      { label: 'Study Materials', href: '/student/materials', icon: FileText },
    ],
  },
  {
    title: 'Account',
    items: [
      { label: 'My Profile', href: '/student/profile', icon: User },
      { label: 'Back to Home', href: '/', icon: Home },
    ],
  },
];

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout role="student" navGroups={studentNavGroups}>
      {children}
    </DashboardLayout>
  );
}
