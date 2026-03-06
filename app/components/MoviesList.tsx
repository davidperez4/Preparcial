'use client';

import { useEffect, useState } from 'react';
import { Movie, movieApi } from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';
import styles from './MoviesList.module.css';

export default function MoviesList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const data = await movieApi.getMovies();
      setMovies(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar las películas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Cargando películas...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Lista de Películas</h1>
        <Link
          href="/movies/crear"
          className={styles.createButton}
        >
          Crear Película
        </Link>
        <Link
          href="/"
          className={styles.createButton}
        >
          Página principal
        </Link>
      </div>

      {movies.length === 0 ? (
        <p className={styles.emptyState}>No hay películas disponibles.</p>
      ) : (
        <div className={styles.grid}>
          {movies.map((movie) => (
            <div
              key={movie.id}
              className={styles.card}
            >
              {movie.poster && (
                <Image
                  src={movie.poster}
                  alt={movie.title}
                  width={400}
                  height={200}
                  className={styles.image}
                  priority={false}
                />
              )}
              <div className={styles.content}>
                <h2 className={styles.name}>{movie.title}</h2>
                <p className={styles.info}>
                  <strong>Fecha de lanzamiento:</strong> {new Date(movie.releaseDate).toLocaleDateString('es-ES')}
                </p>
                <p className={styles.info}>
                  <strong>Director:</strong> {movie.director ? movie.director.name : 'No especificado'}
                </p>
                <p className={styles.info}>
                  <strong>Premio:</strong> N/A
                </p>
                <div className={styles.actions}>
                  <Link
                    href={`/movies/${movie.id}`}
                    className={styles.detailButton}
                  >
                    Ver Detalle
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}