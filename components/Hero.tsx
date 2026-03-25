import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Button } from './Button';
import { CheckCircle2, ArrowRight, Star, Sparkles, LayoutDashboard, GraduationCap, Plus, Percent, Divide } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../LanguageContext';

export const Hero: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'creator' | 'gradebook'>('creator');
  const { t } = useLanguage();
  
  // Parallax Background Logic
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  // Tab cycling animation
  useEffect(() => {
    const tabs: ('overview' | 'creator' | 'gradebook')[] = ['overview', 'creator', 'gradebook'];
    
    const timer = setInterval(() => {
      setActiveTab((prev) => {
        const currentIndex = tabs.indexOf(prev);
        const nextIndex = (currentIndex + 1) % tabs.length;
        return tabs[nextIndex];
      });
    }, 12000); // Cycle every 12 seconds to allow reading time
    
    return () => clearInterval(timer);
  }, []);

  // Generator Step State
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (activeTab === 'creator') {
      const timer = setInterval(() => {
        setStep((prev) => (prev + 1) % 4); 
      }, 3000);
      return () => clearInterval(timer);
    } else {
      setStep(0);
    }
  }, [activeTab]);

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-40 overflow-x-clip overflow-visible">
      {/* School Pattern Background - Graph Paper Effect */}
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      {/* NEW: Floating Particles & Atmosphere Container - Optimized for Performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-15 hidden md:block">
         {/* Reduced count of floating elements for better FPS */}
         
         {/* Floating Math Symbols */}
         <motion.div 
           animate={{ y: [0, -30, 0], rotate: [0, 10, 0], opacity: [0.3, 0.6, 0.3] }}
           transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
           className="absolute top-[15%] left-[5%] text-brand-yellow/40 will-change-transform"
         >
           <Plus className="w-12 h-12" strokeWidth={4} />
         </motion.div>

         <motion.div 
           animate={{ y: [0, -40, 0], opacity: [0.2, 0.4, 0.2] }}
           transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
           className="absolute top-[25%] right-[10%] text-slate-300/50 will-change-transform"
         >
           <Percent className="w-16 h-16" strokeWidth={3} />
         </motion.div>

         {/* Geometric Shapes - Simplified animations */}
         <motion.div 
           animate={{ rotate: 360 }}
           transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
           className="absolute top-[10%] right-[25%] w-24 h-24 border-4 border-slate-100 rounded-3xl opacity-60 will-change-transform"
         />
         
         <motion.div 
           animate={{ rotate: -360 }}
           transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
           className="absolute bottom-[10%] right-[5%] w-32 h-32 border-4 border-brand-yellow/10 rounded-full border-dashed will-change-transform"
         />

         {/* Small Drifting Particles - Reduced count to 3 */}
         {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 0 }}
              animate={{ 
                opacity: [0, 0.5, 0], 
                y: -80,
                x: i % 2 === 0 ? 30 : -30
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                delay: i * 3,
                ease: "linear"
              }}
              className="absolute w-2 h-2 bg-slate-200 rounded-full will-change-transform"
              style={{
                left: `${20 + i * 30}%`,
                bottom: '-10%',
              }}
            />
         ))}
      </div>

      {/* Background Blobs with Parallax - Added Hardware Acceleration Hint */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-10 right-0 w-[600px] h-[600px] bg-gradient-to-br from-brand-yellow/30 to-orange-300/30 rounded-full blur-3xl -z-10 mix-blend-multiply opacity-70 hidden md:block will-change-transform" 
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-blue-200/40 to-purple-200/40 rounded-full blur-3xl -z-10 mix-blend-multiply opacity-70 hidden md:block will-change-transform" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center">
          
          {/* Content Side */}
          <div className="flex-1 text-center lg:text-left z-10 lg:pr-12 mb-16 lg:mb-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <motion.div 
                whileHover={{ scale: 1.05, rotate: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 border-slate-100 shadow-sm text-slate-600 font-bold text-sm mb-8 cursor-pointer transition-colors hover:border-brand-yellow/50"
              >
                <Star className="w-4 h-4 text-brand-yellow fill-brand-yellow" />
                <span>{t('hero.badge')}</span>
              </motion.div>
              
              <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-8">
                {t('hero.title.1')} <br />
                <span className="relative inline-block">
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-brand-yellowDark to-orange-500">{t('hero.title.2')}</span>
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-brand-yellow opacity-40" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                  </svg>
                </span>
              </h1>
              
              <p className="text-xl text-slate-700 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
                {t('hero.subtitle')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button href="#contact" className="text-lg px-8 py-4 shadow-xl shadow-brand-yellow/20">
                  {t('hero.startFree')} <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button variant="outline" href="#how-it-works" className="text-lg px-8 py-4">
                  {t('hero.viewDemo')}
                </Button>
              </div>

              <div className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-4 text-slate-500 font-semibold">
                <motion.div whileHover={{ scale: 1.05, y: -2 }} className="flex items-center gap-2 cursor-default">
                  <div className="p-1 bg-green-100 rounded-full">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  </div>
                  <span>{t('hero.pill.camera')}</span>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05, y: -2 }} className="flex items-center gap-2 cursor-default">
                  <div className="p-1 bg-blue-100 rounded-full">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  </div>
                  <span>{t('hero.pill.quiz')}</span>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Hero Visual Side - Dashboard Browser Simulation */}
          <div className="flex-1 w-full relative lg:-mr-32 xl:-mr-56 perspective-1000">
             <motion.div 
              initial={{ opacity: 0, rotateY: -10, x: 0, y: 100 }}
              whileInView={{ opacity: 1, rotateY: 0, x: 0, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, rotateY: -2 }} // Interactive Zoom & Tilt
              transition={{ duration: 1, type: "spring", bounce: 0.2 }}
              className="relative w-full max-w-[500px] lg:max-w-none lg:w-[125%] cursor-pointer group will-change-transform"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-brand-yellow/30 to-orange-200/30 rounded-[3rem] blur-2xl -z-10 transform rotate-3 group-hover:rotate-6 transition-transform duration-700 hidden md:block will-change-transform"></div>
              
              <div className="bg-white rounded-[2.5rem] border-4 border-slate-100 shadow-2xl overflow-hidden relative min-h-[550px] flex flex-col">
                
                {/* Browser Header & Tabs */}
                <div className="bg-slate-50 px-6 pt-4 pb-0 border-b-2 border-slate-200 flex items-end justify-between gap-8">
                   <div className="flex items-center gap-2 mb-3 hidden sm:flex">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                   </div>
                   
                   {/* Tabs */}
                   <div className="flex-1 flex gap-2 overflow-x-auto no-scrollbar">
                      {[
                        { id: 'overview', label: t('hero.dash.overview'), icon: LayoutDashboard },
                        { id: 'creator', label: t('hero.dash.creator'), icon: Sparkles },
                        { id: 'gradebook', label: t('hero.dash.gradebook'), icon: GraduationCap }
                      ].map(tab => (
                        <button
                          key={tab.id}
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent triggering parent click logic if any
                            setActiveTab(tab.id as any);
                          }}
                          className={`flex items-center gap-2 px-4 py-2 rounded-t-xl font-bold text-sm transition-colors relative whitespace-nowrap ${
                            activeTab === tab.id 
                              ? 'bg-white text-slate-900' 
                              : 'bg-slate-200/50 text-slate-500 hover:bg-slate-200'
                          }`}
                        >
                          <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-brand-yellowDark' : ''}`} />
                          {tab.label}
                          {activeTab === tab.id && (
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-white transform translate-y-[2px] z-10" />
                          )}
                        </button>
                      ))}
                   </div>
                </div>

                {/* Tab Content Area */}
                <div className="p-6 flex-1 bg-slate-50/30 relative overflow-hidden flex flex-col">
                   <AnimatePresence mode="wait">
                      
                      {/* OVERVIEW TAB */}
                      {activeTab === 'overview' && (
                        <motion.div
                          key="overview"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="h-full flex flex-col gap-6"
                        >
                           <div className="grid grid-cols-3 gap-2 sm:gap-4 shrink-0">
                              {[
                                { label: t('hero.dash.avgScore'), val: '88.4%', sub: '+2.1%', color: 'text-green-500' },
                                { label: t('hero.dash.pending'), val: '12', sub: t('hero.dash.requiresReview'), color: 'text-orange-500' },
                                { label: t('hero.dash.attendance'), val: '95%', sub: 'Stable', color: 'text-slate-400' },
                              ].map((stat, idx) => (
                                <motion.div 
                                  key={idx}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: idx * 0.1 }}
                                  className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-100 shadow-sm"
                                >
                                  <div className="text-slate-400 text-[10px] font-bold uppercase mb-1">{stat.label}</div>
                                  <div className="text-xl sm:text-2xl font-black text-slate-900">{stat.val}</div>
                                  <div className={`${stat.color} text-[10px] font-bold`}>{stat.sub}</div>
                                </motion.div>
                              ))}
                           </div>
                           <div className="flex-1 bg-white rounded-2xl border border-slate-100 shadow-sm p-4 min-h-[180px] flex flex-col">
                              <div className="flex-1 w-full min-h-0">
                                <ResponsiveContainer width="100%" height="100%">
                                  <AreaChart data={[
                                    {v: 65}, {v: 70}, {v: 68}, {v: 74}, {v: 78}, {v: 85}, {v: 82}, {v: 90}
                                  ]}>
                                    <defs>
                                      <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#fbbf24" stopOpacity={0}/>
                                      </linearGradient>
                                    </defs>
                                    <Area type="monotone" dataKey="v" stroke="#f59e0b" fill="url(#grad1)" strokeWidth={3} animationDuration={1500} />
                                  </AreaChart>
                                </ResponsiveContainer>
                              </div>
                              <div className="mt-4 pt-4 border-t border-slate-100">
                                <div className="text-xs font-bold text-slate-400 uppercase mb-2">{t('hero.dash.subjectMastery')}</div>
                                <div className="space-y-3">
                                  {[{s: 'Biology', p: 92}, {s: 'History', p: 78}, {s: 'Math', p: 85}].map((sub, idx) => (
                                    <div key={idx} className="flex items-center gap-2 text-xs font-bold text-slate-700">
                                      <span className="w-12">{sub.s}</span>
                                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <motion.div 
                                          initial={{ width: 0 }}
                                          animate={{ width: `${sub.p}%` }}
                                          transition={{ delay: 0.2 + idx * 0.1, duration: 0.8 }}
                                          className="h-full bg-brand-yellow"
                                        />
                                      </div>
                                      <span>{sub.p}%</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                           </div>
                        </motion.div>
                      )}

                      {/* CREATOR TAB */}
                      {activeTab === 'creator' && (
                        <motion.div
                          key="creator"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="h-full flex flex-col"
                        >
                            {/* Input Area */}
                           <div className="bg-white p-2 pl-5 rounded-2xl shadow-sm border-2 border-slate-100 flex items-center gap-4 mb-6 shrink-0">
                              <div className="flex-1 font-medium text-slate-600 truncate">
                                {step === 0 || step === 3 ? (
                                  <motion.span
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    className="overflow-hidden whitespace-nowrap inline-block align-bottom"
                                  >
                                    {t('hero.gen.placeholder')}
                                  </motion.span>
                                ) : (
                                  t('hero.gen.placeholder')
                                )}
                                <span className="animate-pulse">|</span>
                              </div>
                              <div className="p-2 bg-brand-yellow rounded-xl">
                                 <ArrowRight className="w-5 h-5 text-slate-900" />
                              </div>
                           </div>

                           {/* Generated Cards Area */}
                           <div className="flex-1 relative space-y-4 overflow-y-auto pr-2">
                              <AnimatePresence mode="wait">
                                {(step === 1 || step === 2 || step === 3) && (
                                  <motion.div className="space-y-4">
                                    {/* Question Card */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-white p-4 rounded-2xl shadow-sm border-2 border-slate-100"
                                      >
                                        <div className="flex gap-3 mb-3">
                                          <div className="w-6 h-6 rounded-full bg-brand-yellow flex items-center justify-center text-xs font-bold">1</div>
                                          <h4 className="font-bold text-slate-800 text-sm">{t('hero.gen.question')}</h4>
                                        </div>
                                        <div className="space-y-2 pl-9">
                                          {['Carbon Dioxide', 'Oxygen', 'Nitrogen', 'Helium'].map((opt, idx) => (
                                            <motion.div 
                                              key={idx}
                                              initial={{ opacity: 0, x: -10 }}
                                              animate={{ opacity: 1, x: 0 }}
                                              transition={{ delay: idx * 0.1 }}
                                              className={`p-2 rounded-lg text-xs font-semibold border flex justify-between items-center ${
                                                step >= 2 && idx === 1 
                                                  ? 'bg-yellow-50 border-yellow-200 text-yellow-800' 
                                                  : 'bg-slate-50 border-slate-100 text-slate-600'
                                              }`}
                                            >
                                              <span>{String.fromCharCode(65 + idx)}. {opt}</span>
                                              {step >= 2 && idx === 1 && (
                                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                                  <CheckCircle2 className="w-3 h-3 text-yellow-600" />
                                                </motion.div>
                                              )}
                                            </motion.div>
                                          ))}
                                        </div>
                                      </motion.div>

                                    {/* Skeleton for next question */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 0.5 }}
                                        transition={{ delay: 0.4 }}
                                        className="bg-white p-4 rounded-2xl shadow-sm border-2 border-slate-100 opacity-50"
                                    >
                                       <div className="h-4 bg-slate-100 rounded w-3/4 mb-2"></div>
                                       <div className="h-8 bg-slate-50 rounded w-full"></div>
                                    </motion.div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                           </div>
                        </motion.div>
                      )}

                      {/* GRADEBOOK TAB */}
                      {activeTab === 'gradebook' && (
                        <motion.div
                          key="gradebook"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 1.05 }}
                          className="h-full bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col"
                        >
                           <div className="grid grid-cols-4 p-4 bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase shrink-0">
                              <div className="col-span-2">Student</div>
                              <div className="text-center">Score</div>
                              <div className="text-right">Status</div>
                           </div>
                           <div className="flex-1 overflow-hidden p-2 overflow-y-auto">
                              {[
                                { name: "Alice Freeman", score: 92, status: "Graded" },
                                { name: "Bob Smith", score: 88, status: "Graded" },
                                { name: "Charlie Davis", score: 74, status: "Review" },
                                { name: "Diana Prince", score: 98, status: "Graded" },
                                { name: "Evan Wright", score: -1, status: "Pending" },
                              ].map((s, i) => (
                                <motion.div 
                                  key={i}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.1 }}
                                  className="grid grid-cols-4 items-center p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer"
                                >
                                   <div className="col-span-2 font-bold text-slate-700 flex items-center gap-2">
                                      <div className="w-6 h-6 rounded-full bg-slate-200" />
                                      {s.name}
                                   </div>
                                   <div className="text-center font-mono font-semibold text-slate-600">
                                      {s.score > 0 ? `${s.score}%` : '-'}
                                   </div>
                                   <div className="text-right">
                                      <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase ${
                                        s.status === 'Graded' ? 'bg-green-100 text-green-600' :
                                        s.status === 'Review' ? 'bg-orange-100 text-orange-600' :
                                        'bg-slate-100 text-slate-500'
                                      }`}>
                                        {s.status}
                                      </span>
                                   </div>
                                </motion.div>
                              ))}
                           </div>
                        </motion.div>
                      )}

                   </AnimatePresence>
                </div>

              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};