import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

export const errorSchema = z.object({
  code: z.string(),
  message: z.string(),
  details: z.unknown().optional(),
});

export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  pageSize: z.coerce.number().int().positive().max(100).optional(),
});

export const paginatedMetaSchema = z.object({
  page: z.number(),
  pageSize: z.number(),
  total: z.number(),
});

export const languageSchema = z.enum(["EN", "PT", "ES"]);

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  role: z.enum(["teacher", "admin", "guardian"]),
  schoolId: z.string(),
  schoolName: z.string(),
  locale: languageSchema,
  permissions: z.array(z.string()),
});

export const loginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  remember: z.boolean().optional(),
});

export const loginResponseSchema = z.object({
  token: z.string(),
  user: userSchema,
  redirectUrl: z.string(),
});

export const turmaSchema = z.object({
  id: z.string(),
  name: z.string(),
  subject: z.string(),
  schedule: z.string(),
  students: z.number(),
  room: z.string(),
  nextTopic: z.string(),
  averageScore: z.number(),
  completionRate: z.number(),
  studentPreview: z.array(z.string()),
});

export const turmaListResponseSchema = z.object({
  items: z.array(turmaSchema),
  total: z.number(),
  page: z.number(),
  pageSize: z.number(),
});

export const turmaCreateSchema = z.object({
  name: z.string().min(1),
  subject: z.string().min(1),
  schedule: z.string().min(1),
  students: z.coerce.number().int().nonnegative().optional(),
  studentsCount: z.coerce.number().int().nonnegative().optional(),
  room: z.string().optional(),
  nextTopic: z.string().optional(),
});

export const turmaUpdateSchema = turmaCreateSchema.partial().extend({
  averageScore: z.coerce.number().min(0).max(10).optional(),
  completionRate: z.coerce.number().min(0).max(100).optional(),
});

export const pulseSchema = z.object({
  attendanceRate: z.number(),
  deliveryRate: z.number(),
  engagementRate: z.number(),
});

export const turmaSummarySchema = z.object({
  class: turmaSchema,
  pulse: pulseSchema,
});

export const studentStatusSchema = z.enum(["leading", "steady", "attention"]);

export const studentSchema = z.object({
  id: z.string(),
  name: z.string(),
  initials: z.string(),
  average: z.number(),
  engagement: z.number(),
  status: studentStatusSchema,
  lastDelivery: z.string(),
});

export const studentListResponseSchema = z.object({
  items: z.array(studentSchema),
  total: z.number(),
  page: z.number(),
  pageSize: z.number(),
});

export const studentCreateSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().optional(),
  initials: z.string().optional(),
  average: z.coerce.number().min(0).max(10).optional(),
  engagement: z.coerce.number().min(0).max(100).optional(),
  status: studentStatusSchema.optional(),
  lastDelivery: z.string().optional(),
});

export const studentUpdateSchema = studentCreateSchema.partial();

export const studentImportSchema = z.object({
  students: z.array(studentCreateSchema),
});

export const studentImportResponseSchema = z.object({
  imported: z.number(),
  skipped: z.number(),
  errors: z.array(z.object({ row: z.number(), message: z.string() })),
  items: z.array(studentSchema),
});

export const activityStatusSchema = z.enum(["live", "scheduled", "review"]);
export const activityQuestionTypeSchema = z.enum(["multipleChoice", "shortAnswer", "checkbox"]);

export const activityQuestionSchema = z.object({
  id: z.string(),
  title: z.string(),
  type: activityQuestionTypeSchema,
  helperText: z.string(),
});

export const activityQuestionInputSchema = activityQuestionSchema
  .omit({ id: true })
  .extend({ id: z.string().optional() });

export const activitySchema = z.object({
  id: z.string(),
  title: z.string(),
  track: z.string(),
  dueDate: z.string(),
  submissions: z.number(),
  completion: z.number(),
  status: activityStatusSchema,
  questions: z.array(activityQuestionSchema),
});

export const activityListItemSchema = activitySchema.omit({ questions: true }).extend({
  questionCount: z.number(),
});

export const activityListResponseSchema = z.object({
  items: z.array(activityListItemSchema),
  total: z.number(),
  page: z.number(),
  pageSize: z.number(),
});

export const activityCreateSchema = z.object({
  title: z.string().min(1),
  track: z.string().min(1),
  dueDate: z.string().min(1),
  status: activityStatusSchema,
  questions: z.array(activityQuestionInputSchema).optional(),
});

