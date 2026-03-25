import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { DashboardPreview } from './components/DashboardPreview';
import { HowItWorks } from './components/HowItWorks';
import { EssayGrading } from './components/EssayGrading';
import { PaperToDigital } from './components/PaperToDigital';
import { ClassAnalytics } from './components/ClassAnalytics';
import { ParentPortal } from './components/ParentPortal';
import { Enterprise } from './components/Enterprise';
import { Pricing } from './components/Pricing';
import { TrustedBy } from './components/TrustedBy';
import { CurriculumBreakdown } from './components/CurriculumBreakdown';
import { Footer } from './components/Footer';
import { Button } from './components/Button';
import { motion } from 'framer-motion';
import { LanguageProvider, useLanguage } from './LanguageContext';

const MainContent: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-white font-body selection:bg-brand-yellow selection:text-slate-900 bg-dot-pattern bg-fixed">
      <Navbar />
      
      <main className="overflow-x-hidden">
        <Hero />
        <TrustedBy />
        <Features />
        <PaperToDigital />
        <HowItWorks />
        <EssayGrading />
        <ClassAnalytics />
        <CurriculumBreakdown />
        <ParentPortal />
        <DashboardPreview />
        <Pricing />
        <Enterprise />
        
        {/* CTA Section */}
        <section id="contact" className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-brand-yellow z-0" />
          {/* Patterns */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] z-0"></div>
          
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                {t('cta.title')}
              </h2>
              <p className="text-slate-900/80 text-xl mb-10 max-w-2xl mx-auto font-medium">
                {t('cta.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button className="bg-slate-900 text-white border-b-4 border-slate-700 hover:bg-slate-800 hover:border-slate-900 active:bg-slate-900 text-lg px-8">
                  {t('cta.btn.start')}
                </Button>
                <Button className="bg-white text-slate-900 border-b-4 border-slate-300 hover:bg-slate-50 text-lg px-8">
                  {t('cta.btn.sales')}
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <MainContent />
    </LanguageProvider>
  );
};

export default App;