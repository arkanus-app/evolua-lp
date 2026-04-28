import { ActivityEditorScreen } from "../../../ActivityEditorScreen";

type CreateActivityPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CreateActivityPage({ params }: CreateActivityPageProps) {
  const { id } = await params;

  return <ActivityEditorScreen classId={id} mode="create" />;
}
