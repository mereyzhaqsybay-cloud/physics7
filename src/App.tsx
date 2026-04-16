/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  PenTool, 
  ClipboardCheck, 
  Menu, 
  X, 
  ChevronRight, 
  Youtube,
  GraduationCap,
  Table as TableIcon,
  Palette
} from 'lucide-react';
import { PHYSICS_DATA, Chapter, Topic } from './data';

// Components
import TheorySection from './components/TheorySection';
import PracticeSection from './components/PracticeSection';
import QuizSection from './components/QuizSection';
import VideoSection from './components/VideoSection';
import TablesSection from './components/TablesSection';

type TabType = 'theory' | 'video' | 'practice' | 'quiz' | 'tables';
type ThemeType = 'purple' | 'ocean' | 'emerald' | 'sunset' | 'midnight';

export default function App() {
  const [selectedChapterId, setSelectedChapterId] = useState<string>(PHYSICS_DATA[0].id);
  const [selectedTopicId, setSelectedTopicId] = useState<string>(PHYSICS_DATA[0].topics[0].id);
  const [activeTab, setActiveTab] = useState<TabType>('theory');
  const [showSidebar, setShowSidebar] = useState(true);
  const [theme, setTheme] = useState<ThemeType>('purple');
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const selectedChapter = useMemo(() => 
    PHYSICS_DATA.find(ch => ch.id === selectedChapterId) || PHYSICS_DATA[0]
  , [selectedChapterId]);

  const selectedTopic = useMemo(() => 
    selectedChapter.topics.find(t => t.id === selectedTopicId) || selectedChapter.topics[0]
  , [selectedChapter, selectedTopicId]);

  const handleTopicSelect = (chapter: Chapter, topic: Topic) => {
    setSelectedChapterId(chapter.id);
    setSelectedTopicId(topic.id);
    setActiveTab('theory');
    if (window.innerWidth < 1024) setShowSidebar(false);
  };

  const themes: { id: ThemeType; label: string; color: string }[] = [
    { id: 'purple', label: 'Күлгін', color: 'bg-[#6d28d9]' },
    { id: 'ocean', label: 'Мұхит', color: 'bg-[#0369a1]' },
    { id: 'emerald', label: 'Зүбаржат', color: 'bg-[#059669]' },
    { id: 'sunset', label: 'Күн батуы', color: 'bg-[#f43f5e]' },
    { id: 'midnight', label: 'Түн', color: 'bg-[#1e293b]' },
  ];

  return (
    <div className="flex h-screen bg-bg-app overflow-hidden font-sans transition-colors duration-500">
      {/* Mobile Menu Toggle */}
      {!showSidebar && (
        <button 
          onClick={() => setShowSidebar(true)}
          className="lg:hidden fixed bottom-6 right-6 z-50 p-4 bg-primary text-white rounded-full shadow-2xl scale-110 active:scale-95 transition-transform"
        >
          <Menu size={24} />
        </button>
      )}

      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: showSidebar ? '300px' : '0px', opacity: showSidebar ? 1 : 0 }}
        className="bg-primary overflow-hidden flex flex-col relative text-white transition-colors duration-500"
      >
        <div className="p-8 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
              <GraduationCap size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-black tracking-tighter">PHYSICS7</h1>
          </div>
          <button onClick={() => setShowSidebar(false)} className="lg:hidden p-2 hover:bg-white/10 rounded-lg">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-4">
          <button
            onClick={() => setActiveTab('tables')}
            className={`w-full flex items-center gap-3 px-5 py-4 rounded-[2rem] transition-all duration-300 ${
              activeTab === 'tables' 
                ? 'bg-white text-primary font-black shadow-2xl' 
                : 'hover:bg-white/10 text-white/80 font-bold'
            }`}
          >
            <TableIcon size={20} />
            <span>Пайдалы кестелер</span>
          </button>

          <div className="h-px bg-white/10 mx-4"></div>

          {PHYSICS_DATA.map((chapter) => (
            <div key={chapter.id} className="space-y-3">
              <h2 className="px-5 text-[10px] font-black text-white/40 uppercase tracking-[3px] mt-4">
                {chapter.title}
              </h2>
              <div className="space-y-1.5">
                {chapter.topics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => handleTopicSelect(chapter, topic)}
                    className={`w-full text-left px-5 py-4 rounded-[1.5rem] text-xs transition-all flex flex-col gap-1 border border-transparent ${
                      selectedTopicId === topic.id && activeTab !== 'tables'
                        ? 'bg-white text-primary font-black shadow-xl' 
                        : 'text-white/70 hover:bg-white/10 hover:text-white font-medium'
                    }`}
                  >
                    <span className="truncate">{topic.title}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-6 flex flex-col gap-4 border-t border-white/10">
           <div className="flex items-center justify-between px-2">
             <span className="text-[10px] text-white/40 uppercase tracking-widest font-black">Дизайн</span>
             <button 
               onClick={() => setShowThemeMenu(!showThemeMenu)}
               className="p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-all"
             >
               <Palette size={16} />
             </button>
           </div>
           
           <AnimatePresence>
             {showThemeMenu && (
               <motion.div 
                 initial={{ height: 0, opacity: 0 }}
                 animate={{ height: 'auto', opacity: 1 }}
                 exit={{ height: 0, opacity: 0 }}
                 className="flex gap-2 justify-center py-2"
               >
                 {themes.map(t => (
                   <button
                     key={t.id}
                     onClick={() => setTheme(t.id)}
                     className={`w-8 h-8 rounded-full border-2 ${theme === t.id ? 'border-white' : 'border-transparent'} ${t.color} shadow-lg transition-all hover:scale-110`}
                     title={t.label}
                   />
                 ))}
               </motion.div>
             )}
           </AnimatePresence>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-bg-app transition-colors duration-500">
        {/* Header */}
        <header className="px-10 pt-10 pb-6 flex flex-col xl:flex-row xl:items-end justify-between gap-8">
          <div className="max-w-3xl">
            {activeTab === 'tables' ? (
              <>
                <div className="inline-block px-4 py-2 bg-amber-100/50 rounded-2xl text-[10px] font-black text-amber-600 mb-4 uppercase tracking-[3px]">Анықтамалық материал</div>
                <h1 className="text-5xl font-black text-primary tracking-tight">Физикалық кестелер</h1>
              </>
            ) : (
              <>
                <div className="inline-block px-4 py-2 bg-accent/50 rounded-2xl text-[10px] font-black text-primary mb-4 uppercase tracking-[3px]">
                  Тарау {PHYSICS_DATA.findIndex(c => c.id === selectedChapterId) + 1}: {selectedChapter.title}
                </div>
                <h1 className="text-5xl font-black text-primary tracking-tight leading-[1.05]">
                  {selectedTopic.title}
                </h1>
              </>
            )}
          </div>
          
          <div className="flex bg-primary/10 p-2 rounded-[2rem] shadow-inner border border-primary/10 shrink-0">
            <TabButton active={activeTab === 'theory'} onClick={() => setActiveTab('theory')} icon={<BookOpen size={18} />} label="Теория" />
            <TabButton active={activeTab === 'video'} onClick={() => setActiveTab('video')} icon={<Youtube size={18} />} label="Видео" />
            <TabButton active={activeTab === 'practice'} onClick={() => setActiveTab('practice')} icon={<PenTool size={18} />} label="Есептер" />
            <TabButton active={activeTab === 'quiz'} onClick={() => setActiveTab('quiz')} icon={<ClipboardCheck size={18} />} label="Тест" />
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-10 pb-16">
          <div className="max-w-5xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedTopicId}-${activeTab}-${theme}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {activeTab === 'theory' && <TheorySection topic={selectedTopic} />}
                {activeTab === 'video' && <VideoSection topic={selectedTopic} />}
                {activeTab === 'practice' && <PracticeSection topic={selectedTopic} />}
                {activeTab === 'quiz' && <QuizSection key={selectedTopicId} topic={selectedTopic} />}
                {activeTab === 'tables' && <TablesSection />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`nav-pill ${
        active 
          ? 'bg-white text-primary shadow-xl scale-105' 
          : 'text-primary/60 hover:text-primary hover:bg-white/60'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
