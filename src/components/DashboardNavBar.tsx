import React from 'react';
import { 
  Home, 
  TrendingUp, 
  BookOpen, 
  Video, 
  Calendar, 
  User, 
  ChevronRight,
  ArrowLeft,
  Sparkles
} from 'lucide-react';

interface DashboardNavBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const DashboardNavBar: React.FC<DashboardNavBarProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const tabs = [
    { id: 'beranda', label: 'Beranda', icon: Home },
    { id: 'progres-belajar', label: 'Progres Belajar', icon: TrendingUp },
    { id: 'modul-perkuliahan', label: 'Modul Perkuliahan & Bank Soal', icon: BookOpen },
    { id: 'video-pembelajaran', label: 'Video Pembelajaran', icon: Video },
    { id: 'sesi-mentoring', label: 'Sesi Mentoring', icon: Calendar },
    { id: 'profil-mahasiswa', label: 'Profil Mahasiswa', icon: User },
  ];

  const normalizeTab = (id: string) => {
    if (id === 'overview' || id === 'home') return 'beranda';
    if (id === 'analytics' || id === 'progress' || id === 'progress-belajar') return 'progres-belajar';
    if (id === 'management' || id === 'quiz' || id === 'courses') return 'modul-perkuliahan';
    if (id === 'video') return 'video-pembelajaran';
    if (id === 'mentoring' || id === 'calendar' || id === 'tutors') return 'sesi-mentoring';
    if (id === 'profil' || id === 'profile' || id === 'settings') return 'profil-mahasiswa';
    return id;
  };

  const currentTab = normalizeTab(activeTab);

  const getDashboardDetails = (id: string) => {
    switch (id) {
      case 'progres-belajar':
        return {
          title: 'Progres Belajar',
          subtitle: 'Evaluasi ketuntasan silabus, pemetaan capaian materi, dan proyeksi nilai akademik semester 1.',
        };
      case 'modul-perkuliahan':
        return {
          title: 'Modul Perkuliahan & Bank Soal',
          subtitle: 'Struktur kurikulum RPS terakreditasi, bahan ajar diktat, serta simulasi latihan soal ujian mandiri.',
        };
      case 'video-pembelajaran':
        return {
          title: 'Video Pembelajaran',
          subtitle: 'Pemutar rekaman materi perkuliahan terstruktur, ringkasan konsep kunci, dan pembahasan studi kasus.',
        };
      case 'sesi-mentoring':
        return {
          title: 'Sesi Mentoring',
          subtitle: 'Jadwal temu langsung dan asistensi akademik bersama tim asisten dosen Fakultas Ekonomika dan Bisnis.',
        };
      case 'profil-mahasiswa':
        return {
          title: 'Profil Mahasiswa',
          subtitle: 'Informasi identitas rencana studi (KRS), preferensi belajar, dan pengaturan akun mahasiswa.',
        };
      case 'beranda':
      default:
        return {
          title: 'Beranda',
          subtitle: 'Ringkasan komprehensif status perkuliahan, indikator capaian target, dan aktivitas belajar terkini.',
        };
    }
  };

  const currentDetails = getDashboardDetails(currentTab);

  return (
    <div className="bg-white border-b border-slate-200 px-4 md:px-6 py-2.5 shrink-0 z-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        
        {/* Left: Breadcrumbs & Current Section Title */}
        <div className="flex items-center gap-2 text-xs">
          {currentTab !== 'beranda' ? (
            <button
              type="button"
              onClick={() => setActiveTab('beranda')}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-slate-600" />
              <span>Ke Beranda</span>
            </button>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-teal-50 text-teal-900 font-semibold font-heading border border-teal-100">
              <Home className="w-3.5 h-3.5 text-teal-700" />
              <span>Beranda</span>
            </span>
          )}

          <ChevronRight className="w-3.5 h-3.5 text-slate-300 hidden sm:inline" />

          <div className="hidden sm:flex items-center gap-2">
            <span className="font-heading font-bold text-slate-900 text-sm">
              {currentDetails.title}
            </span>
            <span className="text-slate-400" aria-hidden="true">·</span>
            <span className="text-slate-500 text-xs hidden lg:inline max-w-[500px] truncate">
              {currentDetails.subtitle}
            </span>
          </div>
        </div>

        {/* Right: Clean Segmented Section Navigation */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-teal-800 text-white font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};
