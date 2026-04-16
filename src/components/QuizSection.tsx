
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, RotateCcw, Trophy, ArrowRight, ClipboardCheck } from 'lucide-react';
import { Topic } from '../data';

interface QuizSectionProps {
  topic: Topic;
}

export default function QuizSection({ topic }: QuizSectionProps) {
  const [currentStep, setCurrentStep] = useState<'start' | 'playing' | 'result'>('start');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const questions = topic.quiz;

  const handleStart = () => {
    setCurrentStep('playing');
    setCurrentIndex(0);
    setScore(0);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  const handleOptionClick = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    if (index === questions[currentIndex].correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(i => i + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setCurrentStep('result');
    }
  };

  if (currentStep === 'start') {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card flex flex-col items-center justify-center py-20 text-center space-y-8"
      >
        <div className="w-24 h-24 bg-primary/10 text-primary rounded-[2.5rem] flex items-center justify-center shadow-inner relative overflow-hidden group">
          <Trophy size={48} className="relative z-10" />
          <motion.div 
            animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute inset-0 bg-primary/5 rounded-full"
          />
        </div>
        <div className="space-y-3">
          <h2 className="text-3xl font-black text-primary uppercase tracking-widest">Білімді тексеру</h2>
          <p className="text-slate-500 max-w-sm mx-auto font-bold text-lg">
            Осы тақырып бойынша {questions.length} сұрақтан тұратын тестті тапсырып көріңіз.
          </p>
        </div>
        <button
          onClick={handleStart}
          className="btn-primary"
        >
          Тестті бастау
        </button>
      </motion.div>
    );
  }

  if (currentStep === 'result') {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card flex flex-col items-center justify-center py-20 text-center space-y-10"
      >
        <div className="relative">
          <svg className="w-40 h-40 transform -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="74"
              fill="transparent"
              stroke="currentColor"
              className="text-primary/10"
              strokeWidth="12"
            />
            <motion.circle
              cx="80"
              cy="80"
              r="74"
              fill="transparent"
              stroke="currentColor"
              className={percentage >= 80 ? "text-emerald-500" : percentage >= 50 ? "text-primary" : "text-rose-500"}
              strokeWidth="12"
              strokeDasharray={465}
              initial={{ strokeDashoffset: 465 }}
              animate={{ strokeDashoffset: 465 - (465 * percentage) / 100 }}
              transition={{ duration: 1.5, ease: "circOut" }}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-black text-primary leading-none">{percentage}%</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-primary/40 mt-1">Нәтиже</span>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-4xl font-black text-primary tracking-tight">
            {percentage >= 80 ? 'Керемет нәтиже!' : percentage >= 50 ? 'Жақсы нәтиже!' : 'Көбірек оқу керек!'}
          </h2>
          <p className="text-slate-500 font-bold text-lg">
            Сіз {questions.length} сұрақтың {score}-ына дұрыс жауап бердіңіз.
          </p>
        </div>

        <button
          onClick={handleStart}
          className="flex items-center gap-3 bg-primary text-white px-10 py-5 rounded-3xl font-black hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-primary/30 uppercase tracking-widest text-sm"
        >
          <RotateCcw size={20} />
          <span>Қайта тапсыру</span>
        </button>
      </motion.div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
    >
      <h2 className="card-title select-none">
        <ClipboardCheck size={26} className="text-primary" />
        <span>Тақырып бойынша тест</span>
      </h2>

      <div className="mt-10 space-y-10">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="px-4 py-2 bg-primary/10 text-primary rounded-2xl text-[11px] font-black uppercase tracking-[2px]">
                Сұрақ {currentIndex + 1}
              </span>
              <div className="w-1 h-1 rounded-full bg-slate-200"></div>
              <span className="text-slate-400 text-xs font-black uppercase tracking-widest">Барлығы: {questions.length}</span>
            </div>
          </div>
          
          <p className="font-black text-slate-800 text-2xl leading-[1.3] text-balance">
            {currentQuestion.question}
          </p>

          <div className="grid gap-4">
            {currentQuestion.options.map((option, index) => {
              let state = 'default';
              if (isAnswered) {
                if (index === currentQuestion.correctAnswer) state = 'correct';
                else if (index === selectedOption) state = 'incorrect';
                else state = 'muted';
              } else if (index === selectedOption) {
                state = 'selected';
              }

              return (
                <button
                  key={index}
                  onClick={() => handleOptionClick(index)}
                  disabled={isAnswered}
                  className={`flex items-center gap-6 text-left p-6 rounded-[2rem] transition-all duration-300 border-2 ${
                    state === 'default' ? 'border-slate-100 bg-white hover:border-primary/30 hover:shadow-xl hover:translate-x-2' :
                    state === 'selected' ? 'border-primary bg-primary/5 ring-8 ring-primary/5 translate-x-3' :
                    state === 'correct' ? 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-8 ring-emerald-50 translate-x-3' :
                    state === 'incorrect' ? 'border-rose-500 bg-rose-50 text-rose-900 ring-8 ring-rose-50' :
                    'opacity-30 border-slate-50 scale-95'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-[1.25rem] flex items-center justify-center font-black text-lg border-2 shrink-0 transition-colors ${
                    state === 'correct' ? 'bg-emerald-500 border-emerald-500 text-white' :
                    state === 'incorrect' ? 'bg-rose-500 border-rose-500 text-white' :
                    state === 'selected' ? 'bg-primary border-primary text-white' :
                    'bg-white border-slate-100 group-hover:border-primary/50 text-slate-400'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="font-black text-lg tracking-tight leading-tight">{option}</span>
                  
                  <div className="ml-auto">
                    {state === 'correct' && <CheckCircle2 className="text-emerald-500" size={28} />}
                    {state === 'incorrect' && <XCircle className="text-rose-500" size={28} />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="pt-10 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="w-full sm:max-w-xs flex items-center gap-5">
            <div className="flex-1 bg-slate-100 h-3 rounded-full overflow-hidden shadow-inner">
               <motion.div 
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                transition={{ type: "spring", stiffness: 50 }}
              />
            </div>
            <span className="text-[11px] font-black text-primary uppercase tracking-widest">{Math.round(((currentIndex + 1) / questions.length) * 100)}%</span>
          </div>

          <AnimatePresence>
            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <button
                  onClick={handleNext}
                  className="flex items-center gap-3 bg-primary text-white px-10 py-5 rounded-[1.75rem] font-black hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-primary/20 uppercase tracking-widest text-sm"
                >
                  <span>{currentIndex === questions.length - 1 ? 'Нәтиже' : 'Келесі'}</span>
                  <ArrowRight size={20} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}
