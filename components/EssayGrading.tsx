import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, AlertCircle, CheckCircle, Info, MousePointer2, PenTool } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export const EssayGrading: React.FC = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const { t } = useLanguage();

  // Subtle paper noise pattern
  const paperTexture = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")`;

  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Copy Section */}
          <div className="lg:col-span-4 lg:sticky lg:top-32">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wide mb-6">
                <Bot className="w-4 h-4" />
                <span>{t('essay.badge')}</span>
             </div>
             <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
               {t('essay.title')}
             </h2>
             <p className="text-slate-600 text-lg mb-8 leading-relaxed">
               {t('essay.subtitle')}
             </p>
             
             <div className="space-y-4">
                <motion.div 
                  className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-200 shadow-sm cursor-default transition-all duration-300"
                  whileHover={{ scale: 1.02, borderColor: '#fca5a5' }}
                >
                   <div className="p-2 bg-red-100 rounded-lg text-red-600 flex-shrink-0">
                      <AlertCircle className="w-5 h-5" />
                   </div>
                   <div>
                      <h4 className="font-bold text-slate-900">{t('essay.card.correction.title')}</h4>
                      <p className="text-sm text-slate-500">{t('essay.card.correction.desc')}</p>
                   </div>
                </motion.div>
                <motion.div 
                  className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-200 shadow-sm cursor-default transition-all duration-300"
                  whileHover={{ scale: 1.02, borderColor: '#86efac' }}
                >
                   <div className="p-2 bg-green-100 rounded-lg text-green-600 flex-shrink-0">
                      <CheckCircle className="w-5 h-5" />
                   </div>
                   <div>
                      <h4 className="font-bold text-slate-900">{t('essay.card.praise.title')}</h4>
                      <p className="text-sm text-slate-500">{t('essay.card.praise.desc')}</p>
                   </div>
                </motion.div>
             </div>
          </div>

          {/* Interactive Essay Demo */}
          <div className="lg:col-span-8 relative">
             <div className="bg-white rounded-[1.5rem] shadow-2xl border border-slate-200 min-h-[600px] relative overflow-hidden flex flex-col md:flex-row">
                
                {/* Document View with Paper Texture */}
                <div 
                  className="flex-1 p-8 md:p-12 font-serif text-lg leading-loose text-slate-800 relative transition-colors duration-500"
                  style={{ backgroundColor: '#fdfbf7', backgroundImage: paperTexture }}
                >
                   {/* Paper shadow/depth effect at top */}
                   <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black/5 to-transparent pointer-events-none" />

                   <div className="flex justify-between items-start mb-8 opacity-50">
                      <div className="text-xs font-sans font-bold uppercase tracking-widest text-slate-400">History 101</div>
                      <div className="text-xs font-sans font-bold uppercase tracking-widest text-slate-400">Page 1 of 3</div>
                   </div>

                   <h3 className="font-bold text-2xl mb-6 text-black font-sans">{t('essay.doc.title')}</h3>
                   
                   <p className="mb-6 relative z-10">
                      {t('essay.doc.p1')}{' '}
                      {/* Highlight 1: Good (Thesis) */}
                      <span 
                        className="relative inline-block mx-1 cursor-pointer group"
                        onMouseEnter={() => setFocusedId('thesis')}
                        onMouseLeave={() => setFocusedId(null)}
                      >
                         <motion.span 
                            initial={{ width: 0 }}
                            whileInView={{ width: '100%' }}
                            transition={{ delay: 1, duration: 0.8 }}
                            className={`absolute bottom-0 left-0 h-full -z-10 rounded transition-colors duration-300 ${focusedId === 'thesis' ? 'bg-green-200' : 'bg-green-100'}`}
                         />
                         {t('essay.doc.highlight1')}
                         
                         {/* Floating Badge on Hover */}
                         <AnimatePresence>
                           {focusedId === 'thesis' && (
                             <motion.span 
                               initial={{ opacity: 0, y: 5 }}
                               animate={{ opacity: 1, y: -5 }}
                               exit={{ opacity: 0 }}
                               className="absolute -top-6 left-0 bg-green-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-lg whitespace-nowrap font-sans"
                             >
                               <CheckCircle className="w-3 h-3 inline mr-1" />
                               Good
                             </motion.span>
                           )}
                         </AnimatePresence>
                      </span>{' '}
                      {t('essay.doc.p2')}
                   </p>
                   
                   <p className="relative z-10">
                      {t('essay.doc.p3')}{' '}
                      {/* Highlight 2: Bad (Vocab) */}
                      <span 
                        className="relative inline-block mx-1 cursor-pointer group"
                        onMouseEnter={() => setFocusedId('vocab')}
                        onMouseLeave={() => setFocusedId(null)}
                      >
                         <motion.span 
                            initial={{ width: 0 }}
                            whileInView={{ width: '100%' }}
                            transition={{ delay: 2.5, duration: 0.5 }}
                            className={`absolute bottom-0 left-0 h-full -z-10 rounded transition-colors duration-300 ${focusedId === 'vocab' ? 'bg-red-200' : 'bg-red-100'}`}
                         />
                         <span className={`border-b-2 border-dotted ${focusedId === 'vocab' ? 'border-red-500' : 'border-red-300'}`}>
                           {t('essay.doc.highlight2')}
                         </span>

                         {/* Floating Badge on Hover */}
                         <AnimatePresence>
                           {focusedId === 'vocab' && (
                             <motion.span 
                               initial={{ opacity: 0, y: 5 }}
                               animate={{ opacity: 1, y: -5 }}
                               exit={{ opacity: 0 }}
                               className="absolute -top-6 left-0 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-lg whitespace-nowrap font-sans"
                             >
                               <AlertCircle className="w-3 h-3 inline mr-1" />
                               Improve
                             </motion.span>
                           )}
                         </AnimatePresence>
                      </span>{' '}
                      {t('essay.doc.p4')}
                   </p>

                   {/* Scanning Bar Animation */}
                   <motion.div 
                      initial={{ top: "10%" }}
                      animate={{ top: ["10%", "90%", "10%"] }}
                      transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
                      className="absolute left-0 right-0 h-0.5 bg-blue-400/30 shadow-[0_0_15px_rgba(96,165,250,0.5)] z-0 pointer-events-none"
                   >
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-blue-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-l">
                         AI Scanning...
                      </div>
                   </motion.div>
                </div>

                {/* Sidebar Feedback */}
                <div className="w-full md:w-80 bg-slate-50 border-l border-slate-200 p-5 flex flex-col gap-4 shadow-[inset_10px_0_20px_-10px_rgba(0,0,0,0.05)]">
                   <div className="flex items-center justify-between mb-2 relative">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                         <PenTool className="w-3 h-3" />
                         {t('essay.sidebar.title')}
                      </div>
                      <div 
                        className="cursor-help relative"
                        onMouseEnter={() => setShowInfo(true)}
                        onMouseLeave={() => setShowInfo(false)}
                      >
                         <Info className="w-4 h-4 text-slate-400 hover:text-brand-yellowDark transition-colors" />
                         <AnimatePresence>
                            {showInfo && (
                               <motion.div
                                  initial={{ opacity: 0, y: 5, scale: 0.95 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={{ opacity: 0, y: 5, scale: 0.95 }}
                                  className="absolute right-0 top-6 w-60 bg-slate-800 text-white p-4 rounded-xl shadow-xl z-50 text-xs border border-slate-700"
                               >
                                  <div className="font-bold text-brand-yellow mb-2">{t('essay.sidebar.tooltip.title')}</div>
                                  <p className="leading-relaxed text-slate-300">
                                    {t('essay.sidebar.tooltip.desc')}
                                  </p>
                                  <div className="absolute -top-1 right-0.5 w-3 h-3 bg-slate-800 border-t border-l border-slate-700 transform rotate-45"></div>
                               </motion.div>
                            )}
                         </AnimatePresence>
                      </div>
                   </div>
                   
                   {/* Feedback Cards - Linked to Hover States */}
                   <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2 }}
                      animate={{ 
                        scale: focusedId === 'thesis' ? 1.05 : 1,
                        backgroundColor: focusedId === 'thesis' ? '#ffffff' : '#ffffff',
                        borderColor: focusedId === 'thesis' ? '#22c55e' : 'transparent'
                      }}
                      onMouseEnter={() => setFocusedId('thesis')}
                      onMouseLeave={() => setFocusedId(null)}
                      className="bg-white p-4 rounded-xl border-l-4 border-l-green-500 shadow-sm cursor-pointer transition-all duration-200 border border-transparent"
                   >
                      <div className="flex items-center gap-2 mb-2">
                         <div className="p-1 bg-green-100 rounded text-green-600">
                             <CheckCircle className="w-3.5 h-3.5" />
                         </div>
                         <span className="font-bold text-sm text-slate-900">{t('essay.feedback.thesis')}</span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">{t('essay.feedback.thesis.desc')}</p>
                   </motion.div>

                   <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 2.7 }}
                      animate={{ 
                        scale: focusedId === 'vocab' ? 1.05 : 1,
                        backgroundColor: focusedId === 'vocab' ? '#ffffff' : '#ffffff',
                        borderColor: focusedId === 'vocab' ? '#ef4444' : 'transparent'
                      }}
                      onMouseEnter={() => setFocusedId('vocab')}
                      onMouseLeave={() => setFocusedId(null)}
                      className="bg-white p-4 rounded-xl border-l-4 border-l-red-500 shadow-sm cursor-pointer transition-all duration-200 border border-transparent"
                   >
                      <div className="flex items-center gap-2 mb-2">
                         <div className="p-1 bg-red-100 rounded text-red-600">
                            <AlertCircle className="w-3.5 h-3.5" />
                         </div>
                         <span className="font-bold text-sm text-slate-900">{t('essay.feedback.vocab')}</span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">{t('essay.feedback.vocab.desc')}</p>
                   </motion.div>

                   <div className="mt-auto pt-6 border-t border-slate-200">
                      <div className="flex justify-between items-center mb-2">
                         <div className="text-xs font-bold text-slate-400 uppercase">{t('essay.score')}</div>
                         <div className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">+4 pts vs avg</div>
                      </div>
                      <div className="flex items-baseline justify-between">
                         <motion.div 
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 4, type: "spring" }}
                            className="text-4xl font-black text-slate-900"
                         >
                            88
                         </motion.div>
                         <span className="text-sm font-bold text-slate-400">/ 100</span>
                      </div>
                      {/* Mini Bar Chart */}
                      <div className="flex gap-1 mt-3 h-1.5">
                         <div className="w-1/3 bg-green-400 rounded-full opacity-30"></div>
                         <div className="w-1/3 bg-green-400 rounded-full opacity-50"></div>
                         <div className="w-1/4 bg-green-500 rounded-full"></div>
                      </div>
                   </div>
                </div>

             </div>
          </div>

        </div>
      </div>
    </section>
  );
};