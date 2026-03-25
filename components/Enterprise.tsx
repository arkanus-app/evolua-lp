import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Server, Users, Building, ArrowRight, Check } from 'lucide-react';
import { Button } from './Button';
import { useLanguage } from '../LanguageContext';

export const Enterprise: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="enterprise" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-brand-yellowDark font-bold tracking-widest uppercase text-sm mb-3">{t('ent.eyebrow')}</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
              {t('ent.title')}
            </h3>
            <p className="text-xl text-slate-600 font-medium">
              {t('ent.subtitle')}
            </p>
          </div>
          <Button className="flex-shrink-0" variant="primary" href="#contact">
            {t('ent.btn')} <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Feature 1: Security */}
          <motion.div 
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm"
          >
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <Shield className="w-8 h-8" />
            </div>
            <h4 className="text-2xl font-bold text-slate-900 mb-4">{t('ent.feat1.title')}</h4>
            <p className="text-slate-600 mb-6 leading-relaxed">
              {t('ent.feat1.desc')}
            </p>
            <ul className="space-y-3">
              {[t('ent.feat1.l1'), t('ent.feat1.l2'), t('ent.feat1.l3')].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                  <Check className="w-4 h-4 text-blue-500" strokeWidth={3} />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Feature 2: SSO & Integrations */}
          <motion.div 
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm"
          >
            <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
              <Lock className="w-8 h-8" />
            </div>
            <h4 className="text-2xl font-bold text-slate-900 mb-4">{t('ent.feat2.title')}</h4>
            <p className="text-slate-600 mb-6 leading-relaxed">
              {t('ent.feat2.desc')}
            </p>
            <div className="flex items-center gap-4 mt-4">
              {/* Logo placeholders for Okta, Google, Azure */}
              <div className="h-10 w-20 bg-slate-100 rounded-lg flex items-center justify-center font-bold text-slate-400 text-xs">Okta</div>
              <div className="h-10 w-20 bg-slate-100 rounded-lg flex items-center justify-center font-bold text-slate-400 text-xs">Azure</div>
              <div className="h-10 w-20 bg-slate-100 rounded-lg flex items-center justify-center font-bold text-slate-400 text-xs">Google</div>
            </div>
          </motion.div>

          {/* Feature 3: Dedicated Support */}
          <motion.div 
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm"
          >
            <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-6">
              <Server className="w-8 h-8" />
            </div>
            <h4 className="text-2xl font-bold text-slate-900 mb-4">{t('ent.feat3.title')}</h4>
            <p className="text-slate-600 mb-6 leading-relaxed">
              {t('ent.feat3.desc')}
            </p>
             <ul className="space-y-3">
              {[t('ent.feat3.l1'), t('ent.feat3.l2'), t('ent.feat3.l3')].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                  <Check className="w-4 h-4 text-orange-500" strokeWidth={3} />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Integration Diagram Banner */}
        <div className="bg-slate-900 rounded-[3rem] p-10 md:p-16 relative overflow-hidden text-center">
           <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>
           
           <h4 className="text-white text-2xl md:text-3xl font-bold mb-10 relative z-10">
             {t('ent.integrations')}
           </h4>

           <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 relative z-10">
              {['Canvas', 'Blackboard', 'Moodle', 'PowerSchool'].map((tool, i) => (
                <motion.div 
                  key={tool}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, delay: i * 0.5, repeat: Infinity, ease: "easeInOut" }}
                  className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-xl text-white font-bold border border-white/20"
                >
                  {tool}
                </motion.div>
              ))}
              <motion.div 
                 animate={{ scale: [1, 1.1, 1] }}
                 transition={{ duration: 2, repeat: Infinity }}
                 className="px-6 py-3 bg-brand-yellow text-slate-900 rounded-xl font-black shadow-[0_0_20px_rgba(250,204,21,0.5)]"
              >
                Evalua API
              </motion.div>
           </div>
        </div>

      </div>
    </section>
  );
};