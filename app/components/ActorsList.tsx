'use client';

import { useEffect, useState } from 'react';
import { Actor, actorApi } from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';
import styles from './ActorsList.module.css';

export default function ActorsList() {
  const [actors, setActors] = useState<Actor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchActors();
  }, []);

  const fetchActors = async () => {
    try {
      setLoading(true);
      const data = await actorApi.getActors();
      setActors(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar los actores');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este actor?')) return;

    try {
      await actorApi.deleteActor(id);
      setActors(actors.filter(actor => actor.id !== id));
    } catch (err) {
      alert('Error al eliminar el actor');
      console.error(err);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Cargando actores...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Lista de Actores</h1>
        <Link
          href="/actors/crear"
          className={styles.createButton}
        >
          Crear Actor
        </Link>
        <Link
          href="/"
          className={styles.createButton}
        >
          Pagina principal
        </Link>
        
      </div>

      {actors.length === 0 ? (
        <p className={styles.emptyState}>No hay actores disponibles.</p>
      ) : (
        <div className={styles.grid}>
          {actors.map((actor) => (
            <div
              key={actor.id}
              className={styles.card}
            >
              {actor.photo && (
                <Image
                  src={actor.photo}
                  alt={actor.name}
                  width={400}
                  height={200}
                  className={styles.image}
                  priority={false}
                />
              )}
              <div className={styles.content}>
                <h2 className={styles.name}>{actor.name}</h2>
                <p className={styles.info}>
                  <strong>Nacionalidad:</strong> {actor.nationality}
                </p>
                <p className={styles.info}>
                  <strong>Cumpleaños:</strong> {new Date(actor.birthDate).toLocaleDateString('es-ES')}
                </p>
                <p className={styles.biography}>
                  <strong>Biografía:</strong> {actor.biography.substring(0, 100)}...
                </p>
                <div className={styles.actions}>
                  <Link
                    href={`/actors/${actor.id}/edit`}
                    className={styles.editButton}
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(actor.id)}
                    className={styles.deleteButton}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
