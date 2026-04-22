'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  ChartColumn,
  ClipboardList,
  MapPin,
  PencilLine,
  Plus,
  UserPlus,
  Users,
  Zap,
} from 'lucide-react';
import { Button } from '../../../components/Button';
import { LanguageSelector } from '../../../components/LanguageSelector';
import { useLanguage } from '../../../LanguageContext';
import {
  buildEditableActivities,
  getClassActivities,
  getClassStudents,
  type ActivityStatus,
  type StudentStatus,
} from '../mockData';
import { buildActivityEditorHref, resolveClassFromRoute } from '../routeHelpers';

type DetailTab = 'overview' | 'students' | 'activities';

const copyByLanguage = {
  EN: {
    back: 'Back to classes',
    badge: 'Active class',
    subtitle: 'Track students, activities, and the teaching rhythm in one workspace for this class.',
    metrics: { room: 'Room', students: 'Students', average: 'Average', completion: 'Completion' },
    tabs: { overview: 'Overview', students: 'Students', activities: 'Activities' },
    overview: {
      title: 'Focus of the week',
      helper: 'Use this area to align the class rhythm and keep the group moving with clarity.',
      schedule: 'Class cadence',
      progress: 'Current delivery',
      snapshot: 'Quick class read',
      pulse: 'Class pulse',
      attendance: 'Attendance',
      deliveries: 'Deliveries',
      engagement: 'Engagement',
    },
    students: {
      badge: 'Class map',
      title: 'Students and follow-up',
      subtitle: 'Manage the class roster, adjust records, and keep each student visible in one operational list.',
      add: 'Add student',
      import: 'Import list',
      edit: 'Edit student',
      average: 'Average',
      engagement: 'Engagement',
      columns: { student: 'Student', status: 'Status', average: 'Average', engagement: 'Engagement', actions: 'Actions' },
      status: { leading: 'Highlighted', steady: 'Consistent rhythm', attention: 'Needs attention' },
    },
    activities: {
      badge: 'Activity flow',
      title: 'Class activities',
      subtitle: 'Review the full activity roster and open a dedicated form editor when you need to adjust questions.',
      create: 'Create activity',
      edit: 'Edit activity',
      columns: { activity: 'Activity', status: 'Status', deadline: 'Deadline', questions: 'Questions', actions: 'Actions' },
      status: { live: 'Live', scheduled: 'Scheduled', review: 'In review' },
    },
  },
  PT: {
    back: 'Voltar para turmas',
    badge: 'Turma ativa',
    subtitle: 'Acompanhe alunos, atividades e o ritmo pedagogico em um workspace centralizado para esta turma.',
    metrics: { room: 'Ambiente', students: 'Alunos', average: 'Media', completion: 'Entregas' },
    tabs: { overview: 'Visao geral', students: 'Alunos', activities: 'Atividades' },
    overview: {
      title: 'Foco da semana',
      helper: 'Use esta area para organizar o ritmo da turma e alinhar os proximos movimentos do grupo.',
      schedule: 'Ritmo de aula',
      progress: 'Entrega atual',
      snapshot: 'Leitura rapida da turma',
      pulse: 'Pulso da turma',
      attendance: 'Presenca',
      deliveries: 'Entregas',
      engagement: 'Engajamento',
    },
    students: {
      badge: 'Mapa da turma',
      title: 'Alunos e acompanhamento',
      subtitle: 'Gerencie a lista da turma, ajuste cadastros e acompanhe cada aluno em uma visao mais operacional.',
      add: 'Adicionar aluno',
      import: 'Importar lista',
      edit: 'Editar aluno',
      average: 'Media',
      engagement: 'Engajamento',
      columns: { student: 'Aluno', status: 'Status', average: 'Media', engagement: 'Engajamento', actions: 'Acoes' },
      status: { leading: 'Em destaque', steady: 'Ritmo consistente', attention: 'Pede atencao' },
    },
    activities: {
      badge: 'Fluxo de atividades',
      title: 'Atividades da turma',
      subtitle: 'Veja a lista completa de atividades da turma e abra um editor dedicado sempre que precisar ajustar o formulario.',
      create: 'Criar atividade',
      edit: 'Editar atividade',
      columns: { activity: 'Atividade', status: 'Status', deadline: 'Prazo', questions: 'Questoes', actions: 'Acoes' },
      status: { live: 'Em andamento', scheduled: 'Planejada', review: 'Em revisao' },
    },
  },
  ES: {
    back: 'Volver a clases',
    badge: 'Clase activa',
    subtitle: 'Sigue alumnos, actividades y el ritmo pedagogico en un workspace centralizado para esta clase.',
    metrics: { room: 'Espacio', students: 'Alumnos', average: 'Promedio', completion: 'Entregas' },
    tabs: { overview: 'Vista general', students: 'Alumnos', activities: 'Actividades' },
    overview: {
      title: 'Foco de la semana',
      helper: 'Usa esta area para organizar el ritmo de la clase y alinear los proximos movimientos del grupo.',
      schedule: 'Ritmo de clase',
      progress: 'Entrega actual',
      snapshot: 'Lectura rapida de la clase',
      pulse: 'Pulso de la clase',
      attendance: 'Asistencia',
      deliveries: 'Entregas',
      engagement: 'Compromiso',
    },
    students: {
      badge: 'Mapa de la clase',
      title: 'Alumnos y seguimiento',
      subtitle: 'Gestiona la lista de la clase, ajusta registros y acompana a cada alumno en una vista mas operativa.',
      add: 'Agregar alumno',
      import: 'Importar lista',
      edit: 'Editar alumno',
      average: 'Promedio',
      engagement: 'Compromiso',
      columns: { student: 'Alumno', status: 'Estado', average: 'Promedio', engagement: 'Compromiso', actions: 'Acciones' },
      status: { leading: 'Destacado', steady: 'Ritmo consistente', attention: 'Pide atencion' },
    },
    activities: {
      badge: 'Flujo de actividades',
      title: 'Actividades de la clase',
      subtitle: 'Consulta la lista completa de actividades de la clase y abre un editor dedicado cuando necesites ajustar el formulario.',
      create: 'Crear actividad',
      edit: 'Editar actividad',
      columns: { activity: 'Actividad', status: 'Estado', deadline: 'Plazo', questions: 'Preguntas', actions: 'Acciones' },
      status: { live: 'En curso', scheduled: 'Planificada', review: 'En revision' },
    },
  },
} as const;

