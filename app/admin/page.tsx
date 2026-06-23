'use client';

import { Users, CreditCard, DollarSign, PhoneCall, TrendingUp, UserPlus, BookOpen } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import AnalyticsChart from '@/components/dashboard/AnalyticsChart';
import ProgressRing from '@/components/dashboard/ProgressRing';
import ActivityList from '@/components/dashboard/ActivityList';

export default function AdminDashboardHome() {
  // Mock Data
  const monthlyRevenue = [
    { label: 'Jan', value: 12000, secondaryValue: 10000 },
    { label: 'Feb', value: 15000, secondaryValue: 12000 },
    { label: 'Mar', value: 18500, secondaryValue: 15000 },
    { label: 'Apr', value: 22000, secondaryValue: 18000 },
    { label: 'May', value: 25000, secondaryValue: 20000 },
    { label: 'Jun', value: 28540, secondaryValue: 25000 },
  ];

  const recentAdminActivities = [
    {
      id: 'act-1',
      title: 'New Student Enrolled',
      description: 'Rohit Sharma enrolled in Spoken English Mastery.',
      time: '10 mins ago',
      icon: UserPlus,
      status: 'success' as const,
    },
    {
      id: 'act-2',
      title: 'Payment Received',
      description: 'Received $29.00 subscription payment from Priya K.',
      time: '45 mins ago',
      icon: CreditCard,
      status: 'info' as const,
    },
    {
      id: 'act-3',
      title: 'New Lead Registered',
      description: 'Lead "Vikram Singh" requested a free trial callback.',
      time: '2 hours ago',
      icon: PhoneCall,
      status: 'warning' as const,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header control panel banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">Admin Overview</h1>
          <p className="text-xs text-gray-400 font-semibold mt-0.5">Control panel for managing student profiles, course content, payments, and leads</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-gray-500 bg-white border border-gray-150 rounded-xl px-4 py-2.5 shadow-soft self-start md:self-auto">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          System Active: 1420 Students Online
        </div>
      </div>

      {/* Admin stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          label="Total Students"
          value="1,420"
          trend={{ value: 8.2, isPositive: true }}
          description="active learners"
          icon={Users}
          color="primary"
        />
        <StatCard
          label="Active Subscriptions"
          value="984"
          trend={{ value: 12.4, isPositive: true }}
          description="recurring accounts"
          icon={CreditCard}
          color="secondary"
        />
        <StatCard
          label="Monthly Revenue"
          value="$28,540"
          trend={{ value: 14.1, isPositive: true }}
          description="June revenue"
          icon={DollarSign}
          color="indigo"
        />
        <StatCard
          label="Pending Leads"
          value="8 Leads"
          trend={{ value: 25, isPositive: false }}
          description="requires follow up"
          icon={PhoneCall}
          color="accent"
        />
      </div>

      {/* Main content split sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts & Graphs Column */}
        <div className="lg:col-span-2 space-y-6">
          <AnalyticsChart
            title="Monthly Revenue Growth"
            subtitle="Current year revenue vs. target forecast (USD)"
            data={monthlyRevenue}
            type="bar"
            valuePrefix="$"
            color="primary"
          />

          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-soft space-y-4">
            <h3 className="text-base font-bold text-gray-800">Quick System Metrics</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 border border-gray-50 rounded-2xl bg-gray-50/50">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Average Session Duration</p>
                <p className="text-lg font-bold text-gray-705 mt-1">42 mins</p>
              </div>
              <div className="p-4 border border-gray-50 rounded-2xl bg-gray-50/50">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Class Completion Rate</p>
                <p className="text-lg font-bold text-gray-750 mt-1">88.5%</p>
              </div>
              <div className="p-4 border border-gray-50 rounded-2xl bg-gray-50/50">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Daily Active Users</p>
                <p className="text-lg font-bold text-gray-780 mt-1">682 DAU</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action center column */}
        <div className="space-y-6 flex flex-col justify-between">
          <div className="grid grid-cols-2 gap-4">
            <ProgressRing
              title="Conversion Rate"
              percentage={68}
              subtitle="Leads to Students"
              color="primary"
            />
            <ProgressRing
              title="Target Goal"
              percentage={82}
              subtitle="Monthly Sales"
              color="secondary"
            />
          </div>

          <div className="flex-1 mt-6 lg:mt-0">
            <ActivityList title="Recent System Activities" activities={recentAdminActivities} />
          </div>
        </div>
      </div>
    </div>
  );
}
