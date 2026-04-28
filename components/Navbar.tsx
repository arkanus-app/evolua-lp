import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { useLanguage } from "../LanguageContext";
import { Button } from "./Button";
import { LanguageSelector } from "./LanguageSelector";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: t("nav.features"), href: "#features" },
    { label: t("nav.howItWorks"), href: "#how-it-works" },
    { label: t("nav.dashboard"), href: "#dashboard" },
    { label: t("nav.pricing"), href: "#pricing" },
    { label: t("nav.enterprise"), href: "#enterprise" },
  ];

  return (
    <>
      <nav
        className={`fixed z-50 w-full border-b transition-all duration-300 ${
          isScrolled || isMobileMenuOpen
            ? "border-slate-200/50 bg-white/90 py-3 backdrop-blur-xl"
            : "border-transparent bg-transparent py-5"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div
              className="flex flex-shrink-0 cursor-pointer items-center gap-3"
              onClick={() => window.scrollTo(0, 0)}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border-b-4 border-brand-yellowDark bg-brand-yellow transition-transform hover:rotate-3">
                <Zap className="h-6 w-6 text-slate-900" fill="currentColor" />
              </div>
              <span className="font-sans text-2xl font-extrabold tracking-tight text-slate-900">
                Evalua AI
              </span>
            </div>

            <div className="hidden items-center space-x-6 md:flex lg:space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="group relative text-sm font-bold text-slate-600 transition-colors hover:text-slate-900"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-1 w-0 rounded-full bg-brand-yellow opacity-80 transition-all duration-300 group-hover:w-full" />
                </a>
              ))}

              <LanguageSelector />

              <Button variant="primary" className="px-5 py-2 text-sm" href="/login">
                {t("nav.getStarted")}
              </Button>
            </div>

            <div className="flex items-center gap-4 md:hidden">
              <LanguageSelector compact className="max-w-[5.5rem]" />

              <button
                onClick={() => setIsMobileMenuOpen((current) => !current)}
                className="rounded-xl bg-slate-50 p-2 text-slate-600 hover:text-slate-900"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 origin-left bg-brand-yellow"
          style={{ scaleX }}
        />

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute left-0 top-full w-full overflow-hidden border-b-4 border-slate-100 bg-white shadow-xl md:hidden"
            >
              <div className="space-y-2 px-4 pb-8 pt-4">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block rounded-2xl px-4 py-4 text-lg font-bold text-slate-600 transition-colors hover:bg-primary-50 hover:text-slate-900"
                  >
                    {link.label}
                  </a>
                ))}

                <div className="mt-4 border-t border-slate-100 px-2 pt-4">
                  <div className="mb-3 pl-2 text-xs font-extrabold uppercase tracking-widest text-slate-400">
                    Language
                  </div>
                  <LanguageSelector fullWidth align="left" />
                </div>

                <div className="px-2 pt-2">
                  <Button
                    className="w-full justify-center"
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t("nav.getStarted")}
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