export const activityUpdateSchema = activityCreateSchema.partial().extend({
  submissions: z.coerce.number().int().nonnegative().optional(),
  completion: z.coerce.number().min(0).max(100).optional(),
});

export const questionsReplaceSchema = z.object({
  questions: z.array(activityQuestionInputSchema),
});

export const publishActivitySchema = z.object({
  publishAt: z.string().optional(),
});

export const classAnalyticsSchema = z.object({
  classId: z.string(),
  period: z.string(),
  pulse: pulseSchema,
  dashboard: z.object({
    average: z.number(),
    graded: z.number(),
    pending: z.number(),
  }),
  trend: z.array(z.object({ name: z.string(), score: z.number() })),
  radar: z.array(
    z.object({
      subject: z.string(),
      fullKey: z.string(),
      student: z.number(),
      classAverage: z.number(),
      fullMark: z.number(),
    }),
  ),
});

export const trustedInstitutionSchema = z.object({
  name: z.string(),
  kind: z.enum(["university", "school", "academy", "institute", "company"]),
});

export const publicLandingSchema = z.object({
  locale: languageSchema,
  hero: z.object({
    title: z.string(),
    subtitle: z.string(),
  }),
  features: z.array(z.object({ title: z.string(), description: z.string() })),
  stats: z.array(z.object({ value: z.string(), label: z.string() })),
  trustedBy: z.array(trustedInstitutionSchema),
  enterprise: z.object({
    integrations: z.array(z.string()),
  }),
  cta: z.object({
    title: z.string(),
    subtitle: z.string(),
  }),
  metadata: z.object({
    updatedAt: z.string(),
  }),
});

export const pricingPlanSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.string(),
  currency: z.string(),
  interval: z.enum(["monthly", "annual", "custom"]),
  description: z.string(),
  features: z.array(z.string()),
  highlight: z.boolean(),
  cta: z.string(),
});

export const pricingResponseSchema = z.object({
  billing: z.enum(["monthly", "annual"]),
  plans: z.array(pricingPlanSchema),
});

export const leadCreateSchema = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  organization: z.string().optional(),
  role: z.string().optional(),
  planId: z.string().optional(),
  message: z.string().optional(),
  source: z.string(),
  locale: languageSchema.optional(),
  utm: z.record(z.string()).optional(),
  consent: z.boolean(),
});

export const leadSchema = leadCreateSchema.extend({
  id: z.string(),
  status: z.enum(["created", "contacted"]),
  createdAt: z.string(),
});

export const scanCreateSchema = z.object({
  turmaId: z.string(),
  atividadeId: z.string().optional(),
  answerKeyId: z.string().optional(),
  imageDataUrl: z.string().optional(),
  subject: z.string().optional(),
});

export const scanResultSchema = z.object({
  id: z.string(),
  status: z.enum(["queued", "processing", "completed", "failed"]),
  turmaId: z.string(),
  atividadeId: z.string().optional(),
  studentId: z.string(),
  subject: z.string(),
  answers: z.array(z.number()),
  correctAnswers: z.array(z.number()),
  score: z.number(),
  confidence: z.number(),
  reviewItems: z.array(z.object({ question: z.number(), reason: z.string() })),
  createdAt: z.string(),
});

export const essayCreateSchema = z.object({
  turmaId: z.string(),
  alunoId: z.string().optional(),
  atividadeId: z.string().optional(),
  text: z.string().optional(),
  rubricId: z.string().optional(),
});

export const essayResultSchema = z.object({
  id: z.string(),
  score: z.number(),
  maxScore: z.number(),
  deltaVsAverage: z.number(),
  annotations: z.array(
    z.object({
      id: z.string(),
      kind: z.enum(["praise", "correction"]),
      label: z.string(),
      description: z.string(),
      anchor: z.string(),
    }),
  ),
  createdAt: z.string(),
});

export const quizGenerateSchema = z.object({
  prompt: z.string().min(1),
  subject: z.string(),
  gradeLevel: z.string(),
  language: languageSchema,
  questionCount: z.coerce.number().int().positive().max(20),
});

export const quizGenerateResponseSchema = z.object({
  questions: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      alternatives: z.array(z.string()),
      correctAlternative: z.number(),
      explanation: z.string(),
    }),
  ),
});

