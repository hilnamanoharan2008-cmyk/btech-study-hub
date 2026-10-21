'use client';

import React from 'react';
import { UserRole } from '@/types';
import { 
  GraduationCap, 
  BookOpen, 
  Upload, 
  CheckCircle2, 
  Flame, 
  Code2, 
  Sparkles,
  ShieldCheck,
  ChevronDown,
  LayoutDashboard
} from 'lucide-react';

interface NavbarProps {
  currentRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  onOpenUpload: () => void;
  activeTab: 'catalog' | 'dashboard' | 'habits' | 'blueprints';
  onSelectTab: (tab: 'catalog' | 'dashboard' | 'habits' | 'blueprints') => void;
  streakCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onSelectRole,
  onOpenUpload,
  activeTab,
  onSelectTab,
  streakCount,
}) => {
  const roleBadges: Record<UserRole, { label: string; icon: any; color: string; desc: string }> = {
    student: {
      label: 'Student',
      icon: GraduationCap,
      color: 'from-blue-500 to-indigo-600 text-blue-200 border-blue-500/30',
      desc: 'Browse, learn & track habits',
    },
    teacher: {
      label: 'Teacher / Professor',
      icon: ShieldCheck,
      color: 'from-emerald-500 to-teal-600 text-emerald-200 border-emerald-500/30',
      desc: 'Verify & approve resources',
    },
    techie: {
      label: 'Techie / Industry Guide',
      icon: Code2,
      color: 'from-purple-500 to-pink-600 text-purple-200 border-purple-500/30',
      desc: 'Publish industry blueprints',
    },
  };

  const CurrentRoleIcon = roleBadges[currentRole].icon;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => onSelectTab('catalog')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400 p-[1px] shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition">
              <div className="h-full w-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-400 group-hover:scale-110 transition duration-200" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg sm:text-xl tracking-tight text-white group-hover:text-indigo-300 transition">
                  B.Tech CSE<span className="text-indigo-400">Hub</span>
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 hidden sm:inline-block">
                  S1-S8
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Academic Notes, PYQs & Career Blueprints
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => onSelectTab('catalog')}
              className={`flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-all ${
                activeTab === 'catalog'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              Catalog
            </button>
            <button
              onClick={() => onSelectTab('dashboard')}
              className={`flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </button>
            <button
              onClick={() => onSelectTab('habits')}
              className={`flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-all ${
                activeTab === 'habits'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Flame className="h-4 w-4 text-amber-400" />
              Habit Tracker
              <span className="px-1.5 py-0.2 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300">
                {streakCount}d
              </span>
            </button>
            <button
              onClick={() => onSelectTab('blueprints')}
              className={`flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-all ${
                activeTab === 'blueprints'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Code2 className="h-4 w-4 text-purple-400" />
              Tech Blueprints
            </button>
          </nav>

          {/* Right Section: Role Switcher & Upload Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Quick Role Switcher Pill */}
            <div className="relative group">
              <button className="flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-sm font-medium text-slate-200 transition">
                <CurrentRoleIcon className="h-4 w-4 text-indigo-400" />
                <span className="hidden sm:inline font-medium">Role:</span>
                <span className="text-white font-semibold capitalize">{currentRole}</span>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400 group-hover:rotate-180 transition duration-200" />
              </button>

              {/* Role Dropdown */}
              <div className="absolute right-0 mt-2 w-64 p-2 bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-3 py-1.5">
                  Select Active Persona
                </p>
                {(['student', 'teacher', 'techie'] as UserRole[]).map((role) => {
                  const item = roleBadges[role];
                  const Icon = item.icon;
                  const isSelected = currentRole === role;
                  return (
                    <button
                      key={role}
                      onClick={() => onSelectRole(role)}
                      className={`w-full flex items-start gap-3 p-2.5 rounded-xl text-left transition ${
                        isSelected 
                          ? 'bg-indigo-600/15 border border-indigo-500/30 text-white' 
                          : 'hover:bg-slate-800 text-slate-300 hover:text-white'
                      }`}
                    >
                      <div className={`p-2 rounded-lg bg-slate-800 text-slate-300 mt-0.5 ${isSelected ? 'text-indigo-400 bg-indigo-500/10' : ''}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold">{item.label}</span>
                          {isSelected && <CheckCircle2 className="h-4 w-4 text-indigo-400" />}
                        </div>
                        <p className="text-xs text-slate-400">{item.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Upload Button */}
            <button
              onClick={onOpenUpload}
              className="flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-400 hover:to-indigo-500 text-white text-xs sm:text-sm font-medium shadow-md shadow-indigo-600/20 active:scale-95 transition"
            >
              <Upload className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>Upload</span>
            </button>
          </div>

        </div>

        {/* Mobile Navigation bar */}
        <div className="flex md:hidden overflow-x-auto py-2.5 gap-2 border-t border-slate-800/60 no-scrollbar">
          <button
            onClick={() => onSelectTab('catalog')}
            className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap ${
              activeTab === 'catalog' ? 'bg-indigo-600 text-white' : 'text-slate-400 bg-slate-900'
            }`}
          >
            Catalog (S1-S8)
          </button>
          <button
            onClick={() => onSelectTab('dashboard')}
            className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap ${
              activeTab === 'dashboard' ? 'bg-indigo-600 text-white' : 'text-slate-400 bg-slate-900'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => onSelectTab('habits')}
            className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'habits' ? 'bg-indigo-600 text-white' : 'text-slate-400 bg-slate-900'
            }`}
          >
            <Flame className="h-3 w-3 text-amber-400" />
            Habit Streak ({streakCount}d)
          </button>
          <button
            onClick={() => onSelectTab('blueprints')}
            className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap ${
              activeTab === 'blueprints' ? 'bg-indigo-600 text-white' : 'text-slate-400 bg-slate-900'
            }`}
          >
            Tech Guides
          </button>
        </div>

      </div>
    </header>
  );
};
