import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { useLanguage } from '../LanguageContext';

const data = [
  { name: 'Assignment 1', score: 65 },
  { name: 'Assignment 2', score: 72 },
  { name: 'Midterm', score: 78 },
  { name: 'Essay', score: 85 },
  { name: 'Final Project', score: 82 },
  { name: 'Pop Quiz', score: 88 },
  { name: 'Final Exam', score: 92 },
];

export const DashboardPreview: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="dashboard" className="py-32 bg-white overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Copy */}
          <div className="order-2 lg:order-1">
            <h2 className="text-sm font-black text-brand-yellowDark tracking-widest uppercase mb-3">{t('dash.eyebrow')}</h2>
            <h3 className="text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
              {t('dash.title')}
            </h3>
            <p className="text-lg text-slate-600 mb-8 font-medium">
              {t('dash.subtitle')}
            </p>
            
            <div className="space-y-6 mb-10">
              {[
                t('dash.list.1'),
                t('dash.list.2'),
                t('dash.list.3'),
                t('dash.list.4')
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ x: 10 }}
                  className="flex items-center text-slate-700 font-bold bg-slate-50 p-4 rounded-2xl border border-slate-100"
                >
                  <div className="w-3 h-3 bg-brand-yellow rounded-full mr-4 shadow-[0_0_10px_#facc15]" />
                  {item}
                </motion.div>
              ))}
            </div>

            <Button variant="secondary" href="#enterprise">{t('dash.btn')}</Button>
          </div>

          {/* Dashboard Visual */}
          <div className="order-1 lg:order-2 relative">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative bg-white rounded-[2.5rem] shadow-2xl border-4 border-slate-100 overflow-hidden z-10"
            >
              {/* Header */}
              <div className="border-b border-slate-100 p-6 flex justify-between items-center bg-slate-50/50 backdrop-blur-sm">
                <div className="font-bold text-slate-700 text-lg">{t('dash.vis.header')}</div>
                <div className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-500 uppercase">
                  {t('dash.vis.period')}
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="bg-yellow-50 p-5 rounded-2xl border border-yellow-100">
                    <div className="text-xs text-yellow-700 font-bold uppercase mb-1">{t('dash.vis.avg')}</div>
                    <div className="text-3xl font-black text-slate-900">84.2%</div>
                  </div>
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                    <div className="text-xs text-slate-400 font-bold uppercase mb-1">{t('dash.vis.graded')}</div>
                    <div className="text-3xl font-black text-slate-900">1.2k</div>
                  </div>
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                    <div className="text-xs text-slate-400 font-bold uppercase mb-1">{t('dash.vis.pending')}</div>
                    <div className="text-3xl font-black text-slate-900 text-slate-300">5</div>
                  </div>
                </div>

                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={data}
                      margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#facc15" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#facc15" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" hide />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} domain={[0, 100]} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                        itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="score" 
                        stroke="#eab308" 
                        strokeWidth={4}
                        fillOpacity={1} 
                        fill="url(#colorScore)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>

            {/* Floating Decor */}
             <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute -bottom-10 -left-10 w-32 h-32 bg-brand-yellow rounded-full mix-blend-multiply filter blur-2xl opacity-50 -z-10"
             />
             <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute -top-10 -right-10 w-40 h-40 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 -z-10"
             />
          </div>

        </div>
      </div>
    </section>
  );
};