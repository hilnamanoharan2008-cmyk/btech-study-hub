export type UserRole = 'student' | 'teacher' | 'techie';

export type Semester = 'S1' | 'S2' | 'S3' | 'S4' | 'S5' | 'S6' | 'S7' | 'S8';

export type ResourceCategory = 
  | 'Lecture Notes'
  | 'Previous Year Question (PYQ)'
  | 'Lab Manual'
  | 'Project Blueprint'
  | 'Industry Guide';

export type AccessType = 'Free' | 'Paid';

export interface StudyResource {
  id: string;
  title: string;
  subject: string;
  semester: Semester;
  category: ResourceCategory;
  accessType: AccessType;
  price?: number; // In INR, 0 if free
  author: {
    name: string;
    role: UserRole;
    institution?: string;
    avatarUrl?: string;
    verified: boolean;
  };
  downloads: number;
  rating: number;
  reviewsCount: number;
  fileSize: string;
  fileType: 'pdf' | 'docx' | 'zip' | 'code';
  description: string;
  tags: string[];
  createdAt: string;
  previewUrl?: string;
}

export interface HabitTask {
  id: string;
  title: string;
  subject: string;
  durationMinutes: number;
  completed: boolean;
  category: 'Coding' | 'Theory' | 'Revision' | 'Project' | 'PYQ Practice';
}

export interface PendingVerification {
  id: string;
  resourceTitle: string;
  subject: string;
  semester: Semester;
  submittedBy: string;
  submittedAt: string;
  fileSize: string;
  notesSnippet: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface IndustryBlueprint {
  id: string;
  title: string;
  techStack: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  author: string;
  githubStars?: number;
  forks?: number;
  overview: string;
}
