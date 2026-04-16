
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, EyeOff, PenTool, Lightbulb } from 'lucide-react';
import { Topic } from '../data';

interface PracticeSectionProps {
  topic: Topic;
}

export default function PracticeSection({ topic }: PracticeSectionProps) {
  const [showSolutions, setShowSolutions] = useState<Record<string, boolean>>({});

  const toggleSolution = (id: string) => {
    setShowSolutions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
    >
      <h2 className="card-title select-none">
        <PenTool size={24} className="text-primary" />
        <span>Есептер шығару</span>
      </h2>

      <div className="space-y-8 mt-10">
        {topic.practice.map((problem, index) => (
          <div key={problem.id} className="relative pl-8 group">
             {/* Timeline-like line */}
            <div className="absolute left-[15px] top-8 bottom-0 w-0.5 bg-primary/10 group-last:hidden"></div>
            
            <div className="flex gap-6">
              <span className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-black text-sm shrink-0 select-none shadow-inner border border-primary/5 transition-transform group-hover:scale-110">
                {index + 1}
              </span>
              <div className="flex-1">
                <p className="text-slate-800 font-black mb-6 leading-relaxed text-xl tracking-tight">
                  {problem.task}
                </p>

                <button
                  onClick={() => toggleSolution(problem.id)}
                  className="flex items-center gap-3 bg-white border-2 border-primary/20 text-primary px-6 py-3 rounded-2xl font-black text-sm hover:border-primary hover:bg-primary/5 transition-all group/btn shadow-sm"
                >
                  {showSolutions[problem.id] ? <EyeOff size={18} /> : <Eye size={18} />}
                  <span>{showSolutions[problem.id] ? 'Шешімін жасыру' : 'Шешімін көрсету'}</span>
                </button>

                <AnimatePresence>
                  {showSolutions[problem.id] && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-8 bg-accent/20 border-2 border-primary/10 rounded-[2.5rem] text-lg leading-relaxed text-slate-700 italic shadow-inner ring-1 ring-primary/5 flex gap-4">
                        <div className="shrink-0 pt-1">
                          <Lightbulb className="text-primary" size={20} />
                        </div>
                        <div>
                          <strong className="block mb-3 text-primary not-italic uppercase tracking-[2px] font-black text-xs">Толық шешімі:</strong>
                          <div className="font-bold text-slate-800">{problem.solution}</div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
