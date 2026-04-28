import { motion } from "framer-motion";
import { BookOpen, Building2, GraduationCap, Library, School } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import type { z } from "zod";
import { useLanguage } from "../LanguageContext";
import { api } from "../lib/api/client";
import type { trustedInstitutionSchema } from "../lib/api/contract";

type Institution = z.infer<typeof trustedInstitutionSchema>;

function getInstitutionIcon(kind: Institution["kind"]) {
  if (kind === "university") return <GraduationCap className="w-6 h-6" />;
  if (kind === "school") return <School className="w-6 h-6" />;
  if (kind === "academy") return <BookOpen className="w-6 h-6" />;
  if (kind === "institute") return <Library className="w-6 h-6" />;
  return <Building2 className="w-6 h-6" />;
}

const ScrollingRow = ({
  items,
  direction = "left",
  speed = 20,
}: {
  items: Institution[];
  direction?: "left" | "right";
  speed?: number;
}) => {
  return (
    <div className="flex w-full relative overflow-hidden">
      <motion.div
        initial={{ x: direction === "left" ? 0 : "-50%" }}
        animate={{ x: direction === "left" ? "-50%" : 0 }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
        }}
        className="flex gap-6 pr-6 will-change-transform"
      >
        {items.map((item, idx) => (
          <div
            key={`${item.name}-${idx}`}
            className="flex-shrink-0 bg-slate-50 border border-slate-100 px-6 py-4 rounded-2xl flex items-center gap-3 shadow-sm hover:shadow-md hover:border-brand-yellow/30 transition-all min-w-[240px]"
          >
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-400 shadow-inner border border-slate-50">
              {getInstitutionIcon(item.kind)}
            </div>
            <span className="font-bold text-slate-600 text-sm whitespace-nowrap">{item.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export const TrustedBy: React.FC = () => {
  const { t, language } = useLanguage();
  const [institutions, setInstitutions] = useState<Institution[]>([]);

  useEffect(() => {
    const loadTrustedBy = async () => {
      const response = await api.getPublicLanding({
        query: { locale: language },
      });

      if (response.status === 200) {
        setInstitutions(response.body.trustedBy);
      }
    };

    void loadTrustedBy();
  }, [language]);

  const row1 = [...institutions, ...institutions];
  const row2 = [...institutions].reverse().concat([...institutions].reverse());

  return (
    <section className="py-20 bg-white border-b border-slate-100 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-3">
          {t("trusted.title")}
        </h4>
        <p className="text-xl font-bold text-slate-800 max-w-xl mx-auto leading-relaxed">
          {t("trusted.subtitle")}
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
