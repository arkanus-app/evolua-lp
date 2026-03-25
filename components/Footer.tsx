import React from 'react';
import { Zap } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary-400 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-black" fill="currentColor" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">Evolua</span>
            </div>
            <p className="text-slate-400 max-w-sm">
              {t('footer.desc')}
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">{t('footer.platform')}</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-primary-400 transition-colors">{t('nav.features')}</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">{t('nav.howItWorks')}</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">{t('nav.enterprise')}</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">{t('footer.company')}</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-primary-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-slate-500">{t('footer.rights')}</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {/* Social placeholders */}
            <div className="w-5 h-5 bg-slate-800 rounded-full hover:bg-primary-400 transition-colors cursor-pointer"></div>
            <div className="w-5 h-5 bg-slate-800 rounded-full hover:bg-primary-400 transition-colors cursor-pointer"></div>
            <div className="w-5 h-5 bg-slate-800 rounded-full hover:bg-primary-400 transition-colors cursor-pointer"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};