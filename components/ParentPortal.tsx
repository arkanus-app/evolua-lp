import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Calendar, CheckCircle2, MessageCircle, Award, Send, User, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from './Button';
import { useLanguage } from '../LanguageContext';

export const ParentPortal: React.FC = () => {
  const { t } = useLanguage();

  // State for the interactive phone demo
  const [notifications, setNotifications] = useState<any[]>([]);
  const [expandedId, setExpandedId] = useState<number | string | null>(null);

  const getDesc = (type: string) => t(`parent.desc.${type}`);

  // Reset notifications when language changes to update text
  useEffect(() => {
    setNotifications([
      {
        id: 1,
        type: 'grade',
        title: t('parent.notif.grade.title'),
        subtitle: t('parent.notif.grade.sub'),
        value: '94%',
        time: '2m',
        color: 'bg-brand-yellow text-slate-900',
        sender: 'Mr. Anderson',
        description: getDesc('grade')
      },
      {
        id: 2,
        type: 'event',
        title: t('parent.notif.event.title'),
        subtitle: t('parent.notif.event.sub'),
        value: '1d',
        time: '1h',
        color: 'bg-blue-100 text-blue-700',
        sender: 'School Admin',
        description: getDesc('event')
      },
    ]);
    setExpandedId(null);
  }, [t]);

  const triggerNotification = () => {
    const templates = [
       { type: 'message', title: t('parent.dynamic.message.title'), subtitle: 'Mrs. Robinson', value: '1', color: 'bg-purple-100 text-purple-700' },
       { type: 'grade', title: t('parent.notif.grade.title'), subtitle: t('parent.dynamic.grade.subtitle'), value: 'A-', color: 'bg-brand-yellow text-slate-900' },
       { type: 'award', title: t('parent.dynamic.award.title'), subtitle: t('parent.dynamic.award.subtitle'), value: 'Lvl 5', color: 'bg-green-100 text-green-700' },
       { type: 'attendance', title: t('parent.dynamic.attendance.title'), subtitle: t('parent.dynamic.attendance.subtitle'), value: 'OK', color: 'bg-slate-100 text-slate-700' },
    ];

    const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
    const newNotif = {
      ...randomTemplate,
      id: Date.now(),
      time: '1s',
      sender: t('parent.sender.system'),
      description: getDesc(randomTemplate.type)
    };

    setNotifications(prev => [newNotif, ...prev.slice(0, 3)]);
    setExpandedId(newNotif.id); // Auto expand new one to show it off
  };

  const toggleExpand = (id: number | string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleProfileClick = (e: React.MouseEvent) => {
     e.stopPropagation();
     // Just a visual feedback since we can't actually go to a profile page
  };

  return (
    <section className="py-16 md:py-24 bg-slate-900 overflow-hidden relative">
      {/* Animated Math Background - Optimized for Performance */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          {/* Subtle Graph Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

          {/* Floating Math Symbols - Reduced count and duration for smoother FPS */}
          {[
              { s: 'π', x: '10%', y: '20%', d: 15, scale: 1 },
              { s: '∑', x: '85%', y: '15%', d: 20, scale: 1.2 },
              { s: '√', x: '20%', y: '80%', d: 18, scale: 0.8 },
              { s: '∞', x: '75%', y: '75%', d: 25, scale: 1.1 },
              { s: '+', x: '50%', y: '40%', d: 30, scale: 1.5 },
              { s: '÷', x: '15%', y: '50%', d: 22, scale: 0.9 },
          ].map((item, i) => (
               <motion.div
                  key={i}
                  initial={{ y: 0, opacity: 0 }}
                  animate={{
                      y: [0, -30, 0],
                      opacity: [0.05, 0.2, 0.05],
                      rotate: [0, 15, -15, 0]
                  }}
                  transition={{
                      duration: item.d,
                      repeat: Infinity,
                      ease: 'easeInOut'
                  }}
                  className="absolute text-slate-600 font-serif font-bold text-4xl md:text-6xl will-change-transform"
                  style={{ left: item.x, top: item.y, scale: item.scale }}
               >
                  {item.s}
               </motion.div>
          ))}

          {/* Rotating Geometric Orbits - Simplified */}
           <motion.div
               animate={{ rotate: 360 }}
               transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
               className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] border border-slate-800/50 rounded-full border-dashed opacity-30 will-change-transform"
           />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Text Content */}
          <div className="order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-900/50 text-green-400 border border-green-800 text-xs font-bold uppercase tracking-wide mb-6">
               <MessageCircle className="w-4 h-4" />
               <span>{t('parent.badge')}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 leading-tight">
               {t('parent.title.1')}<br/>
               <span className="text-brand-yellow">{t('parent.title.2')}</span>
            </h2>
            <p className="text-lg text-slate-400 mb-8 font-medium leading-relaxed">
               {t('parent.subtitle')}
            </p>

            <ul className="space-y-4 mb-10">
               {[
                 t('parent.list.1'),
                 t('parent.list.2'),
                 t('parent.list.3')
               ].map((feat, i) => (
                 <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3"
                 >
                    <CheckCircle2 className="w-5 h-5 text-brand-yellow flex-shrink-0" />
                    <span className="text-slate-300 font-semibold">{feat}</span>
                 </motion.li>
               ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
               <Button variant="primary" href="#contact" className="w-full sm:w-auto">
                  {t('parent.btn.enable')}
               </Button>
               <button
                  onClick={triggerNotification}
                  className="group flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-bold text-white border-2 border-slate-700 hover:bg-slate-800 hover:border-slate-600 transition-all active:scale-95 w-full sm:w-auto"
               >
                  <Send className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                  {t('parent.btn.demo')}
               </button>
            </div>
            <p className="mt-4 text-xs text-slate-500 flex items-center gap-2">
               <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
               {t('parent.demo.hint')}
            </p>
          </div>

          {/* Phone Animation */}
          <div className="order-2 flex justify-center lg:justify-end [perspective:1000px] mt-8 lg:mt-0">
             <motion.div
               initial={{ rotateY: -5, rotateX: 2, opacity: 0, y: 30 }}
               whileInView={{ rotateY: 0, rotateX: 0, opacity: 1, y: 0 }}
               transition={{ duration: 0.8, ease: 'easeOut' }}
               viewport={{ once: true, margin: '-50px' }}
               className="w-full max-w-[320px] bg-white rounded-[2.5rem] md:rounded-[3rem] border-[8px] border-slate-800 shadow-2xl overflow-hidden relative h-[600px] mx-auto lg:mx-0 will-change-transform"
             >
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 md:w-32 h-6 bg-slate-800 rounded-b-xl z-20"></div>

                {/* App Header */}
                <div className="bg-slate-50 pt-12 pb-4 px-6 border-b border-slate-100 sticky top-0 z-10">
                   <div className="flex justify-between items-center">
                      <div>
                         <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t('parent.phone.header')}</div>
                         <div className="text-lg font-black text-slate-900">{t('parent.phone.sub')}</div>
                      </div>
                      <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full border-2 border-white shadow-sm flex items-center justify-center cursor-pointer hover:bg-blue-200 transition-colors">
                         <User className="w-5 h-5" />
                      </div>
                   </div>
                </div>

                {/* App Body / Feed */}
                <div className="p-4 bg-slate-50/50 h-full overflow-hidden flex flex-col relative">

                   {/* Dynamic Notifications Feed */}
                   <div className="flex-1 space-y-3 pb-20 relative overflow-y-auto no-scrollbar">
                      <AnimatePresence initial={false} mode="popLayout">
                        {notifications.map((notif) => (
                           <motion.div
                              key={notif.id}
                              layout
                              initial={{ opacity: 0, x: -50, scale: 0.9 }}
                              animate={{ opacity: 1, x: 0, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                              onClick={() => toggleExpand(notif.id)}
                              className="bg-white rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden cursor-pointer group will-change-transform"
                           >
                              <div className={`absolute top-0 left-0 w-1 h-full ${notif.type === 'grade' ? 'bg-brand-yellow' : 'bg-blue-500'}`}></div>

                              {/* Card Header */}
                              <div className="p-4">
                                <div className="flex justify-between items-start mb-1">
                                   <div className="flex items-center gap-2">
                                      {/* Interactive Profile Icon */}
                                      <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={handleProfileClick}
                                        className={`p-1.5 rounded-lg ${notif.color} cursor-pointer z-10`}
                                      >
                                         {notif.type === 'grade' ? <Award className="w-3 h-3" /> : <Bell className="w-3 h-3" />}
                                      </motion.div>
                                      <span className="font-bold text-xs text-slate-500 uppercase">{notif.title}</span>
                                   </div>
                                   <span className="text-[10px] font-bold text-slate-300">{notif.time}</span>
                                </div>
                                <div className="pl-9 flex justify-between items-center">
                                   <div>
                                      <div className="font-bold text-slate-900 text-sm mb-0.5">{notif.subtitle}</div>
                                      <div className={`inline-block text-xs font-extrabold px-2 py-0.5 rounded-md ${notif.color}`}>
                                         {notif.value}
                                      </div>
                                   </div>
                                   {expandedId === notif.id ? (
                                      <ChevronUp className="w-4 h-4 text-slate-300" />
                                   ) : (
                                      <ChevronDown className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
                                   )}
                                </div>
                              </div>

                              {/* Expanded Description */}
                              <AnimatePresence>
                                {expandedId === notif.id && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="px-4 pb-4 pt-0 pl-13"
                                  >
                                     <div className="pt-3 border-t border-slate-50">
                                        <div className="flex items-center gap-1.5 mb-2">
                                            <div className="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center">
                                               <User className="w-2.5 h-2.5 text-slate-500" />
                                            </div>
                                            <span className="text-[10px] font-bold text-slate-400">{notif.sender}</span>
                                        </div>
                                        <p className="text-xs text-slate-600 leading-relaxed">
                                            {notif.description}
                                        </p>
                                        <div className="mt-3 flex gap-2">
                                           <button className="flex-1 py-1.5 bg-slate-50 text-slate-600 text-[10px] font-bold rounded-lg hover:bg-slate-100 transition-colors">
                                              {t('parent.actions.reply')}
                                           </button>
                                           <button className="flex-1 py-1.5 bg-slate-50 text-slate-600 text-[10px] font-bold rounded-lg hover:bg-slate-100 transition-colors">
                                              {t('parent.actions.details')}
                                           </button>
                                        </div>
                                     </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>

                           </motion.div>
                        ))}
                      </AnimatePresence>

                      {/* Empty State Spacer if few items */}
                      {notifications.length < 2 && (
                         <motion.div
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                           className="text-center py-8 opacity-30"
                         >
                            <div className="w-12 h-12 bg-slate-200 rounded-full mx-auto mb-2"></div>
                            <div className="h-2 bg-slate-200 rounded w-1/2 mx-auto"></div>
                         </motion.div>
                      )}
                   </div>

                   {/* Bottom Nav */}
                   <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 py-4 flex justify-between items-center">
                      <div className="flex flex-col items-center text-brand-yellowDark cursor-pointer hover:scale-110 transition-transform">
                         <Bell className="w-6 h-6" fill="currentColor" />
                         <span className="text-[10px] font-bold mt-1">{t('parent.nav.feed')}</span>
                      </div>
                      <div className="flex flex-col items-center text-slate-300 cursor-pointer hover:text-slate-400 transition-colors">
                         <Calendar className="w-6 h-6" />
                         <span className="text-[10px] font-bold mt-1">{t('parent.nav.plan')}</span>
                      </div>
                      <div className="flex flex-col items-center text-slate-300 cursor-pointer hover:text-slate-400 transition-colors">
                         <MessageCircle className="w-6 h-6" />
                         <span className="text-[10px] font-bold mt-1">{t('parent.nav.chat')}</span>
                      </div>
                   </div>

                </div>
             </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
