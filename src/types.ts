export interface UserProfile {
  name: string;
  nim: string;
  programStudi: string;
  angkatan: string;
  semester: number;
  completedCredits: number;
  totalTargetCredits: number;
  mentoringHours: number;
  activeCoursesCount: number;
}

export interface Course {
  id: string;
  code: string;
  title: string;
  department: 'Akuntansi' | 'Ilmu Ekonomi' | 'Manajemen' | 'Kuantitatif & Umum';
  credits: number;
  semester: number;
  progressPercent: number;
  totalModules: number;
  completedModules: number;
  instructor: {
    name: string;
    role: string;
    gpa: string;
  };
  summary: string;
  nextTopic: string;
  difficulty: 'Dasar' | 'Menengah' | 'Kuantitatif';
}

export interface PlaylistItem {
  id: string;
  title: string;
  chapter: string;
  duration: string;
  videoUrl: string;
  isCompleted: boolean;
  notesSummary: string;
  keyConcepts: string[];
}

export interface QuestionOption {
  id: 'A' | 'B' | 'C' | 'D' | 'E';
  text: string;
}

export interface QuizQuestion {
  id: number;
  subject: string;
  topic: string;
  difficulty: 'Mudah' | 'Sedang' | 'Tantangan UTS';
  questionNumber: number;
  totalQuestions: number;
  contextText?: string;
  prompt: string;
  options: QuestionOption[];
  correctAnswer: 'A' | 'B' | 'C' | 'D' | 'E';
  explanation: {
    corePrinciple: string;
    detailedWalkthrough: string;
    tutorTips: string;
    relatedFormula?: string;
  };
}

export interface MentoringSession {
  id: string;
  day: 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat' | 'Sabtu' | 'Minggu';
  dateStr: string;
  timeSlot: string;
  courseTitle: string;
  sessionTopic: string;
  type: 'Klinik Bedah Soal' | '1-on-1 Mentoring' | 'Study Group Terarah' | 'Office Hours Dosen/Asdos';
  tutorName: string;
  tutorTitle: string;
  tutorPhotoInitials: string;
  availableSlots: number;
  totalSlots: number;
  isEnrolled: boolean;
  meetingPlatform: 'Google Meet' | 'Zoom Ruang Diskusi FEB' | 'Lab Komputasi FEB';
}

export interface SearchSuggestion {
  id: string;
  title: string;
  category: 'Mata Kuliah' | 'Video Materi' | 'Latihan Soal' | 'Sesi Mentoring' | 'Tutor FEB' | 'Progress Belajar' | 'Profil';
  sectionTarget: 'beranda' | 'progress-belajar' | 'modul-perkuliahan' | 'video-pembelajaran' | 'sesi-mentoring' | 'profil' | 'courses' | 'video' | 'quiz' | 'calendar' | 'progress' | 'resume' | 'mentoring';
  meta: string;
}
