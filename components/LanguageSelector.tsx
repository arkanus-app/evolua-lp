'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, ChevronDown, Globe } from 'lucide-react';
import { type Language, useLanguage } from '../LanguageContext';

type LanguageSelectorProps = {
  align?: 'left' | 'right';
  className?: string;
  compact?: boolean;
  fullWidth?: boolean;
};

type LanguageOption = {
  code: Language;
  label: string;
  region: string;
};

const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: 'EN', label: 'English', region: 'US' },
  { code: 'PT', label: 'Português', region: 'BR' },
  { code: 'ES', label: 'Español', region: 'ES' },
];

function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(' ');
}

export function LanguageSelector({
  align = 'right',
  className,
  compact = false,
  fullWidth = false,
}: LanguageSelectorProps) {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentLanguage = useMemo(
    () => LANGUAGE_OPTIONS.find((option) => option.code === language) ?? LANGUAGE_OPTIONS[0],
    [language]
  );

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className={cn('relative', fullWidth && 'w-full', className)}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
        className={cn(
          'inline-flex items-center rounded-2xl border border-slate-200 bg-white/90 text-slate-700 shadow-[0_14px_40px_-28px_rgba(15,23,42,0.35)] transition',
          'hover:border-slate-300 hover:bg-white',
          'focus:outline-none focus:ring-2 focus:ring-brand-yellow/40',
          compact ? 'h-11 gap-2 px-3' : 'h-12 gap-2.5 px-3.5',
          fullWidth ? 'w-full justify-between' : 'justify-between'
        )}
      >
        <span className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
            <Globe className="h-4 w-4" />
          </span>
          <span className="flex items-center gap-2">
            {!compact && (
              <span className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                {currentLanguage.region}
              </span>
            )}
            <span className="text-sm font-extrabold text-slate-900">{currentLanguage.code}</span>
          </span>
        </span>
        <ChevronDown className={cn('h-4 w-4 text-slate-400 transition-transform', isOpen && 'rotate-180')} />
      </button>

      {isOpen && (
        <div
          className={cn(
            'absolute top-full z-50 mt-3 w-56 rounded-[1.6rem] border border-slate-200 bg-white p-2 shadow-[0_28px_90px_-40px_rgba(15,23,42,0.45)]',
            align === 'right' ? 'right-0' : 'left-0',
            fullWidth && 'w-full min-w-[15rem]'
          )}
        >
          <div className="space-y-1">
            {LANGUAGE_OPTIONS.map((option) => {
              const isSelected = option.code === language;

              return (
                <button
                  key={option.code}
                  type="button"
                  onClick={() => {
                    setLanguage(option.code);
                    setIsOpen(false);
                  }}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-[1.15rem] px-4 py-3 text-left transition',
                    isSelected
                      ? 'bg-brand-yellow/12 text-slate-900'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  )}
                >
                  <span className="w-8 text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                    {option.region}
                  </span>
                  <span className="text-base font-extrabold">{option.label}</span>
                  <span className="ml-auto flex items-center">
                    {isSelected ? (
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-yellow text-slate-900">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                    ) : (
                      <span className="h-2 w-2 rounded-full bg-slate-200" />
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
