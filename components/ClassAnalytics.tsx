import React, { useEffect, useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, TrendingUp, Brain, Target, Lightbulb } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export const ClassAnalytics: React.FC = () => {
  const { t } = useLanguage();
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const data = [
    { subject: t('analytics.topic.grammar'), fullKey: 'grammar', A: 120, B: 110, fullMark: 150 },
    { subject: t('analytics.topic.logic'), fullKey: 'logic', A: 98, B: 130, fullMark: 150 },
    { subject: t('analytics.topic.creativity'), fullKey: 'creativity', A: 86, B: 130, fullMark: 150 },
    { subject: t('analytics.topic.evidence'), fullKey: 'evidence', A: 99, B: 100, fullMark: 150 },
    { subject: t('analytics.topic.structure'), fullKey: 'structure', A: 85, B: 90, fullMark: 150 },
    { subject: t('analytics.topic.vocab'), fullKey: 'vocab', A: 65, B: 85, fullMark: 150 },
  ];

  // Get current skill details based on active hover
  const currentSkill = activeSkill ? data.find(d => d.subject === activeSkill) : null;

  // Custom Tick Component for interactive labels
  const CustomTick = ({ x, y, payload, ...props }: any) => {
     const isActive = activeSkill === payload.value;
     return (
       <text
         x={x}
         y={y}
         dy={4}
         textAnchor="middle"
         fill={isActive ? '#f59e0b' : '#64748b'}
         fontWeight={isActive ? 900 : 600}
         fontSize={isActive ? 14 : 12}
         style={{ transition: 'all 0.2s ease', cursor: 'pointer' }}
         onMouseEnter={() => setActiveSkill(payload.value)}
       >
         {payload.value}
       </text>
     );
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Chart Visualization */}
          <div className="relative order-2 lg:order-1">
            <div className="absolute inset-0 bg-brand-yellow/5 rounded-full blur-3xl transform -translate-x-10"></div>
            
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-[2.5rem] border-4 border-slate-100 shadow-2xl p-6 relative z-10 h-[480px] flex flex-col"
            >
              <div className="flex justify-between items-center mb-2 px-2 shrink-0">
                <div>
                   <h4 className="font-bold text-slate-900 text-lg">{t('analytics.chart.title')}</h4>
                   <p className="text-xs text-slate-500 font-semibold">{t('analytics.chart.subtitle')}</p>
                </div>
                <div className="flex gap-3 text-xs font-bold">
                   <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-brand-yellow"></div> {t('analytics.chart.class')}</div>
                   <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-purple-500"></div> {t('analytics.chart.student')}</div>
                </div>
              </div>

              <div className="flex-1 w-full min-h-0 cursor-crosshair">
                {isMounted ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart 
                      cx="50%" 
                      cy="50%" 
                      outerRadius="75%" 
                      data={data}
                      onMouseMove={(e) => {
                        if (e.activeLabel) {
                          setActiveSkill(String(e.activeLabel));
                        }
                      }}
                      onMouseLeave={() => setActiveSkill(null)}
                    >
                      <PolarGrid stroke="#e2e8f0" />
                      <PolarAngleAxis 
                          dataKey="subject" 
                          tick={<CustomTick />}
                      />
                      <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                      <Radar name={t('analytics.chart.student')} dataKey="A" stroke="#a855f7" strokeWidth={3} fill="#a855f7" fillOpacity={0.3} />
                      <Radar name={t('analytics.chart.class')} dataKey="B" stroke="#fbbf24" strokeWidth={3} fill="#fbbf24" fillOpacity={0.3} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                        itemStyle={{ fontWeight: 'bold' }}
                        active={false} // Hide default tooltip to use our custom card
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full w-full" />
                )}
              </div>

              {/* Dynamic Floating Insight Card */}
              <AnimatePresence mode="wait">
                {activeSkill && currentSkill ? (
                    <motion.div 
                        key="detail"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-8 left-6 right-6 bg-white border border-slate-100 p-4 rounded-xl shadow-xl flex flex-col gap-2 z-20"
                    >
                       <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                          <div className="font-extrabold text-slate-800 flex items-center gap-2">
                             <Target className="w-4 h-4 text-brand-yellow" />
                             {currentSkill.subject}
                          </div>
                          <div className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">{t('analytics.breakdown')}</div>
                       </div>
                       <div className="flex gap-4 text-xs">
                          <div className="flex-1">
                             <span className="block text-slate-400 font-bold">{t('analytics.student')}</span>
                             <span className="text-lg font-black text-purple-600">{Math.round((currentSkill.A / 150) * 100)}%</span>
                          </div>
                          <div className="flex-1">
                             <span className="block text-slate-400 font-bold">{t('analytics.classAvg')}</span>
                             <span className="text-lg font-black text-brand-yellow">{Math.round((currentSkill.B / 150) * 100)}%</span>
                          </div>
                       </div>
                       <div className="mt-1 flex items-start gap-2 bg-slate-50 p-2 rounded-lg">
                          <Lightbulb className="w-3 h-3 text-slate-400 mt-0.5 flex-shrink-0" />
                          <p className="text-xs text-slate-600 leading-tight font-medium">
                             {t(`analytics.insight.${currentSkill.fullKey}`)}
                          </p>
                       </div>
                    </motion.div>
                ) : (
                    <motion.div 
                        key="default"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        viewport={{ once: true }}
                        className="absolute bottom-8 left-6 right-6 bg-slate-900 text-white p-4 rounded-xl shadow-lg flex items-center gap-4 z-20"
                    >
                        <div className="p-2 bg-red-500/20 rounded-lg">
                            <AlertTriangle className="w-5 h-5 text-red-400" />
                        </div>
                        <div>
                            <div className="font-bold text-sm">{t('analytics.alert.title')}</div>
                            <div className="text-xs text-slate-400">{t('analytics.alert.desc')}</div>
                        </div>
                    </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wide mb-6">
               <Target className="w-4 h-4" />
               <span>{t('analytics.badge')}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
               {t('analytics.title.1')}<br/>
               <span className="text-brand-yellowDark">{t('analytics.title.2')}</span>
            </h2>
            <p className="text-lg text-slate-600 mb-8 font-medium leading-relaxed">
               {t('analytics.subtitle')}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               {[
                 {
                   icon: <Brain className="w-5 h-5 text-purple-600" />,
                   title: t('analytics.card1.title'),
                   desc: t('analytics.card1.desc')
                 },
                 {
                   icon: <TrendingUp className="w-5 h-5 text-green-600" />,
                   title: t('analytics.card2.title'),
                   desc: t('analytics.card2.desc')
                 }
               ].map((item, i) => (
                 <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                    className="p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-brand-yellow/50 transition-colors"
                  >
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center mb-3">
                       {item.icon}
                    </div>
                    <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                 </motion.div>
               ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
