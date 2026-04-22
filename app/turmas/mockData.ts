export type ClassItem = {
  id: number;
  name: string;
  subject: string;
  schedule: string;
  students: number;
  room: string;
  nextTopic: string;
  averageScore: number;
  completionRate: number;
  studentPreview: string[];
};

export type StudentStatus = 'leading' | 'steady' | 'attention';

export type ClassStudent = {
  id: string;
  name: string;
  initials: string;
  average: number;
  engagement: number;
  status: StudentStatus;
  lastDelivery: string;
};

export type ActivityStatus = 'live' | 'scheduled' | 'review';

export type ClassActivity = {
  id: string;
  title: string;
  track: string;
  dueDate: string;
  submissions: number;
  completion: number;
  status: ActivityStatus;
};

export type ActivityQuestionType = 'multipleChoice' | 'shortAnswer' | 'checkbox';

export type ActivityQuestion = {
  id: string;
  title: string;
  type: ActivityQuestionType;
  helperText: string;
};

export type EditableActivity = ClassActivity & {
  questions: ActivityQuestion[];
};

const baseClasses: ClassItem[] = [
  {
    id: 1,
    name: '8o Ano A',
    subject: 'Matematica',
    schedule: 'Seg, Qua · 08:00',
    students: 32,
    room: 'Sala 204',
    nextTopic: 'Equacoes do 1o grau e revisao para a avaliacao.',
    averageScore: 8.4,
    completionRate: 91,
    studentPreview: ['AL', 'BM', 'CS', 'DV'],
  },
  {
    id: 2,
    name: '1a Serie B',
    subject: 'Historia',
    schedule: 'Ter, Qui · 10:00',
    students: 27,
    room: 'Sala 112',
    nextTopic: 'Industrializacao, urbanizacao e leitura de fontes.',
    averageScore: 8.8,
    completionRate: 94,
    studentPreview: ['ER', 'FT', 'GL', 'HM'],
  },
  {
    id: 3,
    name: 'Laboratorio STEM',
    subject: 'Ciencias',
    schedule: 'Sex · 13:30',
    students: 18,
    room: 'Lab 03',
    nextTopic: 'Prototipos, experimentacao e registro de resultados.',
    averageScore: 9.1,
    completionRate: 87,
    studentPreview: ['IN', 'JP', 'KR', 'LS'],
  },
];

const rosterByClassId: Record<number, Array<Omit<ClassStudent, 'id'>>> = {
  1: [
    { name: 'Ana Luiza', initials: 'AL', average: 9.3, engagement: 96, status: 'leading', lastDelivery: 'Lista 04 enviada hoje' },
    { name: 'Bruno Matos', initials: 'BM', average: 8.7, engagement: 88, status: 'steady', lastDelivery: 'Exercicio revisado ontem' },
    { name: 'Clara Souza', initials: 'CS', average: 7.9, engagement: 74, status: 'attention', lastDelivery: 'Precisa refazer atividade 03' },
    { name: 'Diego Vaz', initials: 'DV', average: 8.5, engagement: 81, status: 'steady', lastDelivery: 'Quiz semanal concluido' },
  ],
  2: [
    { name: 'Elisa Rocha', initials: 'ER', average: 9.1, engagement: 94, status: 'leading', lastDelivery: 'Debate historico entregue' },
    { name: 'Fabio Teles', initials: 'FT', average: 8.4, engagement: 86, status: 'steady', lastDelivery: 'Fichamento em andamento' },
    { name: 'Giovana Luz', initials: 'GL', average: 8.8, engagement: 90, status: 'leading', lastDelivery: 'Linha do tempo revisada' },
    { name: 'Hugo Melo', initials: 'HM', average: 7.6, engagement: 72, status: 'attention', lastDelivery: 'Falta feedback da resenha' },
  ],
  3: [
    { name: 'Isabela Neri', initials: 'IN', average: 9.5, engagement: 97, status: 'leading', lastDelivery: 'Prototipo validado em equipe' },
    { name: 'Joao Pedro', initials: 'JP', average: 8.9, engagement: 89, status: 'steady', lastDelivery: 'Relatorio experimental entregue' },
    { name: 'Karina Reis', initials: 'KR', average: 8.1, engagement: 79, status: 'steady', lastDelivery: 'Painel de resultados atualizado' },
    { name: 'Lucas Simoes', initials: 'LS', average: 7.4, engagement: 68, status: 'attention', lastDelivery: 'Aguardando reforco no laboratorio' },
  ],
};

