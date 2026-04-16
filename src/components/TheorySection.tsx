import { motion } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { BookOpen, GraduationCap } from 'lucide-react';
import { Topic } from '../data';

interface TheorySectionProps {
  topic: Topic;
}

export default function TheorySection({ topic }: TheorySectionProps) {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
    >
      <h2 className="card-title select-none">
        <BookOpen size={24} className="text-primary" />
        <span>Теория және Анықтамалар</span>
      </h2>
      
      <div className="theory-text space-y-6 text-slate-700 leading-relaxed text-lg">
        <ReactMarkdown
          components={{
            h3: ({ children }) => <h3 className="text-2xl font-black text-primary mt-8 mb-4 first:mt-0 tracking-tight uppercase">{children}</h3>,
            p: ({ children }) => <p className="mb-4">{children}</p>,
            ul: ({ children }) => <ul className="list-disc ml-8 mb-6 space-y-4 text-slate-600">{children}</ul>,
            li: ({ children }) => <li className="marker:text-primary">{children}</li>,
            strong: ({ children }) => <strong className="font-black text-primary underline decoration-primary/20 underline-offset-4">{children}</strong>,
            em: ({ children }) => <em className="italic text-primary/80">{children}</em>
          }}
        >
          {topic.theory}
        </ReactMarkdown>
      </div>

      <div className="mt-12 p-8 bg-accent/20 border border-primary/10 rounded-[2.5rem] flex items-start gap-6 shadow-inner ring-1 ring-primary/5">
        <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-primary shadow-xl shrink-0">
          <GraduationCap size={28} />
        </div>
        <div>
          <h3 className="text-primary font-black mb-2 text-xl tracking-tight">Назар аударыңыз!</h3>
          <p className="text-base text-primary/80 leading-relaxed font-bold italic">
            Физикалық заңдылықтарды түсіну үшін тек теорияны оқып қана қоймай, оны күнделікті өмірмен байланыстыра білу маңызды. Тәжірибе жасап көріңіз!
          </p>
        </div>
      </div>
    </motion.section>
  );
}
