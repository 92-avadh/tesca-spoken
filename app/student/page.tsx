'use client';

import { useState, useEffect } from 'react';
import { BookOpen, Clock, Award, Calendar, Video, ArrowRight, Play } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import AnalyticsChart from '@/components/dashboard/AnalyticsChart';
import ProgressRing from '@/components/dashboard/ProgressRing';
import ActivityList from '@/components/dashboard/ActivityList';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/db';

export default function StudentDashboardHome() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<any[]>([]);
  const [liveClasses, setLiveClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [cData, lData] = await Promise.all([
          db.getCourses(),
          db.getLiveClasses()
        ]);
        setCourses(cData || []);
        setLiveClasses(lData || []);
      } catch (err) {
        console.error('Failed to load student home data', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Find next class from liveClasses
  const nextClass = liveClasses.find(
    (lc) => lc.status === 'live' || lc.status === 'upcoming'
  );

  const currentCourse = courses[0];

  // Mock Data
  const weeklyStudyHours = [
    { label: 'Mon', value: 1.5, secondaryValue: 2.0 },
    { label: 'Tue', value: 2.5, secondaryValue: 2.0 },
    { label: 'Wed', value: 3.0, secondaryValue: 2.0 },
    { label: 'Thu', value: 1.0, secondaryValue: 2.0 },
    { label: 'Fri', value: 2.0, secondaryValue: 2.0 },
    { label: 'Sat', value: 4.5, secondaryValue: 3.0 },
    { label: 'Sun', value: 3.5, secondaryValue: 3.0 },
  ];

  const recentActivities = [
    {
      id: 1,
      title: 'Completed Lesson 4: Present Perfect Tense',
      description: 'Scored 90% in the post-lesson quiz.',
      time: '2 hours ago',
      icon: Award,
      status: 'success' as const,
    },
    {
      id: 2,
      title: 'Joined Live Class: Fluency Practice',
      description: 'Attended session with Trainer Sarah.',
      time: 'Yesterday',
      icon: Video,
      status: 'info' as const,
    },
    {
      id: 3,
      title: 'Downloaded Study Material',
      description: 'PDF: "100 Common Idioms for Daily Conversation".',
      time: '2 days ago',
      icon: BookOpen,
      status: 'warning' as const,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header welcome banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary to-primary-600 rounded-3xl p-6 sm:p-8 text-white shadow-soft">
        <div className="absolute top-0 right-0 -mt-6 -mr-6 w-48 h-48 rounded-full bg-white/10 blur-xl pointer-events-none" />
        <div className="relative z-10 max-w-xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold">
            🔥 12 Day Study Streak!
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {user?.name || 'Aarav'}!
          </h1>
          <p className="text-sm text-primary-100 font-medium">
            You're making amazing progress. {nextClass ? `Your next class "${nextClass.topic}" is scheduled soon!` : 'No live classes scheduled for today. Keep it up!'}
          </p>
        </div>
      </div>

      {/* Quick stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          label="Course Progress"
          value="78%"
          trend={{ value: 4, isPositive: true }}
          description="from last week"
          icon={BookOpen}
          color="primary"
        />
        <StatCard
          label="Study Hours"
          value="18.5 hrs"
          trend={{ value: 12, isPositive: true }}
          description="this week"
          icon={Clock}
          color="secondary"
        />
        <StatCard
          label="Completed Tasks"
          value="24 / 30"
          trend={{ value: 2, isPositive: true }}
          description="assignments done"
          icon={Award}
          color="indigo"
        />
        <StatCard
          label="Next Live Class"
          value={nextClass ? (nextClass.status === 'live' ? 'Live Now' : 'Scheduled') : 'No Classes'}
          description={nextClass ? `${nextClass.topic.substring(0, 24)}${nextClass.topic.length > 24 ? '...' : ''}` : 'Check back later'}
          icon={Calendar}
          color="accent"
        />
      </div>

      {/* Main sections layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left/Middle: Chart and Current Course Card */}
        <div className="lg:col-span-2 space-y-6">
          {/* Study Hours Line Chart */}
          <AnalyticsChart
            title="Weekly Study Hours"
            subtitle="Comparison of actual study time vs. daily target (2.0 hours)"
            data={weeklyStudyHours}
            type="line"
            valueSuffix="h"
            color="primary"
          />

          {/* Current Course Spotlight */}
          {currentCourse ? (
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-soft flex flex-col md:flex-row items-center gap-6">
              <div className="relative h-28 w-28 rounded-2xl bg-secondary-50 flex items-center justify-center flex-shrink-0">
                <Play className="h-10 w-10 text-secondary fill-current" />
              </div>
              <div className="flex-1 space-y-3 text-center md:text-left">
                <span className="text-[10px] font-bold text-secondary bg-secondary-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  In Progress
                </span>
                <h3 className="text-lg font-bold text-gray-800">{currentCourse.title}</h3>
                <p className="text-xs text-gray-400 font-medium">
                  Trainer: {currentCourse.trainer} | {currentCourse.lessons_count} Lessons
                </p>
                
                {/* Progress bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-gray-500">
                    <span>Progress</span>
                    <span>14 of 18 lessons</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: '77%' }} />
                  </div>
                </div>
              </div>
              <Link
                href="/student/courses"
                className="w-full md:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-3 rounded-2xl bg-primary text-white text-xs font-bold hover:bg-primary-600 transition-all duration-300 hover:shadow-soft"
              >
                Resume Lesson
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ) : (
            <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-soft text-center space-y-3 flex flex-col items-center justify-center min-h-[160px]">
              <div className="h-12 w-12 rounded-2xl bg-primary-50 text-primary flex items-center justify-center">
                <BookOpen className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-gray-800">No Enrolled Courses</h3>
                <p className="text-xs text-gray-400 max-w-sm">You are not enrolled in any courses yet. Once you enroll, your active courses will appear here.</p>
              </div>
            </div>
          )}
        </div>

        {/* Right side: Progress Ring & Recent Activities */}
        <div className="space-y-6">
          {/* Target completion progress ring */}
          <div className="grid grid-cols-2 gap-4">
            <ProgressRing
              title="Attendance"
              percentage={92}
              subtitle="Classes"
              color="primary"
            />
            <ProgressRing
              title="Quiz Score"
              percentage={85}
              subtitle="Average"
              color="secondary"
            />
          </div>

          {/* Activity list */}
          <ActivityList title="Recent Activity" activities={recentActivities} />
        </div>
      </div>
    </div>
  );
}