export default function TurmaDetalhePage() {
  const { language } = useLanguage();
  const copy = copyByLanguage[language];
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const requestedTab = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState<DetailTab>(
    requestedTab === 'students' || requestedTab === 'activities' ? requestedTab : 'overview'
  );

  useEffect(() => {
    setActiveTab(
      requestedTab === 'students' || requestedTab === 'activities' || requestedTab === 'overview'
        ? requestedTab
        : 'overview'
    );
  }, [requestedTab]);

  const currentClass = useMemo(() => resolveClassFromRoute(params.id, searchParams), [params.id, searchParams]);
  const students = useMemo(() => getClassStudents(currentClass), [currentClass]);
  const activities = useMemo(() => buildEditableActivities(getClassActivities(currentClass)), [currentClass]);
  const createActivityHref = useMemo(
    () => buildActivityEditorHref(`/turmas/${params.id}/atividades/nova`, searchParams),
    [params.id, searchParams]
  );

  const statusLabelByStudent: Record<StudentStatus, string> = {
    leading: copy.students.status.leading,
    steady: copy.students.status.steady,
    attention: copy.students.status.attention,
  };

  const statusLabelByActivity: Record<ActivityStatus, string> = {
    live: copy.activities.status.live,
    scheduled: copy.activities.status.scheduled,
    review: copy.activities.status.review,
  };

  const tabs: Array<{ key: DetailTab; label: string; icon: typeof Users }> = [
    { key: 'overview', label: copy.tabs.overview, icon: ChartColumn },
    { key: 'students', label: copy.tabs.students, icon: Users },
    { key: 'activities', label: copy.tabs.activities, icon: ClipboardList },
  ];

  return (
    <main className="min-h-screen bg-white bg-dot-pattern bg-fixed font-body">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-4rem] top-[-5rem] h-72 w-72 rounded-full bg-brand-yellow/20 blur-3xl" />
        <div className="absolute bottom-[-8rem] right-[-2rem] h-80 w-80 rounded-full bg-primary-100/80 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-8 rounded-[2rem] border border-slate-200/80 bg-white/85 px-5 py-4 backdrop-blur-xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border-b-4 border-brand-yellowDark bg-brand-yellow">
                <Zap className="h-6 w-6 text-slate-900" fill="currentColor" />
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-[0.24em] text-slate-400">Evalua AI</div>
                <div className="text-lg font-extrabold text-slate-900">Class workspace</div>
              </div>
            </Link>

            <div className="flex flex-wrap items-center gap-3">
              <LanguageSelector />
              <Button href="/turmas" variant="outline" className="gap-2 px-5 py-3 text-sm">
                <ArrowLeft className="h-4 w-4" />
                {copy.back}
              </Button>
            </div>
          </div>
        </header>

        <section className="mb-6 rounded-[2.5rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-2xl shadow-slate-900/15 sm:p-7">
          <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
            <div>
              <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-black uppercase tracking-[0.28em] text-brand-yellow">
                {copy.badge}
              </div>
              <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl">{currentClass.name}</h1>
              <p className="mt-3 max-w-2xl text-lg font-semibold text-slate-300">{currentClass.subject}</p>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300">{copy.subtitle}</p>

              <div className="mt-6 flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100">
                  <MapPin className="h-4 w-4 text-brand-yellow" />
                  {currentClass.room}
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100">
                  <CalendarDays className="h-4 w-4 text-brand-yellow" />
                  {currentClass.schedule}
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100">
                  <BookOpen className="h-4 w-4 text-brand-yellow" />
                  {currentClass.nextTopic}
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { label: copy.metrics.room, value: currentClass.room },
                { label: copy.metrics.students, value: String(currentClass.students) },
                { label: copy.metrics.average, value: currentClass.averageScore.toFixed(1) },
                { label: copy.metrics.completion, value: `${currentClass.completionRate}%` },
              ].map((metric) => (
                <div key={metric.label} className="rounded-[1.8rem] border border-white/10 bg-white/5 p-5">
                  <div className="text-xs font-black uppercase tracking-[0.24em] text-slate-400">{metric.label}</div>
                  <div className="mt-3 text-3xl font-extrabold text-white">{metric.value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[2.5rem] border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-900/10 sm:p-7">
          <div className="mb-6 flex flex-wrap gap-3">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;

              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-extrabold transition ${
                    isActive
                      ? 'border-b-4 border-brand-yellowDark bg-brand-yellow text-slate-900'
                      : 'border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {activeTab === 'overview' && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900 p-6 text-white">
                <div className="text-xs font-black uppercase tracking-[0.24em] text-brand-yellow">{copy.overview.title}</div>
                <h2 className="mt-3 text-2xl font-extrabold tracking-tight">{currentClass.nextTopic}</h2>
                <p className="mt-4 max-w-xl text-sm font-semibold leading-relaxed text-slate-300">{copy.overview.helper}</p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[1.6rem] border border-white/10 bg-white/5 p-4">
                    <div className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">{copy.overview.schedule}</div>
                    <div className="mt-2 text-lg font-extrabold text-white">{currentClass.schedule}</div>
                  </div>
                  <div className="rounded-[1.6rem] border border-white/10 bg-white/5 p-4">
                    <div className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">{copy.overview.progress}</div>
                    <div className="mt-2 text-lg font-extrabold text-white">{currentClass.completionRate}%</div>
                  </div>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-5">
                  <div className="text-xs font-black uppercase tracking-[0.24em] text-slate-400">{copy.overview.snapshot}</div>
                  <div className="mt-4 space-y-3">
                    {students.slice(0, 3).map((student) => (
                      <div key={student.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-extrabold text-white">{student.initials}</div>
                          <div>
                            <div className="text-sm font-bold text-slate-900">{student.name}</div>
                            <div className="text-xs font-semibold text-slate-500">{statusLabelByStudent[student.status]}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-extrabold text-slate-900">{student.average.toFixed(1)}</div>
                          <div className="text-xs font-semibold text-slate-500">{copy.students.average}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[2rem] border border-slate-200 bg-white p-5">
                  <div className="text-xs font-black uppercase tracking-[0.24em] text-slate-400">{copy.overview.pulse}</div>
                  <div className="mt-4 space-y-3">
                    {[
                      { label: copy.overview.attendance, value: 96 },
                      { label: copy.overview.deliveries, value: currentClass.completionRate },
                      { label: copy.overview.engagement, value: 89 },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="mb-2 flex items-center justify-between text-sm font-bold text-slate-700">
                          <span>{item.label}</span>
                          <span>{item.value}%</span>
                        </div>
                        <div className="h-3 rounded-full bg-slate-100">
                          <div className="h-3 rounded-full bg-gradient-to-r from-brand-yellow to-brand-yellowDark" style={{ width: `${item.value}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'students' && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl">
                  <div className="text-xs font-black uppercase tracking-[0.24em] text-slate-400">{copy.students.badge}</div>
                  <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">{copy.students.title}</h2>
                  <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-500">{copy.students.subtitle}</p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button className="inline-flex items-center gap-2 rounded-2xl border-b-4 border-brand-yellowDark bg-brand-yellow px-5 py-3 text-sm font-extrabold text-slate-900 transition hover:brightness-105 active:translate-y-1 active:border-b-0">
                    <UserPlus className="h-4 w-4" />
                    {copy.students.add}
                  </button>
                  <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-extrabold text-slate-700 transition hover:bg-slate-50">
                    <ClipboardList className="h-4 w-4" />
                    {copy.students.import}
                  </button>
                </div>
              </div>

              <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
                <div className="hidden grid-cols-[2.2fr_1fr_0.8fr_0.9fr_0.9fr] gap-4 border-b border-slate-200 bg-slate-50 px-5 py-4 lg:grid">
                  <div className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">{copy.students.columns.student}</div>
                  <div className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">{copy.students.columns.status}</div>
                  <div className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">{copy.students.columns.average}</div>
                  <div className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">{copy.students.columns.engagement}</div>
                  <div className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">{copy.students.columns.actions}</div>
                </div>

                {students.map((student, index) => (
                  <div key={student.id} className={`border-slate-200 px-5 py-4 ${index !== students.length - 1 ? 'border-b' : ''}`}>
                    <div className="hidden items-center gap-4 lg:grid lg:grid-cols-[2.2fr_1fr_0.8fr_0.9fr_0.9fr]">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-sm font-extrabold text-white">{student.initials}</div>
                        <div>
                          <div className="text-base font-extrabold text-slate-900">{student.name}</div>
                          <div className="text-sm font-semibold text-slate-500">{student.id}</div>
                        </div>
                      </div>
                      <div className="text-sm font-bold text-slate-700">{statusLabelByStudent[student.status]}</div>
                      <div className="text-sm font-extrabold text-slate-900">{student.average.toFixed(1)}</div>
                      <div className="text-sm font-extrabold text-slate-900">{student.engagement}%</div>
                      <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-extrabold text-slate-700 transition hover:bg-slate-50">
                        <PencilLine className="h-4 w-4" />
                        {copy.students.edit}
                      </button>
                    </div>

                    <div className="space-y-4 lg:hidden">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-sm font-extrabold text-white">{student.initials}</div>
                          <div>
                            <div className="text-base font-extrabold text-slate-900">{student.name}</div>
                            <div className="text-sm font-semibold text-slate-500">{statusLabelByStudent[student.status]}</div>
                          </div>
                        </div>
                        <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-extrabold text-slate-700 transition hover:bg-slate-50">
                          <PencilLine className="h-4 w-4" />
                          {copy.students.edit}
                        </button>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl bg-slate-50 px-4 py-3">
                          <div className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">{copy.students.average}</div>
                          <div className="mt-2 text-lg font-extrabold text-slate-900">{student.average.toFixed(1)}</div>
                        </div>
                        <div className="rounded-2xl bg-slate-50 px-4 py-3">
                          <div className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">{copy.students.engagement}</div>
                          <div className="mt-2 text-lg font-extrabold text-slate-900">{student.engagement}%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'activities' && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl">
                  <div className="text-xs font-black uppercase tracking-[0.24em] text-slate-400">{copy.activities.badge}</div>
                  <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">{copy.activities.title}</h2>
                  <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-500">{copy.activities.subtitle}</p>
                </div>

                <Button href={createActivityHref} className="gap-2 px-5 py-3 text-sm">
                  <Plus className="h-4 w-4" />
                  {copy.activities.create}
                </Button>
              </div>

              <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
                <div className="hidden grid-cols-[2fr_0.9fr_1fr_0.8fr_0.9fr] gap-4 border-b border-slate-200 bg-slate-50 px-5 py-4 lg:grid">
                  <div className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">{copy.activities.columns.activity}</div>
                  <div className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">{copy.activities.columns.status}</div>
                  <div className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">{copy.activities.columns.deadline}</div>
                  <div className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">{copy.activities.columns.questions}</div>
                  <div className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">{copy.activities.columns.actions}</div>
                </div>

                {activities.map((activity, index) => {
                  const editHref = buildActivityEditorHref(`/turmas/${params.id}/atividades/${activity.id}`, searchParams);

                  return (
                    <div key={activity.id} className={`border-slate-200 px-5 py-4 ${index !== activities.length - 1 ? 'border-b' : ''}`}>
                      <div className="hidden items-center gap-4 lg:grid lg:grid-cols-[2fr_0.9fr_1fr_0.8fr_0.9fr]">
                        <div>
                          <div className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">{activity.track}</div>
                          <div className="mt-2 text-base font-extrabold text-slate-900">{activity.title}</div>
                        </div>
                        <div className="text-sm font-bold text-slate-700">{statusLabelByActivity[activity.status]}</div>
                        <div className="text-sm font-semibold text-slate-500">{activity.dueDate}</div>
                        <div className="text-sm font-extrabold text-slate-900">{activity.questions.length}</div>
                        <Link href={editHref} className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-extrabold text-slate-700 transition hover:bg-slate-50">
                          <PencilLine className="h-4 w-4" />
                          {copy.activities.edit}
                        </Link>
                      </div>

                      <div className="space-y-4 lg:hidden">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">{activity.track}</div>
                            <div className="mt-2 text-lg font-extrabold text-slate-900">{activity.title}</div>
                          </div>
                          <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-slate-500">{statusLabelByActivity[activity.status]}</div>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                          <div className="rounded-2xl bg-slate-50 px-4 py-3">
                            <div className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">{copy.activities.columns.deadline}</div>
                            <div className="mt-2 text-sm font-extrabold text-slate-900">{activity.dueDate}</div>
                          </div>
                          <div className="rounded-2xl bg-slate-50 px-4 py-3">
                            <div className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">{copy.activities.columns.questions}</div>
                            <div className="mt-2 text-sm font-extrabold text-slate-900">{activity.questions.length}</div>
                          </div>
                        </div>

                        <Link href={editHref} className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-extrabold text-slate-700 transition hover:bg-slate-50">
                          <PencilLine className="h-4 w-4" />
                          {copy.activities.edit}
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </section>
      </div>
    </main>
  );
}
