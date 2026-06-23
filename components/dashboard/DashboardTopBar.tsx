'use client';

import { Search, Bell, Mail, Menu } from 'lucide-react';

interface TopBarProps {
  role: 'student' | 'admin';
  onMenuToggle: () => void;
}

export default function DashboardTopBar({ role, onMenuToggle }: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        {/* Left: hamburger + search */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="hidden sm:flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 w-[280px] lg:w-[340px]">
            <Search className="h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder={role === 'admin' ? 'Search students, courses...' : 'Search courses, lessons...'}
              className="flex-1 bg-transparent text-sm text-gray-700 placeholder:text-gray-400 outline-none"
            />
            <kbd className="hidden lg:inline-flex items-center gap-0.5 rounded-md border border-gray-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-gray-400">
              ⌘F
            </kbd>
          </div>
        </div>

        {/* Right: actions + profile */}
        <div className="flex items-center gap-2">
          {/* Mobile search */}
          <button className="sm:hidden p-2 rounded-xl text-gray-500 hover:bg-gray-50 transition-colors">
            <Search className="h-5 w-5" />
          </button>

          <button className="relative p-2.5 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors">
            <Mail className="h-[18px] w-[18px]" />
          </button>

          <button className="relative p-2.5 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors">
            <Bell className="h-[18px] w-[18px]" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-secondary ring-2 ring-white" />
          </button>

          {/* Divider */}
          <div className="hidden sm:block w-px h-8 bg-gray-100 mx-1" />

          {/* Profile */}
          <button className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-xl hover:bg-gray-50 transition-colors">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-gray-800 leading-tight">
                {role === 'admin' ? 'Admin User' : 'Student User'}
              </p>
              <p className="text-[11px] text-gray-400 leading-tight">
                {role === 'admin' ? 'admin@tesca.com' : 'student@tesca.com'}
              </p>
            </div>
            <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold">
              {role === 'admin' ? 'A' : 'S'}
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
