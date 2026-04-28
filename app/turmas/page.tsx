"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Plus, Search, Users, Zap } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { LanguageSelector } from "../../components/LanguageSelector";
import { useLanguage } from "../../LanguageContext";
import { api, getApiErrorMessage } from "../../lib/api/client";
import type { Turma as ClassItem } from "../../lib/api/contract";

export default function TurmasPage() {
  const { t } = useLanguage();
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [search, setSearch] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    subject: "",
    schedule: "",
    students: "25",
  });

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadClasses(search);
    }, 250);

    return () => window.clearTimeout(timeoutId);
  }, [search]);

  const loadClasses = async (query = "") => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.listTurmas({
        query: {
          search: query || undefined,
          page: 1,
          pageSize: 20,
        },
      });

      if (response.status !== 200) {
        setError(getApiErrorMessage(response));
        return;
      }

      setClasses(response.body.items);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Nao foi possivel carregar as turmas.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateClass = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      const response = await api.createTurma({
        body: {
          name: form.name || t("classes.newClassFallback"),
          subject: form.subject || t("classes.newSubjectFallback"),
          schedule: form.schedule || t("classes.newScheduleFallback"),
          students: Number(form.students) || 25,
          room: t("classes.newRoomFallback"),
          nextTopic: t("classes.newTopicFallback"),
        },
      });

      if (response.status !== 201) {
        setError(getApiErrorMessage(response));
        return;
      }

      setClasses((current) => [response.body, ...current]);
      setForm({
        name: "",
        subject: "",
        schedule: "",
        students: "25",
      });
      setIsCreateOpen(false);
    } catch (requestError) {
      setError(
        requestError instanceof Error ? requestError.message : "Nao foi possivel criar a turma.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-white bg-dot-pattern bg-fixed font-body">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-4rem] top-[-5rem] h-72 w-72 rounded-full bg-brand-yellow/20 blur-3xl" />
        <div className="absolute bottom-[-8rem] right-[-2rem] h-80 w-80 rounded-full bg-primary-100/80 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-8 rounded-[2rem] border border-slate-200/80 bg-white/85 px-5 py-4 backdrop-blur-xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border-b-4 border-brand-yellowDark bg-brand-yellow">
                  <Zap className="h-6 w-6 text-slate-900" fill="currentColor" />
                </div>
                <div>
                  <div className="text-xs font-black uppercase tracking-[0.24em] text-slate-400">
                    Evalua AI
                  </div>
                  <div className="text-lg font-extrabold text-slate-900">{t("classes.header")}</div>
                </div>
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <LanguageSelector />

              <Button href="/" variant="outline" className="gap-2 px-5 py-3 text-sm">
                <ArrowLeft className="h-4 w-4" />
                {t("classes.backSite")}
              </Button>
            </div>
          </div>
        </header>

        <section className="rounded-[2.5rem] border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-900/10 sm:p-7">
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <div className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                {t("classes.listBadge")}
              </div>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
                {t("classes.listTitle")}
              </h2>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <Search className="h-4 w-4 text-slate-400" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder={t("classes.search")}
                  className="w-full bg-transparent text-sm font-semibold text-slate-700 outline-none sm:min-w-[240px]"
                />
              </div>

              <button
                onClick={() => setIsCreateOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border-b-4 border-brand-yellowDark bg-brand-yellow px-5 py-3 text-sm font-extrabold text-slate-900 transition hover:brightness-105 active:translate-y-1 active:border-b-0"
              >
                <Plus className="h-4 w-4" />
                {t("classes.create")}
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-4 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {error}
            </div>
          )}

          {isLoading ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-6 text-sm font-bold text-slate-500">
              Carregando turmas...
            </div>
          ) : (
            <div className="grid gap-4 xl:grid-cols-2">
              {classes.map((classItem, index) => (
                <Link key={classItem.id} href={`/turmas/${classItem.id}`} className="group block">
                  <motion.article
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white via-white to-primary-50/50 p-5 shadow-sm transition duration-200 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-slate-900/10"
                  >
                    <div className="mb-5">
                      <div>
                        <div className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                          {classItem.subject}
                        </div>
                        <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">
                          {classItem.name}
                        </h3>
                      </div>
                    </div>

                    <div className="mb-5">
                      <div className="rounded-2xl bg-slate-50 px-4 py-3 sm:max-w-[260px]">
                        <div className="mb-1 flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                          <Users className="h-4 w-4" />
                          {t("classes.card.students")}
                        </div>
                        <div className="text-sm font-bold text-slate-700">{classItem.students}</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <span className="inline-flex items-center gap-2 rounded-2xl border-b-4 border-brand-yellowDark bg-brand-yellow px-4 py-2.5 text-sm font-bold text-slate-900 transition group-hover:brightness-105">
                        {t("classes.card.open")}
                      </span>
                    </div>
                  </motion.article>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>

      <AnimatePresence>
        {isCreateOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCreateOpen(false)}
              className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 32 }}
              className="fixed right-4 top-4 z-50 w-[calc(100%-2rem)] max-w-lg rounded-[2.5rem] border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-900/20 sm:right-6 sm:top-6 sm:p-7"
            >
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-black uppercase tracking-[0.2em] text-brand-yellowDark">
                    {t("classes.form.badge")}
                  </div>
                  <h3 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
                    {t("classes.form.title")}
                  </h3>
                </div>
                <button
                  onClick={() => setIsCreateOpen(false)}
                  className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-200"
                >
                  {t("classes.form.cancel")}
                </button>
              </div>

              <form onSubmit={handleCreateClass} className="space-y-4">
                {[
                  {
                    key: "name",
                    label: t("classes.form.name"),
                    placeholder: "2o Ano C",
                  },
                  {
                    key: "subject",
                    label: t("classes.form.subject"),
                    placeholder: "Geografia",
                  },
                  {
                    key: "schedule",
                    label: t("classes.form.schedule"),
                    placeholder: "Qua, Sex - 14:00",
                  },
                  {
                    key: "students",
                    label: t("classes.form.students"),
                    placeholder: "25",
                  },
                ].map((field) => (
                  <label key={field.key} className="block">
                    <span className="mb-2 block text-sm font-bold text-slate-700">
                      {field.label}
                    </span>
                    <input
                      value={form[field.key as keyof typeof form]}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          [field.key]: event.target.value,
                        }))
                      }
                      placeholder={field.placeholder}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:border-brand-yellow"
                    />
                  </label>
                ))}

                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border-b-4 border-brand-yellowDark bg-brand-yellow px-6 py-4 text-base font-extrabold text-slate-900 transition hover:brightness-105 active:translate-y-1 active:border-b-0"
                >
                  <Plus className="h-5 w-5" />
                  {isSaving ? "Salvando..." : t("classes.form.submit")}
                </button>
              </form>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
