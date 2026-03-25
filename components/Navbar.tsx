import React, { useState, useEffect } from 'react';
import { Menu, X, Zap, Globe, ChevronDown } from 'lucide-react';
import { NAV_LINKS } from '../constants';
import { Button } from './Button';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { useLanguage } from '../LanguageContext';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  
  // Scroll Progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  // Language State
  const [isLangOpen, setIsLangOpen] = useState(false);

  const languages = [
    { code: 'EN', label: 'English', flag: '🇺🇸' },
    { code: 'PT', label: 'Português', flag: '🇧🇷' },
    { code: 'ES', label: 'Español', flag: '🇪🇸' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setIsLangOpen(false);
    if (isLangOpen) {
      window.addEventListener('click', handleClickOutside);
    }
    return () => window.removeEventListener('click', handleClickOutside);
  }, [isLangOpen]);

  // Get Translated Nav Links
  const getTranslatedLinks = () => [
    { label: t('nav.features'), href: '#features' },
    { label: t('nav.howItWorks'), href: '#how-it-works' },
    { label: t('nav.dashboard'), href: '#dashboard' },
    { label: t('nav.pricing'), href: '#pricing' },
    { label: t('nav.enterprise'), href: '#enterprise' },
  ];

  const navLinks = getTranslatedLinks();

  return (
    <>
      <nav 
        className={`fixed w-full z-50 transition-all duration-300 border-b ${
          isScrolled || isMobileMenuOpen 
            ? 'bg-white/90 backdrop-blur-xl border-slate-200/50 py-3' 
            : 'bg-transparent border-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
              <div className="w-10 h-10 bg-brand-yellow rounded-xl border-b-4 border-brand-yellowDark flex items-center justify-center transform transition-transform hover:rotate-3">
                <Zap className="w-6 h-6 text-slate-900" fill="currentColor" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-slate-900 font-sans">Evalua AI</span>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex space-x-6 lg:space-x-8 items-center">
              {navLinks.map((link) => (
                <a 
                  key={link.label} 
                  href={link.href} 
                  className="text-slate-600 hover:text-slate-900 font-bold text-sm transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-1 bg-brand-yellow rounded-full transition-all duration-300 group-hover:w-full opacity-80"></span>
                </a>
              ))}
              
              {/* Language Selector Desktop */}
              <div className="relative" onClick={(e) => e.stopPropagation()}>
                <button 
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 font-bold text-xs lg:text-sm transition-colors bg-slate-50 px-3 py-2 rounded-xl hover:bg-slate-100"
                >
                  <Globe className="w-4 h-4" />
                  <span>{language}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isLangOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden p-1.5 origin-top-right"
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code as any);
                            setIsLangOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 text-sm font-bold rounded-xl flex items-center gap-3 transition-colors ${
                            language === lang.code 
                              ? 'bg-brand-yellow/10 text-slate-900' 
                              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                          }`}
                        >
                          <span className="text-lg leading-none">{lang.flag}</span>
                          {lang.label}
                          {language === lang.code && (
                            <div className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-yellow" />
                          )}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Button variant="primary" className="py-2 px-5 text-sm" href="#contact">
                {t('nav.getStarted')}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              {/* Mobile Lang Toggle (Simple) */}
              <button
                onClick={() => {
                  const currentIndex = languages.findIndex(l => l.code === language);
                  const nextIndex = (currentIndex + 1) % languages.length;
                  setLanguage(languages[nextIndex].code as any);
                }}
                className="flex items-center gap-1 text-slate-600 font-bold text-sm bg-slate-50 px-2 py-2 rounded-lg"
              >
                  <Globe className="w-4 h-4" />
                  {language}
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-slate-600 hover:text-slate-900 p-2 bg-slate-50 rounded-xl"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-brand-yellow origin-left"
          style={{ scaleX }}
        />

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden absolute top-full left-0 w-full bg-white border-b-4 border-slate-100 shadow-xl overflow-hidden"
            >
              <div className="px-4 pt-4 pb-8 space-y-2">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-4 rounded-2xl text-lg font-bold text-slate-600 hover:text-slate-900 hover:bg-primary-50 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                
                {/* Mobile Language Selection Grid */}
                <div className="mt-4 pt-4 border-t border-slate-100 px-2">
                  <div className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-3 pl-2">Language</div>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => setLanguage(lang.code as any)}
                        className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${
                          language === lang.code 
                            ? 'bg-brand-yellow/10 border-brand-yellow text-slate-900' 
                            : 'bg-white border-slate-100 text-slate-500 hover:bg-slate-50'
                        }`}
                      >
                        <span className="text-2xl mb-1 grayscale-0">{lang.flag}</span>
                        <span className="text-xs font-bold">{lang.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 px-2">
                  <Button className="w-full justify-center" href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
                    {t('nav.getStarted')}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};