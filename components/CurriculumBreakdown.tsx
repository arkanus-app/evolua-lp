import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Calculator,
  Check,
  ChevronRight,
  Globe2,
  GripVertical,
  Layers,
  Microscope,
  Settings2,
  Wand2,
} from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { useLanguage } from "../LanguageContext";
import { api } from "../lib/api/client";

type Topic = {
  id: string;
  labelKey: string;
  efficiency: number;
};

type Discipline = {
  id: string;
  labelKey: string;
  icon: any;
  topics: Topic[];
};

type Area = {
  id: string;
  labelKey: string;
  color: string;
  disciplines: Discipline[];
};

export const CurriculumBreakdown: React.FC = () => {
  const { t } = useLanguage();
  const [selectedAreaId, setSelectedAreaId] = useState<string>("humanities");
  const [selectedDisciplineId, setSelectedDisciplineId] = useState<string>("history");
  const [data, setData] = useState<Area[]>([]);

  // NEW: Edit Mode State
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const iconByName = {
      book: BookOpen,
      globe: Globe2,
      calculator: Calculator,
      microscope: Microscope,
    };

    const loadCurriculum = async () => {
      const response = await api.getCurriculoAreas({
        query: {},
      });

      if (response.status === 200) {
        setData(
          response.body.items.map((area) => ({
            id: area.id ?? "",
            labelKey: area.labelKey ?? "",
            color: area.color ?? "bg-slate-500",
            disciplines: area.disciplines.map((discipline) => ({
              id: discipline.id ?? "",
              labelKey: discipline.labelKey ?? "",
              icon: iconByName[discipline.icon],
              topics: discipline.topics.map((topic) => ({
                id: topic.id ?? "",
                labelKey: topic.labelKey ?? "",
                efficiency: topic.efficiency ?? 0,
              })),
            })),
          })),
        );
      }
    };

    void loadCurriculum();
  }, []);

  // Derive selection
  const selectedArea = data.find((a) => a.id === selectedAreaId) || data[0];
  const selectedDiscipline =
    selectedArea?.disciplines.find((d) => d.id === selectedDisciplineId) ||
    selectedArea?.disciplines[0];

  // Auto-select first discipline when area changes if current discipline not found in new area
  useEffect(() => {
    if (!selectedArea) return;
    const disciplineExists = selectedArea.disciplines.find((d) => d.id === selectedDisciplineId);
    if (!disciplineExists) {
      setSelectedDisciplineId(selectedArea.disciplines[0].id);
    }
  }, [selectedArea, selectedAreaId, selectedDisciplineId]);

  if (!selectedArea || !selectedDiscipline) {
    return (
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 text-sm font-bold text-slate-500">
          Carregando curriculo...
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-slate-50 border-t border-slate-100 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 right-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute right-0 top-20 w-96 h-96 bg-brand-yellow/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-brand-yellowDark font-bold tracking-widest uppercase text-sm mb-3">
            {t("curr.eyebrow")}
          </h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">
            {t("curr.title")}
          </h3>
          <p className="text-lg text-slate-600 font-medium leading-relaxed mb-6">
            {t("curr.subtitle")}
          </p>

          {/* Edit Mode Toggle */}
          <div className="flex justify-center">
            <button
              onClick={() => setIsEditMode(!isEditMode)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm ${isEditMode ? "bg-slate-900 text-white shadow-lg scale-105" : "bg-white text-slate-500 border border-slate-200 hover:border-brand-yellow"}`}
            >
              {isEditMode ? <Check className="w-3 h-3" /> : <Settings2 className="w-3 h-3" />}
              {isEditMode ? t("curr.btn.done") : t("curr.btn.edit")}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch min-h-[400px]">
          {/* COL 1: AREAS */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">
              {t("curr.col1")}
            </div>
            <LayoutGroup>
              {data.map((area) => (
                <motion.button
                  layout
                  key={area.id}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedAreaId(area.id)}
                  className={`p-6 rounded-2xl text-left border-2 transition-all relative overflow-visible group ${
                    selectedAreaId === area.id
                      ? "bg-white border-brand-yellow shadow-lg z-10"
                      : "bg-white border-transparent shadow-sm hover:border-slate-200 opacity-70 hover:opacity-100"
                  }`}
                >
                  <div className={`w-1.5 h-full absolute left-0 top-0 ${area.color}`} />
                  <span
                    className={`text-lg font-black ${selectedAreaId === area.id ? "text-slate-900" : "text-slate-500"}`}
                  >
                    {t(area.labelKey)}
                  </span>
                  {selectedAreaId === area.id && (
                    <motion.div
                      layoutId="activeGlow"
                      className="absolute inset-0 bg-brand-yellow/5 pointer-events-none rounded-2xl"
                    />
                  )}

                  {/* Customizable Badge */}
                  <AnimatePresence>
                    {selectedAreaId === area.id && (
                      <motion.div
                        initial={{ opacity: 0, x: -10, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="absolute -right-2 -top-3 bg-slate-900 text-white text-[9px] font-bold px-2 py-1 rounded-full shadow-lg z-20 flex items-center gap-1 border-2 border-slate-50"
                      >
                        <Wand2 className="w-2.5 h-2.5 text-brand-yellow" />
                        {t("curr.badge.custom")}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              ))}
            </LayoutGroup>
          </div>

          {/* COL 2: DISCIPLINES */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">
              {t("curr.col2")}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedAreaId}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-3"
              >
                {selectedArea.disciplines.map((disc) => (
                  <motion.button
                    layout
                    key={disc.id}
                    onClick={() => setSelectedDisciplineId(disc.id)}
                    className={`p-4 rounded-xl flex items-center gap-4 transition-all border-l-4 ${
                      selectedDisciplineId === disc.id
                        ? "bg-white shadow-md border-l-slate-800 text-slate-900"
                        : "bg-slate-100/50 hover:bg-white text-slate-500 border-l-transparent"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg ${selectedDisciplineId === disc.id ? "bg-slate-100" : "bg-white"}`}
                    >
                      <disc.icon className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-sm flex-1 text-left">{t(disc.labelKey)}</span>
                    {selectedDisciplineId === disc.id && (
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    )}
                  </motion.button>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* COL 3: TOPICS (DATA) */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">
              {t("curr.col3")}
            </div>
            <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl p-6 h-full flex flex-col relative overflow-hidden">
              {/* Visual indicator for edit mode */}
              <AnimatePresence>
                {isEditMode && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 border-2 border-brand-yellow rounded-[2rem] pointer-events-none z-0 bg-brand-yellow/5"
                  />
                )}
              </AnimatePresence>

              <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100 relative z-10">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-brand-yellow" />
                  <span className="font-bold text-slate-700 text-sm">
                    {t(selectedDiscipline.labelKey)}
                  </span>
                </div>
                <div className="text-xs font-bold text-slate-400">
                  {t("curr.metric.efficiency")}
                </div>
              </div>

              <div className="flex-1 space-y-6 relative z-10">
                <AnimatePresence mode="popLayout">
                  {selectedDiscipline.topics.map((topic, i) => (
                    <motion.div
                      layout
                      key={topic.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={
                        isEditMode
                          ? {
                              opacity: 1,
                              y: 0,
                              x: i % 2 === 0 ? 1 : -1,
                              rotate: i % 2 === 0 ? 0.5 : -0.5,
                            }
                          : { opacity: 1, y: 0, x: 0, rotate: 0 }
                      }
                      transition={
                        isEditMode
                          ? {
                              x: {
                                repeat: Infinity,
                                repeatType: "reverse",
                                duration: 0.2,
                              },
                              rotate: {
                                repeat: Infinity,
                                repeatType: "reverse",
                                duration: 0.25,
                              },
                            }
                          : { duration: 0.3, delay: i * 0.1 }
                      }
                      className={`relative p-3 rounded-xl border transition-all ${isEditMode ? "cursor-grab active:cursor-grabbing border-slate-200 bg-slate-50" : "border-transparent hover:bg-slate-50 hover:border-slate-100 group"}`}
                    >
                      {/* Drag Handle in Edit Mode */}
                      {isEditMode && (
                        <div className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-300">
                          <GripVertical className="w-4 h-4" />
                        </div>
                      )}

                      <div className={isEditMode ? "pl-6 pointer-events-none" : ""}>
                        <div className="flex justify-between text-sm font-bold text-slate-800 mb-2">
                          <span>{t(topic.labelKey)}</span>
                          <span
                            className={topic.efficiency < 70 ? "text-red-500" : "text-green-600"}
                          >
                            {topic.efficiency}%
                          </span>
                        </div>
                        <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${topic.efficiency}%` }}
                            transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
                            className={`h-full rounded-full ${
                              topic.efficiency > 85
                                ? "bg-green-500"
                                : topic.efficiency > 70
                                  ? "bg-brand-yellow"
                                  : "bg-red-400"
                            }`}
                          />
                        </div>
                      </div>

                      {/* Drill Down Reveal */}
                      {!isEditMode && (
                        <div className="max-h-0 overflow-hidden group-hover:max-h-10 transition-all duration-300 ease-in-out">
                          <div className="pt-3 flex items-center justify-end">
                            <button className="text-[10px] font-bold text-brand-yellowDark flex items-center gap-1 hover:underline">
                              {t("curr.btn.drill")} <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 text-center relative z-10">
                <div className="text-xs text-slate-400 mb-1">{t("curr.metric.mastery")}</div>
                <div className="text-2xl font-black text-slate-900">
                  {Math.round(
                    selectedDiscipline.topics.reduce((acc, curr) => acc + curr.efficiency, 0) /
                      selectedDiscipline.topics.length,
                  )}
                  %
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
