import React from 'react';
import { 
  BookOpen, 
  Video, 
  Calendar, 
  Home, 
  Users, 
  GraduationCap, 
  ChevronRight,
  Menu,
  X,
  TrendingUp,
  User,
  CreditCard
} from 'lucide-react';
import { UserProfile } from '../types';

interface SidebarNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: UserProfile;
  isOpenMobile: boolean;
  setIsOpenMobile: (open: boolean) => void;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  activeTab,
  setActiveTab,
  user,
  isOpenMobile,
  setIsOpenMobile,
}) => {
  const navItems = [
    { id: 'beranda', label: 'Beranda', icon: Home },
    { id: 'progres-belajar', label: 'Progres Belajar', icon: TrendingUp },
    { id: 'modul-perkuliahan', label: 'Modul Perkuliahan & Bank Soal', icon: BookOpen },
    { id: 'video-pembelajaran', label: 'Video Pembelajaran', icon: Video },
    { id: 'sesi-mentoring', label: 'Sesi Mentoring', icon: Calendar },
    { id: 'profil-mahasiswa', label: 'Profil Mahasiswa', icon: User },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setIsOpenMobile(false);
  };

  const isItemActive = (itemId: string) => {
    if (activeTab === itemId) return true;
    if (itemId === 'beranda' && (activeTab === 'overview' || activeTab === 'home')) return true;
    if (itemId === 'progres-belajar' && (activeTab === 'analytics' || activeTab === 'progress' || activeTab === 'progress-belajar')) return true;
    if (itemId === 'modul-perkuliahan' && (activeTab === 'management' || activeTab === 'quiz' || activeTab === 'courses')) return true;
    if (itemId === 'video-pembelajaran' && (activeTab === 'video')) return true;
    if (itemId === 'sesi-mentoring' && (activeTab === 'mentoring' || activeTab === 'calendar' || activeTab === 'tutors')) return true;
    if (itemId === 'profil-mahasiswa' && (activeTab === 'profil' || activeTab === 'profile' || activeTab === 'settings')) return true;
    return false;
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div 
          className="fixed inset-0 bg-slate-900/60 z-40 lg:hidden backdrop-blur-xs"
          onClick={() => setIsOpenMobile(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        id="sidebar-nav"
        className={`fixed lg:static top-0 bottom-0 left-0 z-50 w-72 h-screen flex-shrink-0 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between shrink-0 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-800 text-white flex items-center justify-center font-bold font-heading text-lg shadow-sm">
              A
            </div>
            <div>
              <div className="font-heading font-bold text-lg text-slate-900 tracking-tight leading-none">
                Aksel FEB
              </div>
              <div className="text-[11px] text-slate-500 font-medium mt-1">
                Portal Akademik Mahasiswa
              </div>
            </div>
          </div>
          <button 
            type="button"
            onClick={() => setIsOpenMobile(false)}
            className="p-1.5 text-slate-500 hover:text-slate-800 lg:hidden rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Tutup navigasi"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Academic Program Meta Banner */}
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 shrink-0 text-xs">
          <div className="flex items-center gap-1.5 text-teal-900 font-semibold font-heading">
            <GraduationCap className="w-4 h-4 text-teal-700 shrink-0" />
            <span>FEB Universitas Negeri Jakarta (UNJ)</span>
          </div>
          <div className="text-slate-500 mt-1 flex items-center gap-1.5">
            <span>{user.programStudi}</span>
            <span aria-hidden="true">·</span>
            <span>Semester {user.semester}</span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 min-h-0 overflow-y-auto px-3.5 py-4 space-y-1">
          <div className="px-3 pb-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider font-heading">
            Menu Navigasi
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isItemActive(item.id);
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs transition-all text-left cursor-pointer group ${
                  active
                    ? 'bg-teal-800 text-white font-semibold shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium'
                }`}
              >
                <div className="flex items-center gap-3 truncate">
                  <Icon className={`w-4 h-4 shrink-0 transition-colors ${active ? 'text-white' : 'text-slate-400 group-hover:text-slate-700'}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                {active && (
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-300 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* User Card at bottom */}
        <div className="p-3.5 border-t border-slate-200 bg-white shrink-0">
          <button
            type="button"
            onClick={() => handleNavClick('profil-mahasiswa')}
            className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200 flex items-center gap-3 transition-colors cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-lg bg-teal-800 text-white font-heading font-bold text-xs flex items-center justify-center shrink-0">
              WA
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-slate-900 truncate font-heading group-hover:text-teal-900">
                {user.name}
              </div>
              <div className="text-[11px] text-slate-500 truncate font-mono">
                {user.nim}
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 shrink-0" />
          </button>
        </div>
      </aside>
    </>
  );
};
