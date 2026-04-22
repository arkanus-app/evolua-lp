'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  MapPin,
  Plus,
  Save,
  Zap,
} from 'lucide-react';
import { Button } from '../../components/Button';
import { LanguageSelector } from '../../components/LanguageSelector';
import { useLanguage } from '../../LanguageContext';
import {
  type ActivityQuestion,
  type ActivityQuestionType,
  type ActivityStatus,
} from './mockData';
import { buildActivityEditorHref, resolveClassFromRoute, resolveEditableActivity } from './routeHelpers';

const activityEditorCopy = {
  EN: {
    back: 'Back to activities',
    workspace: 'Class workspace',
    badge: 'Form builder',
    createTitle: 'Create class activity',
    editTitle: 'Edit class activity',
    subtitle: 'Adjust the form structure, refine each question, and keep the activity ready for the class flow.',
    draft: 'Draft mode',
    room: 'Room',
    schedule: 'Schedule',
    editor: 'Form editor',
    createLabel: 'New activity',
    editLabel: 'Editing activity',
    editorHint: 'This screen centralizes the activity details and every question block in one focused flow.',
    formTitle: 'Activity title',
    formTrack: 'Track',
    formDue: 'Deadline',
    formStatus: 'Status',
    questions: 'Questions',
    blockCount: 'blocks',
    addQuestion: 'Add question',
    questionLabel: 'Question',
    questionType: 'Field type',
    questionHelper: 'Support text',
    save: 'Save draft',
    type: {
      multipleChoice: 'Multiple choice',
      shortAnswer: 'Short answer',
      checkbox: 'Checkboxes',
    },
    status: {
      live: 'Live',
      scheduled: 'Scheduled',
      review: 'In review',
    },
  },
  PT: {
    back: 'Voltar para atividades',
    workspace: 'Class workspace',
    badge: 'Construtor de formulario',
    createTitle: 'Criar atividade da turma',
    editTitle: 'Editar atividade da turma',
    subtitle: 'Ajuste a estrutura do formulario, refine cada questao e deixe a atividade pronta para o fluxo da turma.',
    draft: 'Modo rascunho',
    room: 'Ambiente',
    schedule: 'Ritmo',
    editor: 'Editor de formulario',
    createLabel: 'Nova atividade',
    editLabel: 'Editando atividade',
    editorHint: 'Esta tela concentra os dados da atividade e todos os blocos de questao em um fluxo mais focado.',
    formTitle: 'Titulo da atividade',
    formTrack: 'Trilha',
    formDue: 'Prazo',
    formStatus: 'Status',
    questions: 'Questoes',
    blockCount: 'blocos',
    addQuestion: 'Adicionar questao',
    questionLabel: 'Questao',
    questionType: 'Tipo de campo',
    questionHelper: 'Texto de apoio',
    save: 'Salvar rascunho',
    type: {
      multipleChoice: 'Multipla escolha',
      shortAnswer: 'Resposta curta',
      checkbox: 'Caixas de selecao',
    },
    status: {
      live: 'Em andamento',
      scheduled: 'Planejada',
      review: 'Em revisao',
    },
  },
  ES: {
    back: 'Volver a actividades',
    workspace: 'Class workspace',
    badge: 'Constructor de formulario',
    createTitle: 'Crear actividad de la clase',
    editTitle: 'Editar actividad de la clase',
    subtitle: 'Ajusta la estructura del formulario, refina cada pregunta y deja la actividad lista para el flujo de la clase.',
    draft: 'Modo borrador',
    room: 'Espacio',
    schedule: 'Ritmo',
    editor: 'Editor de formulario',
    createLabel: 'Nueva actividad',
    editLabel: 'Editando actividad',
    editorHint: 'Esta pantalla concentra los datos de la actividad y todos los bloques de preguntas en un flujo mas enfocado.',
    formTitle: 'Titulo de la actividad',
    formTrack: 'Linea',
    formDue: 'Plazo',
    formStatus: 'Estado',
    questions: 'Preguntas',
    blockCount: 'bloques',
    addQuestion: 'Agregar pregunta',
    questionLabel: 'Pregunta',
    questionType: 'Tipo de campo',
    questionHelper: 'Texto de apoyo',
    save: 'Guardar borrador',
    type: {
      multipleChoice: 'Opcion multiple',
      shortAnswer: 'Respuesta corta',
      checkbox: 'Casillas',
    },
    status: {
      live: 'En curso',
      scheduled: 'Planificada',
      review: 'En revision',
    },
  },
} as const;

