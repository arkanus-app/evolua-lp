import type { ClassItem, EditableActivity } from './mockData';
import { buildEditableActivities, buildDraftActivity, getClassActivities, getClassById } from './mockData';

type SearchParamsLike = {
  get(name: string): string | null;
  toString(): string;
};

export function resolveClassFromRoute(idValue: string, searchParams: SearchParamsLike): ClassItem {
  const id = Number(idValue);
  const storedClass = Number.isNaN(id) ? undefined : getClassById(id);

  if (storedClass) {
    return storedClass;
  }

  return {
    id: Number.isNaN(id) ? Date.now() : id,
    name: searchParams.get('name') || 'Nova turma',
    subject: searchParams.get('subject') || 'Estudos Gerais',
    schedule: searchParams.get('schedule') || 'Horario a definir',
    students: Number(searchParams.get('students')) || 25,
    room: searchParams.get('room') || 'Sala principal',
    nextTopic: searchParams.get('topic') || 'Planejamento inicial e organizacao das proximas atividades',
    averageScore: Number(searchParams.get('average')) || 8.6,
    completionRate: Number(searchParams.get('completion')) || 88,
    studentPreview: ['NA', 'TB', 'VC', 'YL'],
  };
}

export function buildActivityEditorHref(
  pathname: string,
  searchParams: SearchParamsLike,
  extraParams?: Record<string, string | undefined>
): string {
  const params = new URLSearchParams(searchParams.toString());

  Object.entries(extraParams ?? {}).forEach(([key, value]) => {
    if (!value) {
      params.delete(key);
      return;
    }

    params.set(key, value);
  });

  const query = params.toString();
  return query ? `${pathname}?${query}` : pathname;
}

export function resolveEditableActivity(
  classItem: ClassItem,
  activityId?: string,
  mode: 'create' | 'edit' = 'edit'
): EditableActivity {
  const activities = buildEditableActivities(getClassActivities(classItem));

  if (mode === 'create') {
    return buildDraftActivity(activities.length + 1);
  }

  return activities.find((activity) => activity.id === activityId) ?? activities[0] ?? buildDraftActivity(1);
}
