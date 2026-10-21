'use client';

import React, { useState } from 'react';
import { Semester, ResourceCategory, AccessType, UserRole, StudyResource } from '@/types';
import { SEMESTER_SUBJECTS } from '@/data/mockData';
import { 
  X, 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles,
  Lock,
  IndianRupee,
  ShieldCheck
} from 'lucide-react';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddResource: (resource: StudyResource) => void;
  currentRole: UserRole;
}

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  onAddResource,
  currentRole,
}) => {
  const [semester, setSemester] = useState<Semester>('S4');
  const [subject, setSubject] = useState<string>('Operating Systems (OS)');
  const [category, setCategory] = useState<ResourceCategory>('Lecture Notes');
  const [accessType, setAccessType] = useState<AccessType>('Free');
  const [price, setPrice] = useState<number>(99);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [authorName, setAuthorName] = useState(
    currentRole === 'teacher' ? 'Prof. K. Sharma' : currentRole === 'techie' ? 'Senior Dev Rohit' : 'Aryan (Student)'
  );
  const [tagsInput, setTagsInput] = useState('OS, Virtual Memory, Notes');
  const [selectedFile, setSelectedFile] = useState<{ name: string; size: string } | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  if (!isOpen) return null;

  const currentSubjects = SEMESTER_SUBJECTS[semester] || [];

  const handleSemesterChange = (newSem: Semester) => {
    setSemester(newSem);
    if (SEMESTER_SUBJECTS[newSem]?.length > 0) {
      setSubject(SEMESTER_SUBJECTS[newSem][0]);
    }
  };

  const handleFileSimulate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      setSelectedFile({
        name: f.name,
        size: `${(f.size / (1024 * 1024)).toFixed(1)} MB`,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsUploading(true);

    setTimeout(() => {
      const newRes: StudyResource = {
        id: `res-${Date.now()}`,
        title: title.trim(),
        subject,
        semester,
        category,
        accessType,
        price: accessType === 'Paid' ? Number(price) || 99 : 0,
        author: {
          name: authorName.trim() || 'Contributor',
          role: currentRole,
          institution: currentRole === 'teacher' ? 'Verified Faculty' : 'B.Tech CSE Community',
          verified: currentRole === 'teacher',
        },
        downloads: 1,
        rating: 5.0,
        reviewsCount: 1,
        fileSize: selectedFile?.size || '12.4 MB',
        fileType: 'pdf',
        description: description.trim() || 'Comprehensive handwritten & typed study materials for university examination preparations.',
        tags: tagsInput.split(',').map((t) => t.trim()).filter(Boolean),
        createdAt: new Date().toISOString().split('T')[0],
      };

      onAddResource(newRes);
      setIsUploading(false);
      setUploadSuccess(true);

      setTimeout(() => {
        setUploadSuccess(false);
        onClose();
      }, 1500);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-xl hover:bg-slate-800 transition"
        >
          <X className="h-5 w-5" />
        </button>

        {uploadSuccess ? (
          <div className="py-12 text-center space-y-4">
            <div className="h-16 w-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30 animate-bounce">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-bold text-white">Study Material Published!</h3>
            <p className="text-sm text-slate-400 max-w-sm mx-auto">
              {currentRole === 'teacher'
                ? 'Your verified faculty notes are now live for all B.Tech CSE students across S1-S8!'
                : 'Your submission has been cataloged and queued for teacher verification badge!'}
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Upload & Share
              </span>
              {currentRole === 'teacher' && (
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3" />
                  Auto-Verified Professor Pack
                </span>
              )}
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Contribute Study Material
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mb-6">
              Upload PDF notes, previous year question banks, or lab assignments. Powered by Supabase Storage.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Title */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Document Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Operating Systems: CPU Scheduling & Deadlock Complete Notes"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Semester & Subject */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Semester *
                  </label>
                  <select
                    value={semester}
                    onChange={(e) => handleSemesterChange(e.target.value as Semester)}
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  >
                    {(['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'] as Semester[]).map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Subject *
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  >
                    {currentSubjects.map((sub) => (
                      <option key={sub} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Category & Access Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ResourceCategory)}
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Lecture Notes">Lecture Notes</option>
                    <option value="Previous Year Question (PYQ)">Previous Year Question (PYQ)</option>
                    <option value="Lab Manual">Lab Manual</option>
                    <option value="Project Blueprint">Project Blueprint</option>
                    <option value="Industry Guide">Industry Guide</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Access / Pricing *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setAccessType('Free')}
                      className={`py-2 text-xs font-semibold rounded-xl border transition ${
                        accessType === 'Free'
                          ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      Free (Open)
                    </button>
                    <button
                      type="button"
                      onClick={() => setAccessType('Paid')}
                      className={`py-2 text-xs font-semibold rounded-xl border transition flex items-center justify-center gap-1 ${
                        accessType === 'Paid'
                          ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      <Lock className="h-3 w-3" />
                      Paid
                    </button>
                  </div>
                </div>
              </div>

              {/* If Paid, show price input */}
              {accessType === 'Paid' && (
                <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-between">
                  <span className="text-xs text-amber-300 font-medium">Set Price (₹ INR):</span>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-slate-400">₹</span>
                    <input
                      type="number"
                      min={49}
                      max={999}
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="w-24 bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-sm text-white focus:outline-none focus:border-amber-500 font-bold"
                    />
                  </div>
                </div>
              )}

              {/* File Drag & Drop Simulation */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Upload Document (PDF, DOCX, ZIP) *
                </label>
                <label className="border-2 border-dashed border-slate-700 hover:border-indigo-500 rounded-2xl p-4 text-center cursor-pointer block bg-slate-950/60 hover:bg-slate-950 transition">
                  <input
                    type="file"
                    accept=".pdf,.docx,.doc,.zip,.txt"
                    onChange={handleFileSimulate}
                    className="hidden"
                  />
                  {selectedFile ? (
                    <div className="flex items-center justify-center gap-2 text-indigo-400 text-xs font-semibold">
                      <FileText className="h-5 w-5" />
                      <span>{selectedFile.name} ({selectedFile.size})</span>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <Upload className="h-6 w-6 text-slate-500 mx-auto" />
                      <p className="text-xs font-semibold text-slate-300">
                        Click or drag PDF / Document here
                      </p>
                      <p className="text-[11px] text-slate-500">Up to 50MB per file</p>
                    </div>
                  )}
                </label>
              </div>

              {/* Description & Tags */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Author / Contributor Name
                  </label>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Tags (Comma separated)
                  </label>
                  <input
                    type="text"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="e.g. OS, Algorithms, GATE"
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Brief Summary / Topics Included
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Outline which chapters, university syllabus modules, and numerical examples are covered..."
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition"
                >
                  {isUploading ? (
                    <>
                      <div className="h-3.5 w-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      <span>Uploading to Supabase...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4" />
                      <span>Publish Study Resource</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