type ActivityEditorScreenProps = {
  classId: string;
  mode: 'create' | 'edit';
  activityId?: string;
};

export function ActivityEditorScreen({ classId, mode, activityId }: ActivityEditorScreenProps) {
  const { language } = useLanguage();
  const copy = activityEditorCopy[language];
  const searchParams = useSearchParams();

  const currentClass = useMemo(
    () => resolveClassFromRoute(classId, searchParams),
    [classId, searchParams]
  );

  const initialActivity = useMemo(
    () => resolveEditableActivity(currentClass, activityId, mode),
    [activityId, currentClass, mode]
  );

  const [activity, setActivity] = useState(initialActivity);

  const backHref = useMemo(
    () =>
      buildActivityEditorHref(`/turmas/${classId}`, searchParams, {
        tab: 'activities',
      }),
    [classId, searchParams]
  );

  const statusLabelByActivity: Record<ActivityStatus, string> = {
    live: copy.status.live,
    scheduled: copy.status.scheduled,
    review: copy.status.review,
  };

  const questionTypeLabel: Record<ActivityQuestionType, string> = {
    multipleChoice: copy.type.multipleChoice,
    shortAnswer: copy.type.shortAnswer,
    checkbox: copy.type.checkbox,
  };

  const handleQuestionChange = (
    questionId: string,
    field: keyof ActivityQuestion,
    value: string | ActivityQuestionType
  ) => {
    setActivity((current) => ({
      ...current,
      questions: current.questions.map((question) =>
        question.id === questionId ? { ...question, [field]: value } : question
      ),
    }));
  };

  const handleAddQuestion = () => {
    setActivity((current) => ({
      ...current,
      questions: [
        ...current.questions,
        {
          id: `${current.id}-question-${current.questions.length + 1}`,
          title: `Questao ${current.questions.length + 1}`,
          type: 'shortAnswer',
          helperText: 'Novo campo para orientar a resposta.',
        },
      ],
    }));
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
                  <div className="text-xs font-black uppercase tracking-[0.24em] text-slate-400">Evalua AI</div>
                  <div className="text-lg font-extrabold text-slate-900">{copy.workspace}</div>
                </div>
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <LanguageSelector />
              <Button href={backHref} variant="outline" className="gap-2 px-5 py-3 text-sm">
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
              <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl">
                {mode === 'create' ? copy.createTitle : copy.editTitle}
              </h1>
              <p className="mt-3 max-w-2xl text-lg font-semibold text-slate-300">{currentClass.name}</p>
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
                  {currentClass.subject}
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { label: copy.room, value: currentClass.room },
                { label: copy.schedule, value: currentClass.schedule },
                { label: copy.editor, value: mode === 'create' ? copy.createLabel : copy.editLabel },
                { label: copy.formStatus, value: statusLabelByActivity[activity.status] },
              ].map((metric) => (
                <div key={metric.label} className="rounded-[1.8rem] border border-white/10 bg-white/5 p-5">
                  <div className="text-xs font-black uppercase tracking-[0.24em] text-slate-400">{metric.label}</div>
                  <div className="mt-3 text-2xl font-extrabold text-white">{metric.value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[2.5rem] border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-900/10 sm:p-7">
          <div className="space-y-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <div className="text-xs font-black uppercase tracking-[0.24em] text-slate-400">{copy.editor}</div>
                <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">{activity.title}</h2>
                <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-500">{copy.editorHint}</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-slate-500">
                  {copy.draft}
                </div>
                <button className="inline-flex items-center gap-2 rounded-2xl border-b-4 border-brand-yellowDark bg-brand-yellow px-5 py-3 text-sm font-extrabold text-slate-900 transition hover:brightness-105 active:translate-y-1 active:border-b-0">
                  <Save className="h-4 w-4" />
                  {copy.save}
                </button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-bold text-slate-700">{copy.formTitle}</span>
                <input
                  value={activity.title}
                  onChange={(event) =>
                    setActivity((current) => ({
                      ...current,
                      title: event.target.value,
                    }))
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:border-brand-yellow"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-bold text-slate-700">{copy.formTrack}</span>
                <input
                  value={activity.track}
                  onChange={(event) =>
                    setActivity((current) => ({
                      ...current,
                      track: event.target.value,
                    }))
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:border-brand-yellow"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-bold text-slate-700">{copy.formDue}</span>
                <input
                  value={activity.dueDate}
                  onChange={(event) =>
                    setActivity((current) => ({
                      ...current,
                      dueDate: event.target.value,
                    }))
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:border-brand-yellow"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-bold text-slate-700">{copy.formStatus}</span>
                <select
                  value={activity.status}
                  onChange={(event) =>
                    setActivity((current) => ({
                      ...current,
                      status: event.target.value as ActivityStatus,
                    }))
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:border-brand-yellow"
                >
                  {(['live', 'scheduled', 'review'] as ActivityStatus[]).map((status) => (
                    <option key={status} value={status}>
                      {statusLabelByActivity[status]}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-4">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-black uppercase tracking-[0.24em] text-slate-400">{copy.questions}</div>
                  <div className="mt-1 text-sm font-semibold text-slate-500">
                    {activity.questions.length} {copy.blockCount}
                  </div>
                </div>

                <button
                  onClick={handleAddQuestion}
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-extrabold text-slate-700 transition hover:bg-slate-50"
                >
                  <Plus className="h-4 w-4" />
                  {copy.addQuestion}
                </button>
              </div>

              <div className="space-y-3">
                {activity.questions.map((question, index) => (
                  <div key={question.id} className="rounded-[1.4rem] border border-slate-200 bg-white p-4">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <div className="text-sm font-extrabold text-slate-900">
                        {copy.questionLabel} {index + 1}
                      </div>
                      <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-slate-500">
                        {questionTypeLabel[question.type]}
                      </div>
                    </div>

                    <div className="grid gap-3 md:grid-cols-[1.3fr_0.7fr]">
                      <label className="block">
                        <span className="mb-2 block text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                          {copy.questionLabel}
                        </span>
                        <input
                          value={question.title}
                          onChange={(event) => handleQuestionChange(question.id, 'title', event.target.value)}
                          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:border-brand-yellow"
                        />
                      </label>

                      <label className="block">
                        <span className="mb-2 block text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                          {copy.questionType}
                        </span>
                        <select
                          value={question.type}
                          onChange={(event) =>
                            handleQuestionChange(question.id, 'type', event.target.value as ActivityQuestionType)
                          }
                          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:border-brand-yellow"
                        >
                          {(['multipleChoice', 'shortAnswer', 'checkbox'] as ActivityQuestionType[]).map((type) => (
                            <option key={type} value={type}>
                              {questionTypeLabel[type]}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>

                    <label className="mt-3 block">
                      <span className="mb-2 block text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                        {copy.questionHelper}
                      </span>
                      <textarea
                        value={question.helperText}
                        onChange={(event) => handleQuestionChange(question.id, 'helperText', event.target.value)}
                        rows={2}
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:border-brand-yellow"
                      />
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
