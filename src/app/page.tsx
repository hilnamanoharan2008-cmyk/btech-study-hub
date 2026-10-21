'use client';

import React, { useState } from 'react';
import { UserRole, Semester, StudyResource, HabitTask } from '@/types';
import { INITIAL_RESOURCES, INITIAL_HABITS } from '@/data/mockData';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { ResourceCatalog } from '@/components/ResourceCatalog';
import { DashboardView } from '@/components/DashboardView';
import { HabitTracker } from '@/components/HabitTracker';
import { UploadModal } from '@/components/UploadModal';
import { Footer } from '@/components/Footer';

export default function Home() {
  const [currentRole, setCurrentRole] = useState<UserRole>('student');
  const [activeTab, setActiveTab] = useState<'catalog' | 'dashboard' | 'habits' | 'blueprints'>('catalog');
  const [selectedSemester, setSelectedSemester] = useState<Semester | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // Dynamic state for resources
  const [resources, setResources] = useState<StudyResource[]>(INITIAL_RESOURCES);

  // Dynamic state for habit tracker
  const [habits, setHabits] = useState<HabitTask[]>(INITIAL_HABITS);
  const [streakCount, setStreakCount] = useState(7);
  const [hasCheckedInToday, setHasCheckedInToday] = useState(false);

  const handleToggleHabit = (id: string) => {
    setHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, completed: !h.completed } : h))
    );
  };

  const handleAddHabit = (newTask: Omit<HabitTask, 'id' | 'completed'>) => {
    const item: HabitTask = {
      ...newTask,
      id: `h-${Date.now()}`,
      completed: false,
    };
    setHabits((prev) => [item, ...prev]);
  };

  const handleDeleteHabit = (id: string) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  };

  const handleCheckInToday = () => {
    if (!hasCheckedInToday) {
      setStreakCount((prev) => prev + 1);
      setHasCheckedInToday(true);
    }
  };

  const handleAddResource = (newRes: StudyResource) => {
    setResources((prev) => [newRes, ...prev]);
  };

  const handleIncrementDownload = (id: string) => {
    setResources((prev) =>
      prev.map((r) => (r.id === id ? { ...r, downloads: r.downloads + 1 } : r))
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Navigation Bar */}
      <Navbar
        currentRole={currentRole}
        onSelectRole={setCurrentRole}
        onOpenUpload={() => setIsUploadOpen(true)}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        streakCount={streakCount}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* TAB 1: CATALOG / HOME */}
        {activeTab === 'catalog' && (
          <div>
            <Hero
              onSelectSemester={setSelectedSemester}
              selectedSemester={selectedSemester}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              currentRole={currentRole}
              onSelectRole={setCurrentRole}
              onOpenUpload={() => setIsUploadOpen(true)}
            />

            <ResourceCatalog
              resources={resources}
              selectedSemester={selectedSemester}
              onSelectSemester={setSelectedSemester}
              searchQuery={searchQuery}
              onOpenUpload={() => setIsUploadOpen(true)}
              onIncrementDownload={handleIncrementDownload}
            />

            {/* Embedded Habit tracker preview at the bottom of catalog */}
            <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-850">
              <HabitTracker
                tasks={habits}
                onToggleTask={handleToggleHabit}
                onAddTask={handleAddHabit}
                onDeleteTask={handleDeleteHabit}
                streakCount={streakCount}
                onCheckInToday={handleCheckInToday}
                hasCheckedInToday={hasCheckedInToday}
              />
            </section>
          </div>
        )}

        {/* TAB 2: USER DASHBOARD (Role-tailored: Student / Teacher / Techie) */}
        {activeTab === 'dashboard' && (
          <DashboardView
            currentRole={currentRole}
            onSelectRole={setCurrentRole}
            resources={resources}
            onOpenUpload={() => setIsUploadOpen(true)}
            streakCount={streakCount}
          />
        )}

        {/* TAB 3: STANDALONE HABIT TRACKER */}
        {activeTab === 'habits' && (
          <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <HabitTracker
              tasks={habits}
              onToggleTask={handleToggleHabit}
              onAddTask={handleAddHabit}
              onDeleteTask={handleDeleteHabit}
              streakCount={streakCount}
              onCheckInToday={handleCheckInToday}
              hasCheckedInToday={hasCheckedInToday}
            />
          </div>
        )}

        {/* TAB 4: TECH BLUEPRINTS */}
        {activeTab === 'blueprints' && (
          <DashboardView
            currentRole="techie"
            onSelectRole={setCurrentRole}
            resources={resources}
            onOpenUpload={() => setIsUploadOpen(true)}
            streakCount={streakCount}
          />
        )}

      </main>

      {/* Upload Study Material Modal */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onAddResource={handleAddResource}
        currentRole={currentRole}
      />

      {/* Footer */}
      <Footer onSelectSemester={setSelectedSemester} />
    </div>
  );
}
