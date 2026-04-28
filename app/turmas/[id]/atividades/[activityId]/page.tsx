import { ActivityEditorScreen } from "../../../ActivityEditorScreen";

type EditActivityPageProps = {
  params: Promise<{
    id: string;
    activityId: string;
  }>;
};

export default async function EditActivityPage({ params }: EditActivityPageProps) {
  const { id, activityId } = await params;

  return <ActivityEditorScreen classId={id} mode="edit" activityId={activityId} />;
}
