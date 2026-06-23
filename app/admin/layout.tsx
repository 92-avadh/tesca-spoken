'use client';

import {
  LayoutDashboard,
  Users,
  BookOpen,
  CreditCard,
  PhoneCall,
  MessageSquare,
  PenTool,
  Settings as SettingsIcon,
  Home,
} from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import type { NavGroup } from '@/components/dashboard/DashboardSidebar';

const adminNavGroups: NavGroup[] = [
  {
    title: 'Management',
    items: [
      { label: 'Overview', href: '/admin', icon: LayoutDashboard },
      { label: 'Students', href: '/admin/students', icon: Users, badge: 142 },
      { label: 'Courses', href: '/admin/courses', icon: BookOpen },
      { label: 'Payments', href: '/admin/payments', icon: CreditCard },
      { label: 'Leads & Inquiries', href: '/admin/leads', icon: PhoneCall, badge: 8 },
    ],
  },
  {
    title: 'Content & Settings',
    items: [
      { label: 'Testimonials', href: '/admin/testimonials', icon: MessageSquare },
      { label: 'Blog Posts', href: '/admin/blog', icon: PenTool },
      { label: 'Global Settings', href: '/admin/settings', icon: SettingsIcon },
      { label: 'Back to Home', href: '/', icon: Home },
    ],
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout role="admin" navGroups={adminNavGroups}>
      {children}
    </DashboardLayout>
  );
}
