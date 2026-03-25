import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import { Button } from './Button';
import { useLanguage } from '../LanguageContext';

export const Pricing: React.FC = () => {
  const { t } = useLanguage();
  const [isAnnual, setIsAnnual] = useState(false);

  const tiers = [
    {
      name: t('pricing.free.title'),
      price: t('pricing.free.price'),
      period: t('pricing.free.period'),
      desc: t('pricing.free.desc'),
      btn: t('pricing.free.btn'),
      features: [
        t('pricing.free.f1'),
        t('pricing.free.f2'),
        t('pricing.free.f3'),
        t('pricing.free.f4'),
      ],
      highlight: false
    },
    {
      name: t('pricing.pro.title'),
      price: t('pricing.pro.price'),
      period: t('pricing.pro.period'),
      desc: t('pricing.pro.desc'),
      btn: t('pricing.pro.btn'),
      features: [
        t('pricing.pro.f1'),
        t('pricing.pro.f2'),
        t('pricing.pro.f3'),
        t('pricing.pro.f4'),
        t('pricing.pro.f5'),
      ],
      highlight: true
    },
    {
      name: t('pricing.ent.title'),
      price: t('pricing.ent.price'),
      period: t('pricing.ent.period'),
      desc: t('pricing.ent.desc'),
      btn: t('pricing.ent.btn'),
      features: [
        t('pricing.ent.f1'),
        t('pricing.ent.f2'),
        t('pricing.ent.f3'),
        t('pricing.ent.f4'),
        t('pricing.ent.f5'),
      ],
      highlight: false
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-brand-yellow/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-black text-brand-yellowDark tracking-widest uppercase mb-3">{t('pricing.eyebrow')}</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
            {t('pricing.title')} <span className="text-brand-yellowDark">{t('pricing.title.span')}</span>
          </h3>
          <p className="text-lg text-slate-600 font-medium mb-10">
            {t('pricing.subtitle')}
          </p>

          {/* Monthly/Yearly Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm font-bold ${!isAnnual ? 'text-slate-900' : 'text-slate-500'}`}>{t('pricing.monthly')}</span>
            <button 
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-16 h-8 bg-slate-200 rounded-full p-1 transition-colors hover:bg-slate-300 focus:outline-none"
            >
              <motion.div 
                animate={{ x: isAnnual ? 32 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="w-6 h-6 bg-white rounded-full shadow-sm"
              />
            </button>
            <span className={`text-sm font-bold ${isAnnual ? 'text-slate-900' : 'text-slate-500'} flex items-center gap-2`}>
              {t('pricing.yearly')}
              <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full uppercase tracking-wide">{t('pricing.save')}</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-white rounded-[2rem] p-8 border-2 ${tier.highlight ? 'border-brand-yellow shadow-xl scale-105 z-10' : 'border-slate-100 shadow-sm hover:border-slate-200'} flex flex-col h-full`}
            >
              {tier.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-yellow text-slate-900 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1 shadow-sm">
                  <Star className="w-3 h-3 fill-slate-900" /> {t('pricing.pro.badge')}
                </div>
              )}

              <div className="mb-8">
                <h4 className="text-xl font-bold text-slate-900 mb-2">{tier.name}</h4>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-black text-slate-900">{tier.price}</span>
                  {tier.period && <span className="text-slate-500 font-medium">{tier.period}</span>}
                </div>
                <p className="text-slate-500 text-sm leading-relaxed">{tier.desc}</p>
              </div>

              <div className="flex-1 mb-8">
                <ul className="space-y-4">
                  {tier.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm font-bold text-slate-700">
                      <div className={`p-0.5 rounded-full ${tier.highlight ? 'bg-brand-yellow/20 text-brand-yellowDark' : 'bg-slate-100 text-slate-500'}`}>
                        <Check className="w-3 h-3" strokeWidth={4} />
                      </div>
                      <span className="leading-tight">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button 
                variant={tier.highlight ? 'primary' : 'outline'} 
                className="w-full"
                href="#contact"
              >
                {tier.btn}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};