export const curriculumTopicSchema = z.object({
  id: z.string(),
  labelKey: z.string(),
  efficiency: z.number(),
});

export const curriculumDisciplineSchema = z.object({
  id: z.string(),
  labelKey: z.string(),
  icon: z.enum(["book", "globe", "calculator", "microscope"]),
  topics: z.array(curriculumTopicSchema),
});

export const curriculumAreaSchema = z.object({
  id: z.string(),
  labelKey: z.string(),
  color: z.string(),
  disciplines: z.array(curriculumDisciplineSchema),
});

export const curriculumAreasResponseSchema = z.object({
  items: z.array(curriculumAreaSchema),
});

export const topicPerformanceSchema = z.object({
  topicId: z.string(),
  turmaId: z.string().optional(),
  period: z.string(),
  efficiency: z.number(),
  masteredStudents: z.number(),
  attentionStudents: z.number(),
});

export const notificationSchema = z.object({
  id: z.string(),
  studentId: z.string(),
  type: z.enum(["grade", "event", "message", "award", "attendance"]),
  title: z.string(),
  subtitle: z.string(),
  value: z.string(),
  time: z.string(),
  color: z.string(),
  sender: z.string(),
  description: z.string(),
  createdAt: z.string(),
});

export const notificationCreateSchema = z.object({
  studentId: z.string(),
  recipientId: z.string().optional(),
  type: notificationSchema.shape.type,
  title: z.string(),
  message: z.string(),
  value: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const notificationListResponseSchema = z.object({
  items: z.array(notificationSchema),
});

export const messageCreateSchema = z.object({
  studentId: z.string(),
  recipientId: z.string(),
  body: z.string().min(1),
  attachments: z.array(z.string()).optional(),
});

export const messageSchema = messageCreateSchema.extend({
  id: z.string(),
  status: z.enum(["sent", "queued"]),
  createdAt: z.string(),
});

export const reportCreateSchema = z.object({
  turmaId: z.string().optional(),
  alunoId: z.string().optional(),
  type: z.enum(["class-summary", "student-progress", "grading-export"]),
  period: z.string(),
  format: z.enum(["pdf", "csv"]),
});

export const reportSchema = reportCreateSchema.extend({
  id: z.string(),
  status: z.enum(["queued", "generating", "ready", "failed"]),
  fileName: z.string(),
  downloadUrl: z.string().optional(),
  createdAt: z.string(),
});

export const reportDownloadSchema = z.object({
  id: z.string(),
  fileName: z.string(),
  mimeType: z.string(),
  contentBase64: z.string(),
});

export const appContract = c.router({
  login: {
    method: "POST",
    path: "/api/auth/login",
    body: loginRequestSchema,
    responses: { 200: loginResponseSchema, 401: errorSchema },
  },
  me: {
    method: "GET",
    path: "/api/auth/me",
    responses: { 200: userSchema, 401: errorSchema },
  },
  logout: {
    method: "POST",
    path: "/api/auth/logout",
    body: z.object({}),
    responses: { 200: z.object({ ok: z.boolean() }) },
  },
  passwordHelp: {
    method: "POST",
    path: "/api/auth/password-help",
    body: z.object({ email: z.string().email(), locale: languageSchema.optional() }),
    responses: { 200: z.object({ status: z.literal("sent") }) },
  },
  getPublicLanding: {
    method: "GET",
    path: "/api/public/landing",
    query: z.object({ locale: languageSchema.optional(), country: z.string().optional() }),
    responses: { 200: publicLandingSchema },
  },
  getPublicPricing: {
    method: "GET",
    path: "/api/public/pricing",
    query: z.object({
      locale: languageSchema.optional(),
      country: z.string().optional(),
      billing: z.enum(["monthly", "annual"]).optional(),
    }),
    responses: { 200: pricingResponseSchema },
  },
  createLead: {
    method: "POST",
    path: "/api/public/leads",
    body: leadCreateSchema,
    responses: { 201: leadSchema, 400: errorSchema },
  },
  listTurmas: {
    method: "GET",
    path: "/api/turmas",
    query: paginationQuerySchema.extend({
      search: z.string().optional(),
      teacherId: z.string().optional(),
      subject: z.string().optional(),
    }),
    responses: { 200: turmaListResponseSchema },
  },
  createTurma: {
    method: "POST",
    path: "/api/turmas",
    body: turmaCreateSchema,
    responses: { 201: turmaSchema, 400: errorSchema },
  },
  getTurma: {
    method: "GET",
    path: "/api/turmas/:turmaId",
    pathParams: z.object({ turmaId: z.string() }),
    responses: { 200: turmaSchema, 404: errorSchema },
  },
  updateTurma: {
    method: "PATCH",
    path: "/api/turmas/:turmaId",
    pathParams: z.object({ turmaId: z.string() }),
    body: turmaUpdateSchema,
    responses: { 200: turmaSchema, 404: errorSchema },
  },
  deleteTurma: {
    method: "DELETE",
    path: "/api/turmas/:turmaId",
    pathParams: z.object({ turmaId: z.string() }),
    responses: { 200: z.object({ ok: z.boolean() }), 404: errorSchema },
  },
  getTurmaResumo: {
    method: "GET",
    path: "/api/turmas/:turmaId/resumo",
    pathParams: z.object({ turmaId: z.string() }),
    query: z.object({ period: z.string().optional() }),
    responses: { 200: turmaSummarySchema, 404: errorSchema },
  },
  getTurmaAnalytics: {
    method: "GET",
    path: "/api/turmas/:turmaId/analytics",
    pathParams: z.object({ turmaId: z.string() }),
    query: z.object({ period: z.string().optional(), compareWith: z.string().optional() }),
    responses: { 200: classAnalyticsSchema, 404: errorSchema },
  },
  listAlunos: {
    method: "GET",
    path: "/api/turmas/:turmaId/alunos",
    pathParams: z.object({ turmaId: z.string() }),
    query: paginationQuerySchema.extend({
      search: z.string().optional(),
      status: studentStatusSchema.optional(),
    }),
    responses: { 200: studentListResponseSchema, 404: errorSchema },
  },
  createAluno: {
    method: "POST",
    path: "/api/turmas/:turmaId/alunos",
    pathParams: z.object({ turmaId: z.string() }),
    body: studentCreateSchema,
    responses: { 201: studentSchema, 404: errorSchema },
  },
  getAluno: {
    method: "GET",
    path: "/api/turmas/:turmaId/alunos/:alunoId",
    pathParams: z.object({ turmaId: z.string(), alunoId: z.string() }),
    responses: { 200: studentSchema, 404: errorSchema },
  },
  updateAluno: {
    method: "PATCH",
    path: "/api/turmas/:turmaId/alunos/:alunoId",
    pathParams: z.object({ turmaId: z.string(), alunoId: z.string() }),
    body: studentUpdateSchema,
    responses: { 200: studentSchema, 404: errorSchema },
  },
  importAlunos: {
    method: "POST",
    path: "/api/turmas/:turmaId/alunos/import",
    pathParams: z.object({ turmaId: z.string() }),
    body: studentImportSchema,
    responses: { 201: studentImportResponseSchema, 404: errorSchema },
  },
  listAtividades: {
    method: "GET",
    path: "/api/turmas/:turmaId/atividades",
    pathParams: z.object({ turmaId: z.string() }),
    query: paginationQuerySchema.extend({
      status: activityStatusSchema.optional(),
      includeQuestions: z.coerce.boolean().optional(),
    }),
    responses: { 200: activityListResponseSchema, 404: errorSchema },
  },
  createAtividade: {
    method: "POST",
    path: "/api/turmas/:turmaId/atividades",
    pathParams: z.object({ turmaId: z.string() }),
    body: activityCreateSchema,
    responses: { 201: activitySchema, 404: errorSchema },
  },
  getAtividade: {
    method: "GET",
    path: "/api/turmas/:turmaId/atividades/:atividadeId",
    pathParams: z.object({ turmaId: z.string(), atividadeId: z.string() }),
    responses: { 200: activitySchema, 404: errorSchema },
  },
  updateAtividade: {
    method: "PATCH",
    path: "/api/turmas/:turmaId/atividades/:atividadeId",
    pathParams: z.object({ turmaId: z.string(), atividadeId: z.string() }),
    body: activityUpdateSchema,
    responses: { 200: activitySchema, 404: errorSchema },
  },
  deleteAtividade: {
    method: "DELETE",
    path: "/api/turmas/:turmaId/atividades/:atividadeId",
    pathParams: z.object({ turmaId: z.string(), atividadeId: z.string() }),
    responses: { 200: z.object({ ok: z.boolean() }), 404: errorSchema },
  },
  replaceQuestoes: {
    method: "PUT",
    path: "/api/turmas/:turmaId/atividades/:atividadeId/questoes",
    pathParams: z.object({ turmaId: z.string(), atividadeId: z.string() }),
    body: questionsReplaceSchema,
    responses: { 200: activitySchema, 404: errorSchema },
  },
  publicarAtividade: {
    method: "POST",
    path: "/api/turmas/:turmaId/atividades/:atividadeId/publicar",
    pathParams: z.object({ turmaId: z.string(), atividadeId: z.string() }),
    body: publishActivitySchema,
    responses: { 200: activitySchema, 404: errorSchema },
  },
  createScan: {
    method: "POST",
    path: "/api/correcoes/scans",
    body: scanCreateSchema,
    responses: { 201: scanResultSchema, 400: errorSchema },
  },
  getScan: {
    method: "GET",
    path: "/api/correcoes/scans/:scanId",
    pathParams: z.object({ scanId: z.string() }),
    responses: { 200: scanResultSchema, 404: errorSchema },
  },
  createRedacaoCorrection: {
    method: "POST",
    path: "/api/correcoes/redacoes",
    body: essayCreateSchema,
    responses: { 201: essayResultSchema, 400: errorSchema },
  },
  generateQuiz: {
    method: "POST",
    path: "/api/ai/quiz-generator",
    body: quizGenerateSchema,
    responses: { 201: quizGenerateResponseSchema, 400: errorSchema },
  },
  getCurriculoAreas: {
    method: "GET",
    path: "/api/curriculo/areas",
    query: z.object({ schoolId: z.string().optional(), locale: languageSchema.optional() }),
    responses: { 200: curriculumAreasResponseSchema },
  },
  getTopicoDesempenho: {
    method: "GET",
    path: "/api/curriculo/topicos/:topicoId/desempenho",
    pathParams: z.object({ topicoId: z.string() }),
    query: z.object({ turmaId: z.string().optional(), period: z.string().optional() }),
    responses: { 200: topicPerformanceSchema },
  },
  listResponsavelNotificacoes: {
    method: "GET",
    path: "/api/responsaveis/:responsavelId/notificacoes",
    pathParams: z.object({ responsavelId: z.string() }),
    query: z.object({
      studentId: z.string().optional(),
      since: z.string().optional(),
      limit: z.coerce.number().int().positive().optional(),
    }),
    responses: { 200: notificationListResponseSchema },
  },
  createNotification: {
    method: "POST",
    path: "/api/notificacoes",
    body: notificationCreateSchema,
    responses: { 201: notificationSchema, 400: errorSchema },
  },
  createMessage: {
    method: "POST",
    path: "/api/mensagens",
    body: messageCreateSchema,
    responses: { 201: messageSchema, 400: errorSchema },
  },
  createReport: {
    method: "POST",
    path: "/api/relatorios",
    body: reportCreateSchema,
    responses: { 201: reportSchema, 400: errorSchema },
  },
  getReport: {
    method: "GET",
    path: "/api/relatorios/:relatorioId",
    pathParams: z.object({ relatorioId: z.string() }),
    responses: { 200: reportSchema, 404: errorSchema },
  },
  downloadReport: {
    method: "GET",
    path: "/api/relatorios/:relatorioId/download",
    pathParams: z.object({ relatorioId: z.string() }),
    responses: { 200: reportDownloadSchema, 404: errorSchema },
  },
});

export type AppContract = typeof appContract;
export type User = z.infer<typeof userSchema>;
export type Turma = z.infer<typeof turmaSchema>;
export type Student = z.infer<typeof studentSchema>;
export type StudentStatus = z.infer<typeof studentStatusSchema>;
export type Activity = z.infer<typeof activitySchema>;
export type ActivityListItem = z.infer<typeof activityListItemSchema>;
export type ActivityQuestion = z.infer<typeof activityQuestionSchema>;
export type ActivityQuestionType = z.infer<typeof activityQuestionTypeSchema>;
export type ActivityStatus = z.infer<typeof activityStatusSchema>;
export type ClassAnalytics = z.infer<typeof classAnalyticsSchema>;
export type CurriculumArea = z.infer<typeof curriculumAreaSchema>;
export type Notification = z.infer<typeof notificationSchema>;
export type PricingPlan = z.infer<typeof pricingPlanSchema>;
