'use client';

import React, { useState, useMemo } from 'react';
import { Semester, StudyResource, ResourceCategory, AccessType } from '@/types';
import { SEMESTER_SUBJECTS } from '@/data/mockData';
import { 
  BookOpen, 
  Download, 
  FileText, 
  Filter, 
  Star, 
  CheckCircle2, 
  ShieldCheck, 
  GraduationCap, 
  Code2, 
  ExternalLink,
  Lock,
  Tag,
  Eye,
  X,
  CreditCard,
  Check
} from 'lucide-react';

interface ResourceCatalogProps {
  resources: StudyResource[];
  selectedSemester: Semester | 'ALL';
  onSelectSemester: (semester: Semester | 'ALL') => void;
  searchQuery: string;
  onOpenUpload: () => void;
  onIncrementDownload: (id: string) => void;
}

export const ResourceCatalog: React.FC<ResourceCatalogProps> = ({
  resources,
  selectedSemester,
  onSelectSemester,
  searchQuery,
  onOpenUpload,
  onIncrementDownload,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory | 'ALL'>('ALL');
  const [selectedAccess, setSelectedAccess] = useState<AccessType | 'ALL'>('ALL');
  const [selectedSubject, setSelectedSubject] = useState<string>('ALL');
  const [previewItem, setPreviewItem] = useState<StudyResource | null>(null);
  const [purchaseModalItem, setPurchaseModalItem] = useState<StudyResource | null>(null);
  const [purchaseSuccess, setPurchaseSuccess] = useState<boolean>(false);
  const [purchasedIds, setPurchasedIds] = useState<string[]>([]);

  // List of available subjects based on selected semester
  const availableSubjects = useMemo(() => {
    if (selectedSemester === 'ALL') {
      const all: string[] = [];
      Object.values(SEMESTER_SUBJECTS).forEach((subs) => all.push(...subs));
      return Array.from(new Set(all));
    }
    return SEMESTER_SUBJECTS[selectedSemester] || [];
  }, [selectedSemester]);

  // Filtered resources
  const filteredResources = useMemo(() => {
    return resources.filter((res) => {
      // Semester filter
      if (selectedSemester !== 'ALL' && res.semester !== selectedSemester) {
        return false;
      }
      // Subject filter
      if (selectedSubject !== 'ALL' && res.subject !== selectedSubject) {
        return false;
      }
      // Category filter
      if (selectedCategory !== 'ALL' && res.category !== selectedCategory) {
        return false;
      }
      // Access filter
      if (selectedAccess !== 'ALL' && res.accessType !== selectedAccess) {
        return false;
      }
      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesTitle = res.title.toLowerCase().includes(q);
        const matchesSubject = res.subject.toLowerCase().includes(q);
        const matchesAuthor = res.author.name.toLowerCase().includes(q);
        const matchesTags = res.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesSubject && !matchesAuthor && !matchesTags) {
          return false;
        }
      }
      return true;
    });
  }, [resources, selectedSemester, selectedSubject, selectedCategory, selectedAccess, searchQuery]);

  const semesters: Semester[] = ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'];
  const categories: ResourceCategory[] = [
    'Lecture Notes',
    'Previous Year Question (PYQ)',
    'Lab Manual',
    'Project Blueprint',
    'Industry Guide',
  ];

  const handleDownload = (resource: StudyResource) => {
    const isPaid = resource.accessType === 'Paid';
    const isUnlocked = purchasedIds.includes(resource.id);

    if (isPaid && !isUnlocked) {
      setPurchaseModalItem(resource);
      return;
    }

    onIncrementDownload(resource.id);
    // Simulated browser download trigger
    alert(`Downloading "${resource.title}" (${resource.fileSize}). Saved to your downloads!`);
  };

  const handleCompleteMockPurchase = (id: string) => {
    setPurchaseSuccess(true);
    setTimeout(() => {
      setPurchasedIds((prev) => [...prev, id]);
      setPurchaseModalItem(null);
      setPurchaseSuccess(false);
      onIncrementDownload(id);
      alert('Payment successful! Resource unlocked and download initiated.');
    }, 1200);
  };

  return (
    <section id="catalog-section" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              S1 to S8 Academic Repository
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Curated Study Materials & Guides
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Showing {filteredResources.length} resources tailored for B.Tech Computer Science Engineering
          </p>
        </div>

        <button
          onClick={onOpenUpload}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-indigo-500/40 hover:border-indigo-500 text-indigo-300 text-sm font-semibold transition"
        >
          <span>Share Your Notes</span>
          <span className="text-xs px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
            Earn & Help
          </span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl p-4 mb-8 space-y-4">
        
        {/* Semester selector */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
            Filter by Semester
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                onSelectSemester('ALL');
                setSelectedSubject('ALL');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                selectedSemester === 'ALL'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              All Semesters
            </button>
            {semesters.map((sem) => (
              <button
                key={sem}
                onClick={() => {
                  onSelectSemester(sem);
                  setSelectedSubject('ALL');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  selectedSemester === sem
                    ? 'bg-indigo-600 text-white shadow'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {sem}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-800/80">
          
          {/* Subject Filter */}
          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1.5">
              Subject ({availableSubjects.length} available)
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="ALL">All Subjects</option>
              {availableSubjects.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1.5">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="ALL">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Access Filter (Free vs Paid) */}
          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1.5">
              Access Type
            </label>
            <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
              {(['ALL', 'Free', 'Paid'] as const).map((acc) => (
                <button
                  key={acc}
                  onClick={() => setSelectedAccess(acc)}
                  className={`py-1.5 text-xs font-semibold rounded-lg transition ${
                    selectedAccess === acc
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {acc}
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Resources Grid */}
      {filteredResources.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800 p-8">
          <BookOpen className="h-12 w-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-1">No Study Materials Found</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
            We couldn't find any resources matching your filters. Try adjusting your search term, semester, or upload one to get community credits!
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => {
                onSelectSemester('ALL');
                setSelectedSubject('ALL');
                setSelectedCategory('ALL');
                setSelectedAccess('ALL');
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
            >
              Reset Filters
            </button>
            <button
              onClick={onOpenUpload}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
            >
              Upload Notes for this Topic
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((res) => {
            const isUnlocked = res.accessType === 'Free' || purchasedIds.includes(res.id);

            return (
              <div
                key={res.id}
                className="group relative bg-slate-900/70 border border-slate-800/90 hover:border-slate-700/80 hover:bg-slate-900 transition-all rounded-2xl p-5 flex flex-col justify-between shadow-lg hover:shadow-indigo-500/5"
              >
                <div>
                  {/* Card top badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        {res.semester}
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-800 text-slate-300">
                        {res.category}
                      </span>
                    </div>

                    {res.accessType === 'Free' ? (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        FREE
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20 flex items-center gap-1">
                        <Lock className="h-3 w-3" />
                        {isUnlocked ? 'Unlocked' : `₹${res.price}`}
                      </span>
                    )}
                  </div>

                  {/* Subject Name */}
                  <p className="text-xs font-medium text-indigo-400 mb-1 line-clamp-1">
                    {res.subject}
                  </p>

                  {/* Title */}
                  <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition line-clamp-2 mb-2 leading-snug">
                    {res.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-400 line-clamp-3 mb-4 leading-relaxed">
                    {res.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {res.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-800/80 text-slate-400 flex items-center gap-1"
                      >
                        <Tag className="h-2.5 w-2.5 text-slate-500" />
                        {tag}
                      </span>
                    ))}
                    {res.tags.length > 3 && (
                      <span className="text-[10px] px-1 text-slate-500 self-center">
                        +{res.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="pt-4 border-t border-slate-800/80">
                  {/* Author information */}
                  <div className="flex items-center justify-between text-xs mb-3">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-indigo-400 text-xs">
                        {res.author.name[0]}
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="text-slate-200 font-medium line-clamp-1">
                            {res.author.name}
                          </span>
                          {res.author.verified && (
                            <ShieldCheck className="h-3.5 w-3.5 text-teal-400 flex-shrink-0" />
                          )}
                        </div>
                        <span className="text-[10px] text-slate-500 capitalize">
                          {res.author.role}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-amber-400 font-semibold text-xs">
                      <Star className="h-3.5 w-3.5 fill-amber-400" />
                      <span>{res.rating.toFixed(1)}</span>
                      <span className="text-[10px] text-slate-500 font-normal">
                        ({res.downloads})
                      </span>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setPreviewItem(res)}
                      className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>Preview</span>
                    </button>

                    <button
                      onClick={() => handleDownload(res)}
                      className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold transition shadow-sm ${
                        isUnlocked
                          ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
                          : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold'
                      }`}
                    >
                      {isUnlocked ? (
                        <>
                          <Download className="h-3.5 w-3.5" />
                          <span>Get ({res.fileSize})</span>
                        </>
                      ) : (
                        <>
                          <Lock className="h-3.5 w-3.5" />
                          <span>Unlock ₹{res.price}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Preview Modal */}
      {previewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setPreviewItem(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-0.5 rounded text-xs font-bold bg-indigo-500/20 text-indigo-400">
                {previewItem.semester} • {previewItem.subject}
              </span>
              <span className="text-xs text-slate-400">• {previewItem.category}</span>
            </div>

            <h3 className="text-xl font-bold text-white mb-2">{previewItem.title}</h3>
            
            <div className="flex items-center gap-4 text-xs text-slate-400 mb-6 pb-4 border-b border-slate-800">
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                <span className="text-white font-semibold">{previewItem.rating}</span> rating
              </span>
              <span>•</span>
              <span>{previewItem.downloads} total downloads</span>
              <span>•</span>
              <span>File size: {previewItem.fileSize} ({previewItem.fileType.toUpperCase()})</span>
            </div>

            {/* Simulated Document Preview Page */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 mb-6 text-sm">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80 text-xs text-slate-400">
                <span className="flex items-center gap-1 font-mono">
                  <FileText className="h-4 w-4 text-indigo-400" />
                  sample_chapter_preview.pdf
                </span>
                <span className="text-[11px] bg-slate-800 px-2 py-0.5 rounded">Page 1 of 42</span>
              </div>
              <p className="text-slate-300 leading-relaxed font-sans mb-3">
                {previewItem.description}
              </p>
              <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800 font-mono text-xs text-slate-400 space-y-1">
                <p className="text-indigo-300 font-semibold">// Syllabus Alignment Reference</p>
                <p>✓ Module 1: Core Theorems & Architectural Principles</p>
                <p>✓ Module 2: State Machines, Algorithmic Derivations & Diagrams</p>
                <p>✓ Module 3: University Previous 5-Year Solved Problems</p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs text-slate-400">Author</p>
                <p className="text-sm font-semibold text-white flex items-center gap-1">
                  {previewItem.author.name}
                  {previewItem.author.verified && <ShieldCheck className="h-4 w-4 text-teal-400" />}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setPreviewItem(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setPreviewItem(null);
                    handleDownload(previewItem);
                  }}
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30"
                >
                  {previewItem.accessType === 'Free' || purchasedIds.includes(previewItem.id)
                    ? 'Download File Now'
                    : `Unlock for ₹${previewItem.price}`}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Mock Monetization / Purchase Modal */}
      {purchaseModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setPurchaseModalItem(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="text-center mb-5">
              <div className="h-12 w-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 mx-auto flex items-center justify-center mb-3">
                <CreditCard className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Unlock Premium Study Material</h3>
              <p className="text-xs text-slate-400 mt-1">
                Directly supports the author & verified CSE contributors.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 mb-5">
              <p className="text-xs text-indigo-400 font-semibold mb-1">{purchaseModalItem.subject}</p>
              <h4 className="text-sm font-bold text-white mb-2">{purchaseModalItem.title}</h4>
              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800 text-slate-300">
                <span>Access: Lifetime Download & Updates</span>
                <span className="text-base font-extrabold text-white">₹{purchaseModalItem.price}</span>
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Check className="h-4 w-4 text-emerald-400" />
                <span>Instant high-resolution PDF download</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Check className="h-4 w-4 text-emerald-400" />
                <span>Teacher-verified handwritten formulas & diagrams</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Check className="h-4 w-4 text-emerald-400" />
                <span>Simulated Secure Payment Gateway (Supabase + Stripe)</span>
              </div>
            </div>

            <button
              disabled={purchaseSuccess}
              onClick={() => handleCompleteMockPurchase(purchaseModalItem.id)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-400 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition flex items-center justify-center gap-2"
            >
              {purchaseSuccess ? (
                <>
                  <CheckCircle2 className="h-5 w-5 text-emerald-300 animate-bounce" />
                  <span>Processing Payment...</span>
                </>
              ) : (
                <>
                  <CreditCard className="h-4 w-4" />
                  <span>Pay ₹{purchaseModalItem.price} & Unlock Instantly</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

    </section>
  );
};
