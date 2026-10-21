'use client';

import React from 'react';
import { BookOpen, Github, Heart, Shield, Sparkles } from 'lucide-react';
import { Semester } from '@/types';

interface FooterProps {
  onSelectSemester: (semester: Semester | 'ALL') => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectSemester }) => {
  const semesters: Semester[] = ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'];

  return (
    <footer className="w-full border-t border-slate-800 bg-slate-950 pt-14 pb-10 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand info */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <BookOpen className="h-4 w-4" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                B.Tech CSE<span className="text-indigo-400">Hub</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Open-source academic repository designed for Computer Science Engineering students, professors, and tech enthusiasts.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-2">
              <Shield className="h-3.5 w-3.5 text-teal-400" />
              <span>Verified Syllabus Alignment</span>
            </div>
          </div>

          {/* Semesters Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Semesters (S1 - S8)
            </h4>
            <div className="grid grid-cols-2 gap-1.5">
              {semesters.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    onSelectSemester(s);
                    const el = document.getElementById('catalog-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-left text-xs text-slate-400 hover:text-indigo-400 py-1 transition"
                >
                  {s} Semester Notes
                </button>
              ))}
            </div>
          </div>

          {/* Resource Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Resource Hub
            </h4>
            <ul className="space-y-2">
              <li className="hover:text-white cursor-pointer transition">Handwritten Lecture Notes</li>
              <li className="hover:text-white cursor-pointer transition">Previous Year Solved Papers (PYQ)</li>
              <li className="hover:text-white cursor-pointer transition">Lab Manuals & Code Snippets</li>
              <li className="hover:text-white cursor-pointer transition">Final Year Capstone Blueprints</li>
              <li className="hover:text-white cursor-pointer transition">Daily Study Habit Streak Tracker</li>
            </ul>
          </div>

          {/* Architecture / Tech Stack */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Engineered With
            </h4>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Framework</span>
                <span className="font-mono text-indigo-400 font-semibold">Next.js 16 (App Router)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Styling</span>
                <span className="font-mono text-sky-400 font-semibold">Tailwind CSS</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Icons</span>
                <span className="font-mono text-teal-400 font-semibold">Lucide React</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Backend Ready</span>
                <span className="font-mono text-emerald-400 font-semibold">Supabase (Auth & Storage)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-[11px] text-slate-500">
            © 2026 B.Tech CSE Study Hub. Built for engineering excellence and community collaboration.
          </p>
          <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1">
            <span>Crafted with</span>
            <Heart className="h-3 w-3 text-rose-500 fill-rose-500" />
            <span>for future Software Engineers</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
