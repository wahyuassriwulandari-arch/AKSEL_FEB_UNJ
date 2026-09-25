import React, { useState } from 'react';
import { SidebarNav } from './components/SidebarNav';
import { TopHeader } from './components/TopHeader';
import { DashboardNavBar } from './components/DashboardNavBar';
import { OverviewSection } from './components/OverviewSection';
import { ProgressAndResumeSection } from './components/ProgressAndResumeSection';
import { CourseDataTableManagement } from './components/CourseDataTableManagement';
import { VideoPlaylistSection } from './components/VideoPlaylistSection';
import { MentoringDashboardContainer } from './components/MentoringDashboardContainer';
import { StudentProfileSection } from './components/StudentProfileSection';

import { 
  initialUserProfile, 
  coursesData, 
  playlistVideos, 
  quizQuestionsData, 
  weeklyMentoringData 
} from './data/mockData';

export default function App() {
  const [user, setUser] = useState(initialUserProfile);
  const [activeTab, setActiveTab] = useState('beranda');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const [courses] = useState(coursesData);
  const [playlist, setPlaylist] = useState(playlistVideos);
  const [questions] = useState(quizQuestionsData);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [mentoringSessions, setMentoringSessions] = useState(weeklyMentoringData);

  // Tab navigation helper: sets active tab and smoothly normalizes names
  const navigateToTab = (tabId: string) => {
    let resolvedId = tabId;
    if (tabId === 'hero' || tabId === 'home' || tabId === 'overview') resolvedId = 'beranda';
    if (tabId === 'progress' || tabId === 'resume' || tabId === 'analytics') resolvedId = 'progres-belajar';
    if (tabId === 'courses' || tabId === 'quiz' || tabId === 'management') resolvedId = 'modul-perkuliahan';
    if (tabId === 'video') resolvedId = 'video-pembelajaran';
    if (tabId === 'mentoring' || tabId === 'tutors' || tabId === 'calendar') resolvedId = 'sesi-mentoring';
    if (tabId === 'profil' || tabId === 'profile' || tabId === 'settings') resolvedId = 'profil-mahasiswa';

    setActiveTab(resolvedId);
  };

  // Handler for predictive search suggestions
  const handleSelectSuggestion = (targetSection: string, detailId?: string) => {
    navigateToTab(targetSection);
    if (targetSection === 'modul-perkuliahan' || targetSection === 'quiz' || targetSection === 'management') {
      setActiveQuestionIndex(0);
    }
  };

  // Handler when clicking course to watch video
  const handleSelectCourseForVideo = (courseId?: string) => {
    navigateToTab('video-pembelajaran');
  };

  // Handler when clicking course to practice questions
  const handleSelectCourseForQuiz = (courseTitle: string) => {
    const foundIdx = questions.findIndex(q => q.subject.toLowerCase() === courseTitle.toLowerCase());
    if (foundIdx !== -1) {
      setActiveQuestionIndex(foundIdx);
    } else {
      setActiveQuestionIndex(0);
    }
    navigateToTab('modul-perkuliahan');
  };

  // Toggle RSVP for mentoring session
  const handleToggleEnrollment = (sessionId: string) => {
    setMentoringSessions(prev =>
      prev.map(s => {
        if (s.id === sessionId) {
          const newStatus = !s.isEnrolled;
          return {
            ...s,
            isEnrolled: newStatus,
            availableSlots: newStatus ? s.availableSlots - 1 : s.availableSlots + 1,
          };
        }
        return s;
      })
    );
  };

  const isSectionActive = (sectionName: string) => {
    if (activeTab === sectionName) return true;
    if (sectionName === 'beranda' && (activeTab === 'overview' || activeTab === 'home')) return true;
    if (sectionName === 'progres-belajar' && (activeTab === 'analytics' || activeTab === 'progress')) return true;
    if (sectionName === 'modul-perkuliahan' && (activeTab === 'management' || activeTab === 'quiz' || activeTab === 'courses')) return true;
    if (sectionName === 'video-pembelajaran' && activeTab === 'video') return true;
    if (sectionName === 'sesi-mentoring' && (activeTab === 'mentoring' || activeTab === 'calendar' || activeTab === 'tutors')) return true;
    if (sectionName === 'profil-mahasiswa' && (activeTab === 'profil' || activeTab === 'profile' || activeTab === 'settings')) return true;
    return false;
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex bg-slate-50 font-sans text-slate-800 antialiased selection:bg-teal-100 selection:text-teal-900">
      
      {/* 1. Navigator Bar Samping (Sidebar) - Fixed on desktop (100vh) */}
      <SidebarNav
        activeTab={activeTab}
        setActiveTab={navigateToTab}
        user={user}
        isOpenMobile={isMobileNavOpen}
        setIsOpenMobile={setIsMobileNavOpen}
      />

      {/* 2. Main Frame: Takes Remaining Width & 100vh Height (No Window Scroll) */}
      <div className="flex-1 h-screen flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Header (shrink-0) */}
        <TopHeader
          user={user}
          onOpenMobileNav={() => setIsMobileNavOpen(true)}
          onSelectSuggestion={handleSelectSuggestion}
        />

        {/* Dashboard Breadcrumbs & Section Tab Switcher (shrink-0) */}
        <DashboardNavBar
          activeTab={activeTab}
          setActiveTab={navigateToTab}
        />

        {/* 3. Section Container: 100% of remaining height, overflow-hidden */}
        <main className="flex-1 min-h-0 overflow-hidden relative bg-slate-50">
          
          {/* SECTION 1: BERANDA */}
          <div 
            id="section-1-beranda" 
            className={`w-full h-full overflow-hidden ${
              isSectionActive('beranda') ? 'flex flex-col' : 'hidden'
            }`}
          >
            <OverviewSection
              user={user}
              courses={courses}
              upcomingMentoring={mentoringSessions}
              onNavigate={navigateToTab}
              onGoToVideo={handleSelectCourseForVideo}
              onGoToQuiz={handleSelectCourseForQuiz}
            />
          </div>

          {/* SECTION 2: PROGRES BELAJAR */}
          <div 
            id="section-2-progres-belajar" 
            className={`w-full h-full overflow-hidden ${
              isSectionActive('progres-belajar') ? 'flex flex-col' : 'hidden'
            }`}
          >
            <ProgressAndResumeSection
              courses={courses}
              user={user}
              onSelectCourseToStudy={(courseId) => handleSelectCourseForVideo(courseId)}
              onSelectCourseMentoring={() => navigateToTab('sesi-mentoring')}
              onGoToVideoPlayer={(courseCode) => navigateToTab('video-pembelajaran')}
              onGoToQuiz={(subjectTitle) => handleSelectCourseForQuiz(subjectTitle)}
            />
          </div>

          {/* SECTION 3: MODUL PERKULIAHAN & BANK SOAL */}
          <div 
            id="section-3-modul-perkuliahan" 
            className={`w-full h-full overflow-hidden ${
              isSectionActive('modul-perkuliahan') ? 'flex flex-col' : 'hidden'
            }`}
          >
            <CourseDataTableManagement
              courses={courses}
              questions={questions}
              activeQuestionIndex={activeQuestionIndex}
              setActiveQuestionIndex={setActiveQuestionIndex}
              onSelectCourseForVideo={handleSelectCourseForVideo}
              onSelectCourseForQuiz={handleSelectCourseForQuiz}
            />
          </div>

          {/* SECTION 4: VIDEO PEMBELAJARAN */}
          <div 
            id="section-4-video-pembelajaran" 
            className={`w-full h-full overflow-hidden ${
              isSectionActive('video-pembelajaran') ? 'flex flex-col' : 'hidden'
            }`}
          >
            <VideoPlaylistSection
              playlist={playlist}
              onOpenQuizForVideo={(subject) => handleSelectCourseForQuiz(subject)}
            />
          </div>

          {/* SECTION 5: SESI MENTORING */}
          <div 
            id="section-5-sesi-mentoring" 
            className={`w-full h-full overflow-hidden ${
              isSectionActive('sesi-mentoring') ? 'flex flex-col' : 'hidden'
            }`}
          >
            <MentoringDashboardContainer
              sessions={mentoringSessions}
              onToggleEnrollment={handleToggleEnrollment}
            />
          </div>

          {/* SECTION 6: PROFIL MAHASISWA */}
          <div 
            id="section-6-profil-mahasiswa" 
            className={`w-full h-full overflow-hidden ${
              isSectionActive('profil-mahasiswa') ? 'flex flex-col' : 'hidden'
            }`}
          >
            <StudentProfileSection
              user={user}
            />
          </div>

        </main>

        {/* 4. Fixed Slim Status Bar (No page scrolling) */}
        <footer className="h-8 shrink-0 bg-white border-t border-slate-200 px-4 md:px-6 flex items-center justify-between text-[11px] text-slate-500 font-medium z-10">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
            <span>Fakultas Ekonomi dan Bisnis • Universitas Negeri Jakarta (UNJ)</span>
          </div>
          <div className="flex items-center gap-4">
            <span>T.A. 2026/2027 Ganjil</span>
            <span className="hidden sm:inline text-slate-400">|</span>
            <span className="hidden sm:inline text-teal-800 font-semibold">Aksel FEB SPA v2.5</span>
          </div>
        </footer>

      </div>

    </div>
  );
}
