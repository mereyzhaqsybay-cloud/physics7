import { motion } from 'motion/react';
import { Youtube, ExternalLink } from 'lucide-react';
import { Topic } from '../data';

interface VideoSectionProps {
  topic: Topic;
}

export default function VideoSection({ topic }: VideoSectionProps) {
  if (!topic.videoUrl) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card text-center py-32 flex flex-col items-center"
      >
        <div className="w-24 h-24 rounded-[2rem] bg-accent/20 flex items-center justify-center mb-8 shadow-inner border border-primary/5">
          <Youtube size={48} className="text-primary/20" />
        </div>
        <h3 className="text-2xl font-black text-primary/30 uppercase tracking-[4px] max-w-sm leading-relaxed">Бұл тақырыпқа әзірге бейне сабақ жоқ</h3>
      </motion.div>
    );
  }

  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="card">
        <h2 className="card-title select-none">
          <Youtube size={26} className="text-rose-500" />
          <span>Бейне сабақ: Мектеп OnLine</span>
        </h2>
        
        <div className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl bg-black ring-12 ring-primary/5">
          <iframe
            src={topic.videoUrl}
            title={`${topic.title} - бейне сабақ`}
            className="absolute top-0 left-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div className="mt-12 p-10 bg-accent/20 border-2 border-primary/5 rounded-[3rem] flex flex-col lg:flex-row items-center justify-between gap-8 shadow-inner ring-1 ring-primary/5">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-[2rem] bg-rose-500 flex items-center justify-center shadow-2xl shadow-rose-500/30">
              <Youtube size={40} className="text-white" />
            </div>
            <div className="text-center lg:text-left">
              <p className="font-black text-2xl text-primary tracking-tight">Мектеп OnLine Физика</p>
              <p className="text-base text-primary/60 font-bold tracking-wide italic">YouTube арнасындағы толық сабақтар</p>
            </div>
          </div>
          <a 
            href={topic.videoUrl.replace('embed/', 'watch?v=')} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full lg:w-auto flex items-center justify-center gap-4 px-10 py-5 bg-white border-2 border-primary/10 rounded-[1.75rem] text-sm font-black text-primary hover:bg-primary hover:text-white hover:border-primary transition-all shadow-xl shadow-primary/10 uppercase tracking-widest"
          >
            <span>YouTube-тен көру</span>
            <ExternalLink size={20} />
          </a>
        </div>
      </div>
    </motion.section>
  );
}
