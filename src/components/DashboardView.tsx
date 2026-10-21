'use client';

import React, { useState } from 'react';
import { UserRole, Semester, StudyResource, PendingVerification } from '@/types';
import { INITIAL_VERIFICATIONS, INDUSTRY_BLUEPRINTS } from '@/data/mockData';
import { 
  GraduationCap, 
  ShieldCheck, 
  Code2, 
  BookOpen, 
  Clock, 
  Download, 
  CheckCircle2, 
  XCircle, 
  Flame, 
  Award, 
  Plus, 
  FileText, 
  ArrowUpRight, 
  Users, 
  Star, 
  Sparkles,
  GitBranch,
  Github
} from 'lucide-react';

interface DashboardViewProps {
  currentRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  resources: StudyResource[];
  onOpenUpload: () => void;
  streakCount: number;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  currentRole,
  onSelectRole,
  resources,
  onOpenUpload,
  streakCount,
}) => {
  const [verifications, setVerifications] = useState<PendingVerification[]>(INITIAL_VERIFICATIONS);
  const [studentSemester, setStudentSemester] = useState<Semester>('S4');

  const handleApprove = (id: string) => {
    setVerifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'approved' } : item))
    );
  };

  const handleReject = (id: string) => {
    setVerifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'rejected' } : item))
    );
  };

  // Student specific resources
  const mySemesterResources = resources.filter((r) => r.semester === studentSemester);
  const myUploads = resources.filter((r) => r.author.role === currentRole);

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Top Banner with Role Switcher & Summary */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Active Persona: {currentRole.toUpperCase()}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {currentRole === 'student' && 'Student Learning Center & Habit Hub'}
              {currentRole === 'teacher' && 'Professor Verification & Academic Hub'}
              {currentRole === 'techie' && 'Techie Industry Blueprints & Mentorship Hub'}
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              {currentRole === 'student' && 'Track your academic milestones, prepare for university exams, and review your daily study consistency.'}
              {currentRole === 'teacher' && 'Review student-contributed notes, upload verified master lecture slides, and manage academic integrity.'}
              {currentRole === 'techie' && 'Bridge classroom CS theory with real-world software engineering practices, system designs, and projects.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {(['student', 'teacher', 'techie'] as UserRole[]).map((r) => (
              <button
                key={r}
                onClick={() => onSelectRole(r)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition capitalize ${
                  currentRole === r
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                {r} View
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* VIEW 1: STUDENT DASHBOARD */}
      {currentRole === 'student' && (
        <div className="space-y-8">
          
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                <span>Active Semester</span>
                <GraduationCap className="h-4 w-4 text-indigo-400" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-white">{studentSemester}</span>
                <select
                  value={studentSemester}
                  onChange={(e) => setStudentSemester(e.target.value as Semester)}
                  className="bg-slate-950 border border-slate-800 text-xs text-indigo-400 rounded-lg px-2 py-1"
                >
                  {(['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'] as Semester[]).map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                <span>Study Streak</span>
                <Flame className="h-4 w-4 text-amber-400" />
              </div>
              <p className="text-2xl font-bold text-amber-400">{streakCount} Days 🔥</p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                <span>Enrolled Subjects</span>
                <BookOpen className="h-4 w-4 text-sky-400" />
              </div>
              <p className="text-2xl font-bold text-white">5 Core</p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                <span>My Contributions</span>
                <Award className="h-4 w-4 text-teal-400" />
              </div>
              <p className="text-2xl font-bold text-white">{myUploads.length} Uploads</p>
            </div>
          </div>

          {/* Recommended Notes for Selected Semester */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Recommended Study Materials for {studentSemester}
                </h3>
                <p className="text-xs text-slate-400">
                  Top-rated lecture notes & PYQs verified by engineering professors
                </p>
              </div>
              <button
                onClick={onOpenUpload}
                className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
              >
                + Upload Notes
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mySemesterResources.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 mt-0.5">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                        {item.subject}
                      </span>
                      <h4 className="text-sm font-semibold text-white line-clamp-1">{item.title}</h4>
                      <p className="text-xs text-slate-400">By {item.author.name} • {item.downloads} downloads</p>
                    </div>
                  </div>

                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-900 text-slate-300 border border-slate-800 whitespace-nowrap">
                    {item.accessType === 'Free' ? 'Free' : `₹${item.price}`}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* VIEW 2: TEACHER / PROFESSOR DASHBOARD */}
      {currentRole === 'teacher' && (
        <div className="space-y-8">
          
          {/* Teacher metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                <span>Verified Materials Published</span>
                <ShieldCheck className="h-5 w-5 text-emerald-400" />
              </div>
              <p className="text-3xl font-extrabold text-white">14 Modules</p>
              <p className="text-xs text-slate-500 mt-1">Syllabus aligned with VTU/KTU/Anna Univ</p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                <span>Student Reach</span>
                <Users className="h-5 w-5 text-indigo-400" />
              </div>
              <p className="text-3xl font-extrabold text-indigo-400">18,500+ Downloads</p>
              <p className="text-xs text-slate-500 mt-1">Across 8 university semesters</p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                <span>Verification Queue</span>
                <Clock className="h-5 w-5 text-amber-400" />
              </div>
              <p className="text-3xl font-extrabold text-amber-400">
                {verifications.filter((v) => v.status === 'pending').length} Pending
              </p>
              <p className="text-xs text-slate-500 mt-1">Student submissions awaiting review</p>
            </div>
          </div>

          {/* Verification Queue Section */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-emerald-400" />
                  Community Verification Queue
                </h3>
                <p className="text-xs text-slate-400">
                  Review student uploaded notes before awarding the official "Teacher Verified" stamp.
                </p>
              </div>

              <button
                onClick={onOpenUpload}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5"
              >
                <Plus className="h-4 w-4" />
                Upload Faculty Master Notes
              </button>
            </div>

            <div className="space-y-3">
              {verifications.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400">
                        {item.semester} • {item.subject}
                      </span>
                      <span className="text-xs text-slate-400">
                        Submitted by <span className="text-slate-200 font-medium">{item.submittedBy}</span>
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white">{item.resourceTitle}</h4>
                    <p className="text-xs text-slate-400 italic">"{item.notesSnippet}"</p>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.status === 'pending' ? (
                      <>
                        <button
                          onClick={() => handleReject(item.id)}
                          className="px-3 py-1.5 rounded-xl border border-rose-500/30 text-rose-300 hover:bg-rose-500/10 text-xs font-semibold flex items-center gap-1"
                        >
                          <XCircle className="h-4 w-4" />
                          <span>Reject</span>
                        </button>
                        <button
                          onClick={() => handleApprove(item.id)}
                          className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1 shadow-md shadow-emerald-600/20"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                          <span>Approve & Verify</span>
                        </button>
                      </>
                    ) : item.status === 'approved' ? (
                      <span className="text-xs font-bold text-emerald-400 px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-1">
                        <CheckCircle2 className="h-4 w-4" /> Approved
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-rose-400 px-3 py-1 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center gap-1">
                        <XCircle className="h-4 w-4" /> Rejected
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* VIEW 3: TECHIE DASHBOARD */}
      {currentRole === 'techie' && (
        <div className="space-y-8">
          
          {/* Techie Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                <span>Industry Blueprints Published</span>
                <Code2 className="h-5 w-5 text-purple-400" />
              </div>
              <p className="text-3xl font-extrabold text-white">6 Guides</p>
              <p className="text-xs text-slate-500 mt-1">Docker, Go, System Design & Cloud</p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                <span>GitHub Repositories Forked</span>
                <GitBranch className="h-5 w-5 text-pink-400" />
              </div>
              <p className="text-3xl font-extrabold text-pink-400">1,130+ Forks</p>
              <p className="text-xs text-slate-500 mt-1">Student capstone project foundations</p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                <span>Mentorship Inquiries</span>
                <Sparkles className="h-5 w-5 text-amber-400" />
              </div>
              <p className="text-3xl font-extrabold text-amber-400">32 Queries</p>
              <p className="text-xs text-slate-500 mt-1">Resume review & FAANG prep</p>
            </div>
          </div>

          {/* Industry Blueprints List */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Code2 className="h-5 w-5 text-purple-400" />
                  Practical Industry Project Guides
                </h3>
                <p className="text-xs text-slate-400">
                  Real-world architecture patterns for B.Tech final year capstones & developer portfolios
                </p>
              </div>

              <button
                onClick={onOpenUpload}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1.5"
              >
                <Plus className="h-4 w-4" />
                Publish Tech Blueprint
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {INDUSTRY_BLUEPRINTS.map((bp) => (
                <div
                  key={bp.id}
                  className="p-5 rounded-2xl bg-slate-950 border border-slate-800/80 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                        {bp.difficulty}
                      </span>
                      <span className="text-slate-400 text-[11px] flex items-center gap-1">
                        <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                        {bp.githubStars}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white mb-2">{bp.title}</h4>
                    <p className="text-xs text-slate-400 mb-4 line-clamp-3">{bp.overview}</p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {bp.techStack.map((tech) => (
                        <span key={tech} className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-slate-400 text-[11px]">By {bp.author}</span>
                    <button 
                      onClick={() => alert(`Opening blueprint repository for "${bp.title}"`)}
                      className="text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1"
                    >
                      <span>View Code</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
