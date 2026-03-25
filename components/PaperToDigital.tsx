import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Zap, BarChart2, PieChart, Download, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export const PaperToDigital: React.FC = () => {
  const { t } = useLanguage();
  const [reportStatus, setReportStatus] = useState<'generating' | 'ready'>('generating');

  useEffect(() => {
    const interval = setInterval(() => {
      setReportStatus('generating');
      setTimeout(() => setReportStatus('ready'), 2500);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 md:py-32 bg-slate-900 relative overflow-hidden">
      {/* Background glow - Static to save GPU */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-yellow/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-brand-yellow font-bold tracking-widest uppercase text-sm mb-3">{t('p2d.eyebrow')}</h2>
          <h3 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
            {t('p2d.title.1')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-orange-400">{t('p2d.title.2')}</span>
          </h3>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            {t('p2d.subtitle')}
          </p>
        </div>

        {/* Animation Stage - Compacted for better responsiveness */}
        <div className="flex justify-center w-full overflow-visible -my-24 md:my-0">
            {/* Scaled wrapper: 900px * 0.4 = 360px (Fits on mobile) */}
            <div className="transform scale-[0.4] sm:scale-75 md:scale-90 lg:scale-100 origin-center">
              <div className="relative h-[600px] w-[900px] flex items-center justify-center">
                
                {/* CABLES & CONNECTIONS (SVG) */}
                {/* Container: 900x600. Center: 450, 300. 
                    Left Stack: w-200. Right Outputs: Starts at ~600.
                */}
                <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-visible">
                   {/* Main Horizontal Line (Left to Center) */}
                   <line x1="120" y1="300" x2="450" y2="300" stroke="#1e293b" strokeWidth="4" />
                   {/* Pulse Left -> Center */}
                   <motion.path 
                     d="M 120 300 L 450 300"
                     stroke="url(#grad1)" 
                     strokeWidth="4"
                     fill="none"
                     strokeDasharray="10 10"
                     initial={{ strokeDashoffset: 200 }}
                     animate={{ strokeDashoffset: 0 }}
                     transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                   />

                   {/* Output Branch Top (Center -> Top Right Dashboard) */}
                   <path d="M 450 300 C 525 300, 525 150, 600 150" stroke="#1e293b" strokeWidth="4" fill="none" />
                   <motion.path 
                     d="M 450 300 C 525 300, 525 150, 600 150"
                     stroke="#facc15" 
                     strokeWidth="2"
                     fill="none"
                     strokeDasharray="20 300"
                     strokeOpacity="0.5"
                     animate={{ strokeDashoffset: [320, 0] }}
                     transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                   />

                   {/* Output Branch Bottom (Center -> Bottom Right Analytics) */}
                   <path d="M 450 300 C 525 300, 525 450, 600 450" stroke="#1e293b" strokeWidth="4" fill="none" />
                   <motion.path 
                     d="M 450 300 C 525 300, 525 450, 600 450"
                     stroke="#facc15" 
                     strokeWidth="2"
                     fill="none"
                     strokeDasharray="20 300"
                     strokeOpacity="0.5"
                     animate={{ strokeDashoffset: [320, 0] }}
                     transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.75 }}
                   />

                   <defs>
                     <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                       <stop offset="0%" stopColor="transparent" />
                       <stop offset="50%" stopColor="#facc15" />
                       <stop offset="100%" stopColor="transparent" />
                     </linearGradient>
                   </defs>
                </svg>

                {/* LEFT: Physical Stack on a "Desk" */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-[200px] flex flex-col items-center">
                   {/* The Desk Surface */}
                   <div className="absolute -bottom-12 left-0 right-0 h-4 bg-slate-800 rounded-full blur-sm opacity-50"></div>
                   
                   <div className="relative w-32 h-40">
                      {/* The Static Base Stack */}
                      {[...Array(5)].map((_, i) => (
                        <div 
                          key={i}
                          className="absolute w-32 h-40 bg-white rounded-lg border border-slate-200 shadow-sm"
                          style={{ 
                            bottom: i * 2, 
                            left: i % 2 === 0 ? 0 : 2,
                            transform: `rotate(${i % 2 === 0 ? -1 : 1}deg)`,
                            zIndex: i
                          }}
                        >
                           <div className="p-4 space-y-3 opacity-20">
                              <div className="h-2 bg-black w-1/2 rounded"></div>
                              <div className="h-2 bg-black w-full rounded"></div>
                              <div className="h-2 bg-black w-full rounded"></div>
                              <div className="h-2 bg-black w-3/4 rounded"></div>
                           </div>
                        </div>
                      ))}

                      {/* The Flying Papers */}
                      {[0, 1].map((i) => (
                        <motion.div
                          key={`flyer-${i}`}
                          className="absolute w-32 h-40 bg-white rounded-lg border border-slate-200 shadow-xl flex items-center justify-center z-20 will-change-transform"
                          initial={{ x: 0, y: -16, rotate: 0, scale: 1, opacity: 1 }}
                          animate={{
                            x: [0, 120, 240, 360], // Adjusted for closer center
                            y: [-16, -80, -80, 0],
                            rotate: [0, 10, -10, 45],
                            scale: [1, 1, 0.8, 0.1],
                            opacity: [1, 1, 1, 0]
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            delay: i * 1.25,
                            ease: "easeInOut"
                          }}
                        >
                          <FileText className="w-10 h-10 text-slate-300" />
                        </motion.div>
                      ))}
                   </div>
                   <div className="mt-8 text-center font-bold text-slate-500 text-sm tracking-widest uppercase">{t('p2d.rawInput')}</div>
                </div>

                {/* CENTER: The Processor */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center">
                   <div className="w-32 h-32 bg-slate-800 rounded-3xl border-4 border-slate-700 shadow-[0_0_50px_rgba(0,0,0,0.5)] flex items-center justify-center relative overflow-hidden">
                      <motion.div 
                        animate={{ opacity: [0.2, 0.6, 0.2] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-brand-yellow mix-blend-overlay"
                      />
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-2 border-2 border-dashed border-brand-yellow/50 rounded-2xl will-change-transform"
                      />
                      <Zap className="w-12 h-12 text-brand-yellow relative z-10" fill="currentColor" />
                   </div>
                   <div className="mt-6 inline-flex items-center gap-2 px-3 py-1 bg-brand-yellow/10 text-brand-yellow rounded-full text-xs font-bold uppercase">
                     <span className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse"></span>
                     {t('p2d.processing')}
                   </div>
                </div>

                {/* RIGHT SIDE: Split Outputs */}
                <div className="absolute right-0 top-0 bottom-0 w-[300px] flex flex-col justify-between py-10 z-10">
                   
                   {/* TOP OUTPUT: Structured Data */}
                   <div className="relative">
                      <div className="relative w-full bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 overflow-hidden shadow-[0_0_40px_-10px_rgba(250,204,21,0.15)] ring-1 ring-white/10 h-[220px]">
                          <div className="h-10 bg-slate-950/50 border-b border-slate-800 flex items-center px-4 justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-brand-yellow animate-pulse"></div>
                                <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">LIVE_FEED</span>
                            </div>
                          </div>
                          <div className="p-4 space-y-2">
                            {[0, 1, 2].map((i) => (
                              <motion.div 
                                  key={i}
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={{ opacity: [0, 1, 1, 0], x: [20, 0, 0, -10] }} 
                                  transition={{ duration: 3.5, delay: i * 1.2, repeat: Infinity, repeatDelay: 0.1 }}
                                  className="flex items-center gap-3 p-2 rounded-lg bg-white/5 border border-white/5"
                              >
                                  <div className="w-6 h-6 rounded bg-slate-700 flex items-center justify-center text-[8px] text-slate-400 font-bold">#{104 + i}</div>
                                  <div className="flex-1 h-1 bg-slate-700 rounded-full overflow-hidden">
                                    <motion.div 
                                      initial={{ width: 0 }}
                                      animate={{ width: `${92 - i * 4}%` }}
                                      transition={{ duration: 0.8, delay: i * 1.2 + 0.2 }}
                                      className="h-full bg-gradient-to-r from-brand-yellow to-orange-500"
                                    />
                                  </div>
                                  <span className="text-[9px] font-mono text-green-400">{92 - i * 4}%</span>
                              </motion.div>
                            ))}
                          </div>
                      </div>
                      <div className="mt-2 text-center font-bold text-slate-500 text-xs tracking-widest uppercase">{t('p2d.structuredData')}</div>
                   </div>

                   {/* BOTTOM OUTPUT: Analytics & Reports */}
                   <div className="relative">
                       <div className="relative w-full bg-slate-800 rounded-2xl border border-slate-600 shadow-xl p-4 h-[220px] flex flex-col justify-between">
                           <div className="flex justify-between items-center mb-2">
                              <span className="text-xs font-bold text-slate-300 flex items-center gap-2">
                                 <BarChart2 className="w-3 h-3 text-purple-400" /> {t('p2d.insights')}
                              </span>
                              <PieChart className="w-4 h-4 text-slate-500" />
                           </div>
                           
                           <div className="flex items-end justify-between gap-2 h-24 mb-2 px-2">
                              {[40, 70, 50, 90, 65, 85].map((h, i) => (
                                 <motion.div 
                                   key={i}
                                   initial={{ height: 0 }}
                                   animate={{ height: `${h}%` }}
                                   transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", delay: i * 0.1 }}
                                   className="w-1/6 bg-purple-500/50 rounded-t-sm border-t border-purple-400"
                                 />
                              ))}
                           </div>

                           <AnimatePresence mode="wait">
                              {reportStatus === 'generating' ? (
                                <motion.div 
                                  key="gen"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  className="bg-slate-700 rounded-lg p-2 flex items-center gap-3 border border-slate-600"
                                >
                                   <div className="w-3 h-3 border-2 border-brand-yellow border-t-transparent rounded-full animate-spin" />
                                   <span className="text-[9px] text-slate-400 font-bold">{t('p2d.genReport')}</span>
                                </motion.div>
                              ) : (
                                <motion.div 
                                  key="ready"
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0 }}
                                  className="bg-green-500/10 rounded-lg p-2 flex items-center justify-between border border-green-500/30 cursor-pointer"
                                >
                                   <div className="flex items-center gap-2">
                                      <div className="w-6 h-6 bg-green-500/20 rounded flex items-center justify-center text-[8px] font-bold text-green-400">PDF</div>
                                      <span className="text-[9px] font-bold text-green-100">Report_Ready.pdf</span>
                                   </div>
                                   <CheckCircle2 className="w-3 h-3 text-green-400" />
                                </motion.div>
                              )}
                           </AnimatePresence>
                       </div>
                       <div className="mt-2 text-center font-bold text-slate-500 text-xs tracking-widest uppercase">Analytics & Reports</div>
                   </div>

                </div>

              </div>
            </div>
        </div>
      </div>
    </section>
  );
};
