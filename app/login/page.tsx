"use client";

import { ArrowRight, LockKeyhole, Mail, Zap } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../../components/Button";
import { LanguageSelector } from "../../components/LanguageSelector";
import { useLanguage } from "../../LanguageContext";
import { api, getApiErrorMessage } from "../../lib/api/client";

export default function LoginPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await api.login({
        body: {
          email,
          password,
          remember,
        },
      });

      if (response.status !== 200) {
        setError(getApiErrorMessage(response));
        return;
      }

      router.push(response.body.redirectUrl);
    } catch (requestError) {
      setError(
        requestError instanceof Error ? requestError.message : "Nao foi possivel entrar agora.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white font-body bg-dot-pattern bg-fixed">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 right-[-8rem] h-80 w-80 rounded-full bg-brand-yellow/20 blur-3xl" />
        <div className="absolute bottom-[-6rem] left-[-4rem] h-72 w-72 rounded-full bg-primary-100/70 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-10 flex items-center justify-between rounded-[2rem] border border-slate-200/80 bg-white/85 px-5 py-4 backdrop-blur-xl">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border-b-4 border-brand-yellowDark bg-brand-yellow">
              <Zap className="h-6 w-6 text-slate-900" fill="currentColor" />
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-[0.24em] text-slate-400">
                Evalua AI
              </div>
              <div className="text-lg font-extrabold text-slate-900">{t("auth.header")}</div>
            </div>
          </Link>

          <LanguageSelector />
        </header>

        <div className="flex flex-1 items-center justify-center">
          <section className="w-full max-w-xl rounded-[2.5rem] border border-slate-200 bg-white p-7 shadow-2xl shadow-slate-900/10 sm:p-9">
            <div className="mb-8">
              <div className="mb-3 text-xs font-black uppercase tracking-[0.24em] text-brand-yellowDark">
                {t("auth.form.badge")}
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
                {t("auth.form.title")}
              </h2>
              <p className="mt-3 text-sm font-medium leading-relaxed text-slate-500">
                {t("auth.form.subtitle")}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm font-bold text-slate-700">
                  {t("auth.email")}
                </span>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-brand-yellow">
                  <Mail className="h-4 w-4 text-slate-400" />
                  <input
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="w-full bg-transparent text-sm font-semibold text-slate-800 outline-none"
                  />
                </div>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-bold text-slate-700">
                  {t("auth.password")}
                </span>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-brand-yellow">
                  <LockKeyhole className="h-4 w-4 text-slate-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="w-full bg-transparent text-sm font-semibold text-slate-800 outline-none"
                  />
                </div>
              </label>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 font-semibold text-slate-500">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(event) => setRemember(event.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 accent-brand-yellow"
                  />
                  {t("auth.remember")}
                </label>
                <span className="font-bold text-slate-900">{t("auth.forgot")}</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border-b-4 border-brand-yellowDark bg-brand-yellow px-6 py-4 text-base font-extrabold text-slate-900 transition hover:brightness-105 active:translate-y-1 active:border-b-0"
              >
                {isSubmitting ? "Entrando..." : t("auth.submit")}
                <ArrowRight className="h-5 w-5" />
              </button>
            </form>

            {error && (
              <div className="mt-4 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                {error}
              </div>
            )}

            <div className="mt-6 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-4">
              <div className="text-xs font-black uppercase tracking-[0.24em] text-slate-400">
                {t("auth.demoLabel")}
              </div>
              <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-600">
                {t("auth.demoHint")}
              </p>
            </div>

            <div className="mt-6">
              <Button href="/" variant="outline" className="w-full justify-center">
                {t("auth.back")}
              </Button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
