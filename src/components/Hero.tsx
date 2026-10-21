'use client';

import React from 'react';
import { Semester, UserRole } from '@/types';
import { 
  Sparkles, 
  Search, 
  GraduationCap, 
  ShieldCheck, 
  Code2, 
  ArrowRight,
  Download,
  Flame,
  CheckCircle2,
  FolderGit2
} from 'lucide-react';

interface HeroProps {
  onSelectSemester: (semester: Semester | 'ALL') => void;
  selectedSemester: Semester | 'ALL';
  searchQuery: string;
  onSearchChange: (query: string) => void;
  currentRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  onOpenUpload: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onSelectSemester,
  selectedSemester,
  searchQuery,
  onSearchChange,
  currentRole,
  onSelectRole,
  onOpenUpload,
}) => {
  const semesters: Semester[] = ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'];

  return (
    <div className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-16 border-b border-slate-800/80 bg-gradient-to-b from-slate-900/40 via-slate-950 to-slate-950">
      
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[250px] bg-sky-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs sm:text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4 text-indigo-400 animate-pulse" />
            <span>Built specifically for B.Tech Computer Science Students & Faculty</span>
          </div>
        </div>

        {/* Headline */}
        <div className="text-center max-w-4xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Master Every Semester with <br className="hidden sm:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-sky-300 to-teal-300">
              Verified Notes & Industry Blueprints
            </span>
          </h1>
          <p className="mt-4 sm:mt-6 text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Instant access to Semester 1 to 8 lecture notes, solved previous year question papers, lab manuals, teacher-verified study packs, and daily habit routines.
          </p>
        </div>

        {/* Global Search Bar */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="relative flex items-center bg-slate-900/90 border border-slate-700/80 rounded-2xl shadow-2xl p-1.5 focus-within:border-indigo-500 transition">
            <div className="pl-3 text-slate-400">
              <Search className="h-5 w-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search across 40+ subjects (e.g. Operating Systems, DAA, DBMS, Python, AI/ML)..."
              className="w-full bg-transparent border-none text-slate-100 placeholder-slate-400 text-sm sm:text-base px-3 py-2.5 focus:outline-none focus:ring-0"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="text-xs px-2.5 py-1 text-slate-400 hover:text-white mr-1"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => {
                const el = document.getElementById('catalog-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl transition shadow-md whitespace-nowrap"
            >
              Explore
            </button>
          </div>
        </div>

        {/* Semester Quick Jump Pills */}
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
            Quick Jump to Semester (S1 - S8)
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
            <button
              onClick={() => onSelectSemester('ALL')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedSemester === 'ALL'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 ring-2 ring-indigo-400/30'
                  : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white'
              }`}
            >
              All Semesters
            </button>
            {semesters.map((sem) => (
              <button
                key={sem}
                onClick={() => onSelectSemester(sem)}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  selectedSemester === sem
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 ring-2 ring-indigo-400/30'
                    : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white'
                }`}
              >
                {sem}
              </button>
            ))}
          </div>
        </div>

        {/* 3 User Persona Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 max-w-5xl mx-auto">
          
          {/* Student Card */}
          <div 
            onClick={() => onSelectRole('student')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer relative group ${
              currentRole === 'student'
                ? 'bg-slate-900/90 border-blue-500 shadow-xl shadow-blue-500/10 ring-1 ring-blue-500/50'
                : 'bg-slate-900/50 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/80'
            }`}
          >
            {currentRole === 'student' && (
              <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                Active Mode
              </span>
            )}
            <div className="h-10 w-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-105 transition">
              <GraduationCap className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">For Students</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Download verified lecture notes, solve PYQs, maintain daily study streaks, and earn by sharing top notes.
            </p>
            <div className="flex items-center text-xs font-semibold text-blue-400 gap-1 group-hover:translate-x-1 transition duration-200">
              <span>Switch to Student View</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* Teacher Card */}
          <div 
            onClick={() => onSelectRole('teacher')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer relative group ${
              currentRole === 'teacher'
                ? 'bg-slate-900/90 border-emerald-500 shadow-xl shadow-emerald-500/10 ring-1 ring-emerald-500/50'
                : 'bg-slate-900/50 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/80'
            }`}
          >
            {currentRole === 'teacher' && (
              <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Active Mode
              </span>
            )}
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-105 transition">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">For Professors</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Upload verified course materials, review student submissions for accuracy, and grant university trust badges.
            </p>
            <div className="flex items-center text-xs font-semibold text-emerald-400 gap-1 group-hover:translate-x-1 transition duration-200">
              <span>Switch to Faculty View</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* Techie Card */}
          <div 
            onClick={() => onSelectRole('techie')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer relative group ${
              currentRole === 'techie'
                ? 'bg-slate-900/90 border-purple-500 shadow-xl shadow-purple-500/10 ring-1 ring-purple-500/50'
                : 'bg-slate-900/50 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/80'
            }`}
          >
            {currentRole === 'techie' && (
              <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Active Mode
              </span>
            )}
            <div className="h-10 w-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-105 transition">
              <Code2 className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">For Techies & Devs</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Publish production software blueprints, modern tech roadmaps (Docker, Next.js, AI/ML), and mentor juniors.
            </p>
            <div className="flex items-center text-xs font-semibold text-purple-400 gap-1 group-hover:translate-x-1 transition duration-200">
              <span>Switch to Techie View</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </div>

        </div>

        {/* Quick Highlights Row */}
        <div className="mt-12 pt-8 border-t border-slate-800/60 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-white">8 / 8</p>
            <p className="text-xs text-slate-400 mt-1">Semesters Covered</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-indigo-400">40+ Core</p>
            <p className="text-xs text-slate-400 mt-1">CSE Subjects Indexed</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-teal-400">100%</p>
            <p className="text-xs text-slate-400 mt-1">Teacher Verified Notes</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-amber-400">Daily Streak</p>
            <p className="text-xs text-slate-400 mt-1">Study Habit Widget</p>
          </div>
        </div>

      </div>
    </div>
  );
};