const activitiesByClassId: Record<number, Array<Omit<ClassActivity, 'id'>>> = {
  1: [
    { title: 'Lista diagnostica 05', track: 'Pratica guiada', dueDate: 'Entrega em 18/04', submissions: 28, completion: 88, status: 'live' },
    { title: 'Desafio de revisao bimestral', track: 'Recuperacao leve', dueDate: 'Programado para 22/04', submissions: 0, completion: 0, status: 'scheduled' },
    { title: 'Rubrica da prova final', track: 'Ajuste pedagocico', dueDate: 'Revisao interna hoje', submissions: 4, completion: 100, status: 'review' },
  ],
  2: [
    { title: 'Painel cronologico colaborativo', track: 'Pesquisa em grupo', dueDate: 'Entrega em 19/04', submissions: 22, completion: 81, status: 'live' },
    { title: 'Seminario de fontes historicas', track: 'Apresentacao oral', dueDate: 'Programado para 24/04', submissions: 0, completion: 0, status: 'scheduled' },
    { title: 'Revisao da rubrica de redacao', track: 'Curadoria docente', dueDate: 'Ajuste hoje', submissions: 3, completion: 100, status: 'review' },
  ],
  3: [
    { title: 'Sprint de prototipagem', track: 'Laboratorio ativo', dueDate: 'Entrega em 20/04', submissions: 14, completion: 78, status: 'live' },
    { title: 'Roteiro de teste dos sensores', track: 'Planejamento tecnico', dueDate: 'Programado para 25/04', submissions: 0, completion: 0, status: 'scheduled' },
    { title: 'Checklist de seguranca do lab', track: 'Revisao de processo', dueDate: 'Atualizacao hoje', submissions: 2, completion: 100, status: 'review' },
  ],
};

export function buildInitialClasses(): ClassItem[] {
  return baseClasses.map((classItem) => ({ ...classItem, studentPreview: [...classItem.studentPreview] }));
}

export function getClassById(id: number): ClassItem | undefined {
  const classItem = baseClasses.find((item) => item.id === id);
  return classItem
    ? {
        ...classItem,
        studentPreview: [...classItem.studentPreview],
      }
    : undefined;
}

export function getClassStudents(classItem: ClassItem): ClassStudent[] {
  const roster = rosterByClassId[classItem.id];

  if (roster) {
    return roster.map((student, index) => ({
      id: `${classItem.id}-student-${index + 1}`,
      ...student,
    }));
  }

  return classItem.studentPreview.map((initials, index) => ({
    id: `${classItem.id}-student-${index + 1}`,
    name: `Aluno ${index + 1}`,
    initials,
    average: Number((classItem.averageScore - 0.4 + index * 0.2).toFixed(1)),
    engagement: 78 + index * 4,
    status: index === 0 ? 'leading' : index === classItem.studentPreview.length - 1 ? 'attention' : 'steady',
    lastDelivery: 'Acompanhamento em atualizacao',
  }));
}

export function getClassActivities(classItem: ClassItem): ClassActivity[] {
  const activities = activitiesByClassId[classItem.id];

  if (activities) {
    return activities.map((activity, index) => ({
      id: `${classItem.id}-activity-${index + 1}`,
      ...activity,
    }));
  }

  return [
    {
      id: `${classItem.id}-activity-1`,
      title: 'Plano de abertura da turma',
      track: 'Organizacao inicial',
      dueDate: 'Entrega em 21/04',
      submissions: Math.max(classItem.students - 4, 0),
      completion: classItem.completionRate,
      status: 'live',
    },
    {
      id: `${classItem.id}-activity-2`,
      title: 'Roteiro da proxima semana',
      track: 'Planejamento docente',
      dueDate: 'Programado para 24/04',
      submissions: 0,
      completion: 0,
      status: 'scheduled',
    },
  ];
}

function buildQuestionSeed(activity: Pick<ClassActivity, 'id' | 'title' | 'track' | 'status'>): ActivityQuestion[] {
  return [
    {
      id: `${activity.id}-question-1`,
      title: `${activity.title} - pergunta principal`,
      type: 'multipleChoice',
      helperText: `${activity.track} · introducao do formulario`,
    },
    {
      id: `${activity.id}-question-2`,
      title: `${activity.title} - reflexao final`,
      type: activity.status === 'scheduled' ? 'shortAnswer' : 'checkbox',
      helperText: 'Campo de acompanhamento para fechamento da atividade',
    },
  ];
}

export function buildEditableActivities(activities: ClassActivity[]): EditableActivity[] {
  return activities.map((activity) => ({
    ...activity,
    questions: buildQuestionSeed(activity),
  }));
}

export function buildDraftActivity(nextIndex: number): EditableActivity {
  return {
    id: `draft-${nextIndex}`,
    title: `Nova atividade ${nextIndex}`,
    track: 'Formulario rapido',
    dueDate: 'Prazo a definir',
    submissions: 0,
    completion: 0,
    status: 'scheduled',
    questions: [
      {
        id: `draft-${nextIndex}-question-1`,
        title: 'Nova questao',
        type: 'multipleChoice',
        helperText: 'Adicione orientacoes curtas para o aluno responder.',
      },
    ],
  };
}
