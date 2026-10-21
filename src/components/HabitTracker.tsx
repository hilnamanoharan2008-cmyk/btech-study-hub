'use client';

import React, { useState } from 'react';
import { HabitTask } from '@/types';
import { 
  Flame, 
  CheckCircle2, 
  Circle, 
  Plus, 
  Trash2, 
  Trophy, 
  Clock, 
  Sparkles,
  BookOpen,
  Calendar,
  Check
} from 'lucide-react';

interface HabitTrackerProps {
  tasks: HabitTask[];
  onToggleTask: (id: string) => void;
  onAddTask: (task: Omit<HabitTask, 'id' | 'completed'>) => void;
  onDeleteTask: (id: string) => void;
  streakCount: number;
  onCheckInToday: () => void;
  hasCheckedInToday: boolean;
}

export const HabitTracker: React.FC<HabitTrackerProps> = ({
  tasks,
  onToggleTask,
  onAddTask,
  onDeleteTask,
  streakCount,
  onCheckInToday,
  hasCheckedInToday,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState('');
  const [newDuration, setNewDuration] = useState(30);
  const [newCategory, setNewCategory] = useState<HabitTask['category']>('Coding');

  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onAddTask({
      title: newTitle.trim(),
      subject: newSubject.trim() || 'General CSE',
      durationMinutes: Number(newDuration) || 30,
      category: newCategory,
    });

    setNewTitle('');
    setNewSubject('');
    setShowAddForm(false);
  };

  const daysOfWeek = [
    { day: 'M', active: true, label: 'Mon' },
    { day: 'T', active: true, label: 'Tue' },
    { day: 'W', active: true, label: 'Wed' },
    { day: 'T', active: true, label: 'Thu' },
    { day: 'F', active: true, label: 'Fri' },
    { day: 'S', active: true, label: 'Sat' },
    { day: 'S', active: hasCheckedInToday, label: 'Today', isToday: true },
  ];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
      
      {/* Background ambient flame glow */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-amber-500/10 blur-3xl rounded-full pointer-events-none" />

      {/* Header section with streak */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1">
              <Flame className="h-3.5 w-3.5 fill-amber-400" />
              Daily Study Streak
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            Consistency & Routine Tracker
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Engineers are made through steady daily focus. Check in daily to unlock study badges!
          </p>
        </div>

        {/* Big Streak Pill & Check-in */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300">
            <Flame className="h-6 w-6 text-amber-400 fill-amber-400 animate-pulse" />
            <div>
              <p className="text-lg font-extrabold text-white leading-none">
                {streakCount} {streakCount === 1 ? 'Day' : 'Days'}
              </p>
              <p className="text-[10px] text-amber-400 font-semibold uppercase tracking-wider">
                Current Streak
              </p>
            </div>
          </div>

          <button
            disabled={hasCheckedInToday}
            onClick={onCheckInToday}
            className={`px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition flex items-center gap-1.5 shadow-md ${
              hasCheckedInToday
                ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 cursor-default'
                : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-amber-500/20'
            }`}
          >
            {hasCheckedInToday ? (
              <>
                <Check className="h-4 w-4 text-emerald-400" />
                <span>Checked In</span>
              </>
            ) : (
              <>
                <Flame className="h-4 w-4" />
                <span>Check In (+1 Day)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Week streak visualizer */}
      <div className="py-5 border-b border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Calendar className="h-4 w-4 text-indigo-400" />
          <span>7-Day Consistency Track:</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {daysOfWeek.map((d, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div
                className={`h-9 w-9 rounded-xl flex items-center justify-center font-bold text-xs transition-all ${
                  d.active
                    ? 'bg-gradient-to-tr from-amber-500 to-orange-400 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-slate-800 text-slate-500 border border-slate-700/60'
                } ${d.isToday ? 'ring-2 ring-indigo-400' : ''}`}
              >
                {d.active ? <Flame className="h-4 w-4 fill-slate-950" /> : d.day}
              </div>
              <span className={`text-[10px] ${d.isToday ? 'text-indigo-400 font-bold' : 'text-slate-500'}`}>
                {d.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Target Progress Bar */}
      <div className="py-5">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-semibold text-slate-300 flex items-center gap-1.5">
            <Trophy className="h-4 w-4 text-amber-400" />
            Today's Target Progress ({completedCount}/{tasks.length} Completed)
          </span>
          <span className="font-extrabold text-indigo-400">{progressPercent}%</span>
        </div>

        <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400 transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Checklist list */}
      <div className="space-y-2.5 mb-6">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`p-3.5 rounded-2xl border transition flex items-center justify-between gap-3 ${
              task.completed
                ? 'bg-slate-950/60 border-slate-800/60 text-slate-400'
                : 'bg-slate-950 border-slate-800 text-slate-100 hover:border-slate-700'
            }`}
          >
            <div 
              onClick={() => onToggleTask(task.id)}
              className="flex items-center gap-3 cursor-pointer flex-1"
            >
              <button className="text-indigo-400 hover:text-indigo-300 transition flex-shrink-0">
                {task.completed ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 fill-emerald-400/20" />
                ) : (
                  <Circle className="h-5 w-5 text-slate-600" />
                )}
              </button>
              <div>
                <p className={`text-sm font-medium ${task.completed ? 'line-through text-slate-500' : 'text-white'}`}>
                  {task.title}
                </p>
                <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-400">
                  <span className="text-indigo-400">{task.subject}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-[11px] text-slate-500">
                    <Clock className="h-3 w-3" />
                    {task.durationMinutes} mins
                  </span>
                  <span>•</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-medium">
                    {task.category}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onDeleteTask(task.id)}
              className="text-slate-600 hover:text-rose-400 p-1.5 rounded-lg hover:bg-slate-800 transition"
              title="Delete Task"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Add Task Button / Form */}
      {showAddForm ? (
        <form onSubmit={handleCreate} className="p-4 rounded-2xl bg-slate-950 border border-slate-700 space-y-3">
          <p className="text-xs font-bold text-white uppercase tracking-wider">Add New Study Target</p>
          <input
            type="text"
            required
            placeholder="e.g. Solve 2 problems on Graph Traversal (BFS/DFS)"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <input
              type="text"
              placeholder="Subject (e.g. DAA)"
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            />

            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value as any)}
              className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="Coding">Coding</option>
              <option value="Theory">Theory</option>
              <option value="Revision">Revision</option>
              <option value="Project">Project</option>
              <option value="PYQ Practice">PYQ Practice</option>
            </select>

            <input
              type="number"
              min={10}
              max={240}
              placeholder="Minutes"
              value={newDuration}
              onChange={(e) => setNewDuration(Number(e.target.value))}
              className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
            >
              Add Target
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setShowAddForm(true)}
          className="w-full py-3 rounded-2xl border border-dashed border-slate-700 hover:border-indigo-500 text-slate-400 hover:text-indigo-300 text-xs sm:text-sm font-semibold transition flex items-center justify-center gap-2 bg-slate-950/40"
        >
          <Plus className="h-4 w-4" />
          <span>Add Custom Study Goal</span>
        </button>
      )}

    </div>
  );
};
