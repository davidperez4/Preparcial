import ActorForm from '@/app/components/ActorForm';

interface EditActorPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditActorPage({ params }: EditActorPageProps) {
  const { id } = await params;
  return <ActorForm actorId={id} />;
}
