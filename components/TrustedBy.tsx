import React from 'react';
import { motion } from 'framer-motion';
import { Building2, GraduationCap, School, Library, BookOpen } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

// Mock Data for Institutions
const institutions = [
  { name: "Tech University", icon: <GraduationCap className="w-6 h-6" /> },
  { name: "Global High School", icon: <School className="w-6 h-6" /> },
  { name: "Future Academy", icon: <BookOpen className="w-6 h-6" /> },
  { name: "Science Institute", icon: <Library className="w-6 h-6" /> },
  { name: "Modern Learning Corp", icon: <Building2 className="w-6 h-6" /> },
  { name: "EduTech Systems", icon: <GraduationCap className="w-6 h-6" /> },
  { name: "Smart College", icon: <School className="w-6 h-6" /> },
  { name: "Prestige University", icon: <Library className="w-6 h-6" /> },
  { name: "Innovation Labs", icon: <Building2 className="w-6 h-6" /> },
  { name: "North State School", icon: <BookOpen className="w-6 h-6" /> },
];

// Duplicate for infinite scroll logic
const row1 = [...institutions, ...institutions];
const row2 = [...institutions.reverse(), ...institutions.reverse()];

const ScrollingRow = ({ items, direction = "left", speed = 20 }: { items: any[], direction?: "left" | "right", speed?: number }) => {
  return (
    <div className="flex w-full relative overflow-hidden">
      <motion.div
        initial={{ x: direction === "left" ? 0 : "-50%" }}
        animate={{ x: direction === "left" ? "-50%" : 0 }}
        transition={{ 
          duration: speed, 
          ease: "linear", 
          repeat: Infinity 
        }}
        className="flex gap-6 pr-6 will-change-transform"
      >
        {items.map((item, idx) => (
          <div 
            key={`${item.name}-${idx}`} 
            className="flex-shrink-0 bg-slate-50 border border-slate-100 px-6 py-4 rounded-2xl flex items-center gap-3 shadow-sm hover:shadow-md hover:border-brand-yellow/30 transition-all min-w-[240px]"
          >
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-400 shadow-inner border border-slate-50">
              {item.icon}
            </div>
            <span className="font-bold text-slate-600 text-sm whitespace-nowrap">{item.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export const TrustedBy: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-white border-b border-slate-100 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
           <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-3">
             {t('trusted.title')}
           </h4>
           <p className="text-xl font-bold text-slate-800 max-w-xl mx-auto leading-relaxed">
             {t('trusted.subtitle')}
           </p>
      </div>

      <div className="relative w-full overflow-hidden pb-8">
         {/* Gradient Masks for smooth fade in/out on edges */}
         <div className="absolute top-0 left-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
         <div className="absolute top-0 right-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
         
         {/* Rows */}
         <div className="flex flex-col gap-6">
            <ScrollingRow items={row1} direction="left" speed={50} />
            <ScrollingRow items={row2} direction="right" speed={60} />
         </div>
      </div>
    </section>
  );
};