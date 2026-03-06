import MovieDetail from '@/app/components/MovieDetail';

interface MovieDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function MovieDetailPage({ params }: MovieDetailPageProps) {
  const { id } = await params;
  return <MovieDetail movieId={id} />;
}