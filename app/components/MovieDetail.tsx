'use client';

import { useEffect, useState } from 'react';
import { Movie, movieApi } from '@/lib/api';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './MovieDetail.module.css';

interface MovieDetailProps {
  movieId: string;
}

export default function MovieDetail({ movieId }: MovieDetailProps) {
  const router = useRouter();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMovie();
  }, [movieId]);

  const fetchMovie = async () => {
    try {
      setLoading(true);
      const data = await movieApi.getMovieById(movieId);
      setMovie(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar la película');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Cargando película...</div>;
  }

  if (error || !movie) {
    return <div className={styles.error}>{error || 'Película no encontrada'}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{movie.title}</h1>
        <button
          onClick={() => router.back()}
          className={styles.backButton}
        >
          Volver
        </button>
      </div>

      <div className={styles.content}>
        {movie.poster && (
          <Image
            src={movie.poster}
            alt={movie.title}
            width={400}
            height={600}
            className={styles.poster}
            priority={false}
          />
        )}

        <div className={styles.details}>
          <div className={styles.detailGroup}>
            <h2>Información General</h2>
            <p><strong>Título:</strong> {movie.title}</p>
            <p><strong>Duración:</strong> {movie.duration} minutos</p>
            <p><strong>País:</strong> {movie.country}</p>
            <p><strong>Fecha de lanzamiento:</strong> {new Date(movie.releaseDate).toLocaleDateString('es-ES')}</p>
            <p><strong>Popularidad:</strong> {movie.popularity}</p>
          </div>

          {movie.director && (
            <div className={styles.detailGroup}>
              <h2>Director</h2>
              <p><strong>Nombre:</strong> {movie.director.name}</p>
              <p><strong>Nacionalidad:</strong> {movie.director.nationality}</p>
              <p><strong>Cumpleaños:</strong> {new Date(movie.director.birthDate).toLocaleDateString('es-ES')}</p>
              <p><strong>Biografía:</strong> {movie.director.biography}</p>
            </div>
          )}

          {movie.actors && movie.actors.length > 0 && (
            <div className={styles.detailGroup}>
              <h2>Actores</h2>
              {movie.actors.map((actor) => (
                <div key={actor.id} className={styles.actor}>
                  <p><strong>Nombre:</strong> {actor.name}</p>
                  <p><strong>Nacionalidad:</strong> {actor.nationality}</p>
                  <p><strong>Cumpleaños:</strong> {new Date(actor.birthDate).toLocaleDateString('es-ES')}</p>
                  <p><strong>Biografía:</strong> {actor.biography}</p>
                </div>
              ))}
            </div>
          )}

          {movie.genre && (
            <div className={styles.detailGroup}>
              <h2>Género</h2>
              <p>{movie.genre.type}</p>
            </div>
          )}

          {movie.platforms && movie.platforms.length > 0 && (
            <div className={styles.detailGroup}>
              <h2>Plataformas</h2>
              {movie.platforms.map((platform) => (
                <div key={platform.id} className={styles.platform}>
                  <p><strong>Nombre:</strong> {platform.name}</p>
                  <p><strong>URL:</strong> <a href={platform.url} target="_blank" rel="noopener noreferrer">{platform.url}</a></p>
                </div>
              ))}
            </div>
          )}

          {movie.reviews && movie.reviews.length > 0 && (
            <div className={styles.detailGroup}>
              <h2>Reseñas</h2>
              {movie.reviews.map((review) => (
                <div key={review.id} className={styles.review}>
                  <p><strong>Puntuación:</strong> {review.score}/5</p>
                  <p><strong>Creador:</strong> {review.creator}</p>
                  <p>{review.text}</p>
                </div>
              ))}
            </div>
          )}

          {movie.youtubeTrailer && (
            <div className={styles.detailGroup}>
              <h2>Trailer</h2>
              <p><strong>Nombre:</strong> {movie.youtubeTrailer.name}</p>
              <p><strong>Duración:</strong> {movie.youtubeTrailer.duration} minutos</p>
              <p><strong>Canal:</strong> {movie.youtubeTrailer.channel}</p>
              <p><strong>URL:</strong> <a href={movie.youtubeTrailer.url} target="_blank" rel="noopener noreferrer">{movie.youtubeTrailer.url}</a></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}