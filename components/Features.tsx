import React, { useRef } from 'react';
import { STATS } from '../constants';
import { motion, useMotionValue, useSpring, useTransform, Variants } from 'framer-motion';
import { Scan, BarChart3, Zap, ShieldCheck, Globe, Clock } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

// 3D Card Component
const FeatureCard = ({ feature, index }: { feature: any, index: number }) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-full"
    >
      <div className="h-full bg-white rounded-[2rem] p-8 border-2 border-slate-100 shadow-sm hover:shadow-2xl hover:border-brand-yellow/30 transition-shadow duration-300 flex flex-col items-start transform-style-3d">
         {/* Floating Icon Background */}
        <div 
          style={{ transform: "translateZ(40px)" }}
          className={`w-16 h-16 rounded-2xl mb-6 flex items-center justify-center shadow-inner ${
          index % 3 === 0 ? 'bg-blue-50 text-blue-600' : 
          index % 3 === 1 ? 'bg-purple-50 text-purple-600' : 
          'bg-orange-50 text-orange-600'
        }`}>
          {feature.icon}
        </div>
        
        <h3 style={{ transform: "translateZ(30px)" }} className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
        <p style={{ transform: "translateZ(20px)" }} className="text-slate-500 font-medium leading-relaxed">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
};

export const Features: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    {
      title: t('feat.vision.title'),
      description: t('feat.vision.desc'),
      icon: <Scan className="w-6 h-6 text-primary-700" />
    },
    {
      title: t('feat.realtime.title'),
      description: t('feat.realtime.desc'),
      icon: <Zap className="w-6 h-6 text-primary-700" />
    },
    {
      title: t('feat.analytics.title'),
      description: t('feat.analytics.desc'),
      icon: <BarChart3 className="w-6 h-6 text-primary-700" />
    },
    {
      title: t('feat.criteria.title'),
      description: t('feat.criteria.desc'),
      icon: <ShieldCheck className="w-6 h-6 text-primary-700" />
    },
    {
      title: t('feat.scale.title'),
      description: t('feat.scale.desc'),
      icon: <Globe className="w-6 h-6 text-primary-700" />
    },
    {
      title: t('feat.workload.title'),
      description: t('feat.workload.desc'),
      icon: <Clock className="w-6 h-6 text-primary-700" />
    }
  ];

  const stats = [
    { value: "98%", label: t('stats.gradingTime') },
    { value: "500k+", label: t('stats.papers') },
    { value: "99.9%", label: t('stats.accuracy') },
    { value: "24/7", label: t('stats.uptime') }
  ];

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
  };

  return (
    <section id="features" className="py-24 bg-slate-50 relative overflow-hidden z-10">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
         <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-200 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-blob"></div>
         <div className="absolute top-20 right-10 w-32 h-32 bg-orange-200 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-blob animation-delay-2000"></div>
         <div className="absolute bottom-20 left-1/2 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-black text-brand-yellowDark tracking-widest uppercase mb-3">{t('features.eyebrow')}</h2>
          <p className="text-4xl font-extrabold text-slate-900 tracking-tight mb-6">
            {t('features.title.1')} <br />
            <span className="text-brand-yellowDark">{t('features.title.2')}</span>
          </p>
          <p className="text-lg text-slate-600 font-medium">
            {t('features.subtitle')}
          </p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={item} className="h-full">
              <FeatureCard feature={feature} index={index} />
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 bg-slate-900 rounded-[2.5rem] p-12 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-60 h-60 bg-brand-yellow rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-x divide-slate-800/50 relative z-10">
            {stats.map((stat, index) => (
              <div key={index} className="px-4">
                <div className="text-4xl md:text-5xl font-black text-brand-yellow mb-2">{stat.value}</div>
                <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};