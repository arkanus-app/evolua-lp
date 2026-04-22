import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FileText, Check, X, Smartphone, Zap, CloudUpload } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export const HowItWorks: React.FC = () => {
  const { t } = useLanguage();
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.4 }); 
  
  const [flash, setFlash] = useState(false);
  const [isFlashlightOn, setIsFlashlightOn] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  // Keep the first render deterministic so SSR and hydration match.
  const subjects = [
    t('hiw.subject.math'),
    t('hiw.subject.history'),
    t('hiw.subject.physics'),
    t('hiw.subject.biology'),
    t('hiw.subject.chem'),
  ];
  const correctAnswers = [1, 0, 2, 0, 1, 2]; // B, A, C, A, B, C
  const defaultAnswers = [1, 0, 3, 0, 2, 2];
  const defaultStudentId = 24018;

  const generateRandomAnswers = () => {
    return correctAnswers.map((ans) => {
      const isCorrect = Math.random() > 0.4;
      if (isCorrect) return ans;
      let wrongAns = Math.floor(Math.random() * 4);
      while (wrongAns === ans) {
        wrongAns = Math.floor(Math.random() * 4);
      }
      return wrongAns;
    });
  };

  const generateStudentId = () => Math.floor(10000 + Math.random() * 90000);
  const getRandomSubjectIndex = () => Math.floor(Math.random() * subjects.length);

  const [userAnswers, setUserAnswers] = useState(defaultAnswers);
  const [studentId, setStudentId] = useState(defaultStudentId);
  const [currentSubjectIndex, setCurrentSubjectIndex] = useState(0);

  const currentSubject = subjects[currentSubjectIndex] ?? subjects[0];

  const currentScore = userAnswers.filter((ans, i) => ans === correctAnswers[i]).length;

  // Base64 Camera Shutter Sound
  const shutterSound = "data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjI5LjEwMAAAAAAAAAAAAAAA//NExAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//NExAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//NExAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//NExAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//NExAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//NExAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//NExAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//NExAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//NExAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//NExAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//NExAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//NExAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//NExAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//NExAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//NExAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//NExAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//NExAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//NExAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//NExAqkAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//NExAqkAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//NExAqkAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//NExAqkAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//NExAqkAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//NExAqkAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq";

  const playShutterSound = () => {
    try {
      const audio = new Audio(shutterSound);
      audio.volume = 0.5;
      audio.play().catch(e => console.error("Audio play blocked", e));
    } catch (e) {
      console.error("Audio playback error", e);
    }
  };

  const triggerScan = useCallback((withSound = false) => {
    if (isUploading || showResults) return;
    
    setFlash(true);
    if (withSound) playShutterSound();
    setShowResults(true);

    setTimeout(() => setFlash(false), 150);
    setTimeout(() => setIsUploading(true), 1500);

    setTimeout(() => {
      setIsUploading(false);
      setShowResults(false);
      // Reset for next student
      setUserAnswers(generateRandomAnswers());
      setStudentId(generateStudentId());
      setCurrentSubjectIndex(getRandomSubjectIndex());
    }, 4000);
  }, [isUploading, showResults]);

  useEffect(() => {
    if (isInView && !isUploading && !showResults && !isHovering) {
       const timer = setTimeout(() => triggerScan(false), 4000);
       return () => clearTimeout(timer);
    }
  }, [isInView, isUploading, showResults, triggerScan, isHovering]);

  return (
    <section 
      ref={containerRef} 
      id="how-it-works" 
      className="py-16 md:py-24 bg-white relative overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
          <h2 className="text-sm font-black text-brand-yellowDark tracking-widest uppercase mb-3">{t('hiw.eyebrow')}</h2>
          <p className="text-4xl font-extrabold text-slate-900 tracking-tight">
            {t('hiw.title.1')} <br/>
            <span className="text-brand-yellowDark">{t('hiw.title.2')}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <div className="relative order-2 lg:order-1 h-[500px] md:h-[600px] w-full flex items-center justify-center perspective-800">
             <motion.div 
               animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
               transition={{ duration: 4, repeat: Infinity }}
               className="absolute inset-0 bg-gradient-to-b from-slate-50 to-blue-50/50 rounded-full blur-3xl transform scale-90" 
             />
             
             <motion.div 
               initial={{ rotateY: 15, rotateX: 5, opacity: 0 }}
               whileInView={{ rotateY: 0, rotateX: 0, opacity: 1 }}
               viewport={{ once: true }}
               transition={{ type: "spring", duration: 1.5 }}
               className="relative w-full max-w-[300px] md:max-w-[340px] h-[540px] md:h-[600px] bg-slate-900 rounded-[3rem] md:rounded-[3.5rem] border-[8px] md:border-[10px] border-slate-800 shadow-2xl z-10"
               style={{ transformStyle: 'preserve-3d' }}
             >
                <motion.div 
                   animate={{ 
                     opacity: isFlashlightOn ? (flash ? 1 : 0.7) : 0, 
                     scale: isFlashlightOn && flash ? 1.2 : 1 
                   }}
                   transition={{ duration: flash ? 0.1 : 0.3 }}
                   className="absolute -top-20 left-1/4 right-1/4 h-80 bg-yellow-300 blur-[80px] -z-10 pointer-events-none mix-blend-screen"
                />

                <div className="absolute inset-0 bg-slate-800 flex flex-col overflow-hidden rounded-[2.5rem] md:rounded-[2.8rem]">
                  
                  <div className="flex-1 relative overflow-hidden bg-slate-200 flex items-center justify-center z-0">
                    {flash && <div className="absolute inset-0 bg-white z-50 animate-out fade-out duration-200 pointer-events-none" />}

                    <AnimatePresence mode="wait">
                      {!isUploading ? (
                        <motion.div
                          key="paper"
                          initial={{ y: 300, opacity: 0 }}
                          animate={{ y: 0, scale: 1, opacity: 1 }}
                          exit={{ 
                            y: -400, 
                            scale: 0.6, 
                            opacity: 0,
                            rotateX: 20,
                            transition: { duration: 0.6, ease: [0.32, 0, 0.67, 0] }
                          }}
                          transition={{ type: "spring", stiffness: 200, damping: 25 }}
                          className="bg-white w-[240px] md:w-[280px] h-[380px] md:h-[420px] shadow-2xl rounded-lg p-4 md:p-6 relative flex flex-col items-center origin-center"
                        >
                          <div className="w-full border-b-2 border-slate-100 pb-2 mb-4 flex justify-between items-center">
                              <div className="flex flex-col">
                                <div className="text-xs font-bold text-slate-800 uppercase tracking-tight">{currentSubject}</div>
                                <div className="text-[10px] text-slate-400 font-mono">{t('hiw.studentId')}: {studentId}</div>
                              </div>
                              <div className="h-8 w-8 bg-slate-100 rounded-full" />
                          </div>

                          <div className="grid grid-cols-1 gap-3 w-full">
                            {[...Array(6)].map((_, row) => (
                              <div key={row} className="flex items-center gap-2 md:gap-3">
                                <span className="text-xs font-bold text-slate-300 w-4">{row + 1}</span>
                                <div className="flex gap-2 flex-1 justify-between">
                                  {['A', 'B', 'C', 'D'].map((opt, col) => {
                                    const isSelected = userAnswers[row] === col;
                                    const isCorrect = correctAnswers[row] === col;
                                    
                                    return (
                                      <div key={col} className="relative">
                                        <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full border-2 transition-colors duration-300 ${isSelected ? 'bg-slate-800 border-slate-800' : 'border-slate-200'}`} />
                                        
                                        {showResults && isSelected && (
                                          <motion.div 
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ delay: row * 0.05, type: 'spring', stiffness: 300 }}
                                            className={`absolute inset-0 rounded-full flex items-center justify-center z-10 shadow-lg border-2 border-white ${isCorrect ? 'bg-green-500' : 'bg-red-500'}`}
                                          >
                                              {isCorrect ? (
                                                <Check className="w-4 h-4 md:w-5 md:h-5 text-white" strokeWidth={4} />
                                              ) : (
                                                <X className="w-4 h-4 md:w-5 md:h-5 text-white" strokeWidth={4} />
                                              )}
                                          </motion.div>
                                        )}
                                      </div>
                                    )
                                  })}
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          {showResults && (
                            <motion.div 
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="absolute bottom-4 right-4 bg-slate-900 text-white px-3 py-1 rounded-lg font-bold text-sm shadow-lg"
                            >
                                {t('hiw.score')}: {currentScore}/6
                            </motion.div>
                          )}
                        </motion.div>
                      ) : (
                        <motion.div 
                          key="upload-icon"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          className="flex flex-col items-center justify-center text-slate-400"
                        >
                           <CloudUpload className="w-16 h-16 text-brand-yellow mb-2" />
                           <span className="text-xs font-bold uppercase tracking-widest">{t('hiw.syncing')}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="absolute inset-0 pointer-events-none z-20">
                       <div className="absolute top-8 left-8 w-10 h-10 border-t-4 border-l-4 border-white/80 rounded-tl-3xl" />
                       <div className="absolute top-8 right-8 w-10 h-10 border-t-4 border-r-4 border-white/80 rounded-tr-3xl" />
                       <div className="absolute bottom-8 left-8 w-10 h-10 border-b-4 border-l-4 border-white/80 rounded-bl-3xl" />
                       <div className="absolute bottom-8 right-8 w-10 h-10 border-b-4 border-r-4 border-white/80 rounded-br-3xl" />
                       
                       {!isUploading && !showResults && (
                         <motion.div
                            initial={{ top: "10%" }}
                            animate={{ top: ["10%", "80%", "10%"] }}
                            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                            className="absolute left-6 right-6 h-1 bg-brand-yellow shadow-[0_0_30px_rgba(250,204,21,0.8)]"
                         />
                       )}
                    </div>
                  </div>

                  <div className="h-20 md:h-24 bg-black/90 backdrop-blur-md flex items-center justify-center gap-6 md:gap-8 relative z-30">
                     <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-800 border border-slate-700" />
                     <button 
                        onClick={() => triggerScan(true)}
                        disabled={isUploading || showResults}
                        className="w-14 h-14 md:w-16 md:h-16 rounded-full border-4 border-white flex items-center justify-center transition-all active:scale-90 cursor-pointer group hover:border-brand-yellow disabled:opacity-50 disabled:cursor-default"
                     >
                        <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full transition-colors ${isUploading ? 'bg-slate-500' : 'bg-white group-active:bg-slate-200'}`} />
                     </button>
                     <button 
                       onClick={() => setIsFlashlightOn(!isFlashlightOn)}
                       className={`w-10 h-10 md:w-12 md:h-12 rounded-full border transition-all duration-300 flex items-center justify-center active:scale-95 ${isFlashlightOn ? 'bg-yellow-500/20 border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.5)]' : 'bg-slate-800 border-slate-700 hover:bg-slate-700'}`}
                     >
                        <Zap className={`w-5 h-5 transition-colors duration-300 ${isFlashlightOn ? 'text-yellow-400 fill-yellow-400' : 'text-slate-500'}`} />
                     </button>
                  </div>
                </div>
             </motion.div>
          </div>

          <div className="order-1 lg:order-2 space-y-8 md:space-y-10">
            {[
              {
                icon: <Smartphone className="w-6 h-6 text-white" />,
                color: "bg-blue-500",
                title: t('hiw.step1.title'),
                desc: t('hiw.step1.desc')
              },
              {
                icon: <Zap className="w-6 h-6 text-white" />,
                color: "bg-brand-yellowDark",
                title: t('hiw.step2.title'),
                desc: t('hiw.step2.desc')
              },
              {
                icon: <FileText className="w-6 h-6 text-white" />,
                color: "bg-green-500",
                title: t('hiw.step3.title'),
                desc: t('hiw.step3.desc')
              }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2, duration: 0.5 }}
                viewport={{ once: true }}
                className="flex gap-6 group cursor-default"
              >
                <div className={`flex-shrink-0 w-14 h-14 md:w-16 md:h-16 ${step.color} rounded-[1.2rem] border-b-4 border-black/10 flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:-translate-y-1`}>
                  {step.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-slate-600 font-medium leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
