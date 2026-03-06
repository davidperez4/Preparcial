'use client';

import { useState, useEffect } from 'react';
import { Actor, actorApi } from '@/lib/api';
import { useRouter } from 'next/navigation';
import styles from './ActorForm.module.css';

interface ActorFormProps {
  actorId?: string;
  onSubmit?: () => void;
}

export default function ActorForm({ actorId, onSubmit }: ActorFormProps) {
  const router = useRouter();
  const [actor, setActor] = useState({
    name: '',
    photo: '',
    nationality: '',
    birthDate: '',
    biography: '',
  });
  const [loading, setLoading] = useState(!!actorId);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (actorId) {
      loadActor();
    }
  }, [actorId]);

  const loadActor = async () => {
    if (!actorId) return;
    try {
      const data = await actorApi.getActorById(actorId);
      setActor({
        name: data.name,
        photo: data.photo,
        nationality: data.nationality,
        birthDate: data.birthDate,
        biography: data.biography,
      });
    } catch (err) {
      setError('Error al cargar el actor');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setActor((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      if (actorId) {
        // Editar
        await actorApi.updateActor(actorId, actor);
      } else {
        // Crear
        await actorApi.createActor(actor);
      }
      if (onSubmit) onSubmit();
      router.push('/actors');
    } catch (err) {
      setError('Error al guardar el actor');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className={styles.loadingText}>Cargando...</div>;
  }

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.heading}>
          {actorId ? 'Editar Actor' : 'Crear Nuevo Actor'}
        </h1>

        {error && <div className={styles.errorBox}>{error}</div>}

        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={actor.name}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="photo" className={styles.label}>
            Foto URL
          </label>
          <input
            type="url"
            id="photo"
            name="photo"
            value={actor.photo}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="nationality" className={styles.label}>
            Nacionalidad
          </label>
          <input
            type="text"
            id="nationality"
            name="nationality"
            value={actor.nationality}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="birthDate" className={styles.label}>
            Cumpleaños
          </label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            value={actor.birthDate}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="biography" className={styles.label}>
            Biografía
          </label>
          <textarea
            id="biography"
            name="biography"
            value={actor.biography}
            onChange={handleChange}
            required
            className={styles.textarea}
          />
        </div>

        <div className={styles.buttonGroup}>
          <button
            type="submit"
            disabled={submitting}
            className={styles.submitButton}
          >
            {submitting ? 'Guardando...' : actorId ? 'Actualizar' : 'Crear'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className={styles.cancelButton}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
