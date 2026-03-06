'use client';

import { useState } from 'react';
import { Movie, Actor, Prize, movieApi, actorApi, prizeApi } from '@/lib/api';
import { useRouter } from 'next/navigation';
import styles from './MovieForm.module.css';

export default function MovieForm() {
  const router = useRouter();
  const [movie, setMovie] = useState({
    title: '',
    poster: '',
    duration: 0,
    country: '',
    releaseDate: '',
    popularity: 0,
    genre: { id: '', type: '' },
    director: {
      id: '',
      name: '',
      photo: '',
      nationality: '',
      birthDate: '',
      biography: '',
    },
    youtubeTrailer: {
      name: '',
      url: '',
      duration: 0,
      channel: '',
    },
  });
  const [actor, setActor] = useState({
    name: '',
    photo: '',
    nationality: '',
    birthDate: '',
    biography: '',
  });
  const [prize, setPrize] = useState({
    name: '',
    description: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleMovieChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'genreType') {
      setMovie((prev) => ({
        ...prev,
        genre: { id: value, type: '' },
      }));
    } else if (name === 'releaseDate') {
      setMovie((prev) => ({
        ...prev,
        [name]: value + 'T00:00:00.000Z',
      }));
    } else {
      setMovie((prev) => ({
        ...prev,
        [name]: name === 'duration' || name === 'popularity' ? Number(value) : value,
      }));
    }
  };

  const handleActorChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setActor((prev) => ({
      ...prev,
      [name]: name === 'birthDate' ? value + 'T00:00:00.000Z' : value,
    }));
  };

  const handleDirectorChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setMovie((prev) => ({
      ...prev,
      director: {
        ...prev.director,
        [name]: name === 'birthDate' ? value + 'T00:00:00.000Z' : value,
      },
    }));
  };

  const handleTrailerChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setMovie((prev) => ({
      ...prev,
      youtubeTrailer: {
        ...prev.youtubeTrailer,
        [name]: name === 'duration' ? Number(value) : value,
      },
    }));
  };

  const handlePrizeChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPrize((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      // 1. Crear actor primero
      const createdActor = await actorApi.createActor(actor);

      // 2. Crear película
      const createdMovie = await movieApi.createMovie(movie);

      // 3. Crear premio
      const createdPrize = await prizeApi.createPrize(prize);

      // 4. Asignar película al actor
      await movieApi.assignMovieToActor(createdActor.id, createdMovie.id);

      // 5. Asignar premio a la película
      await movieApi.assignPrizeToMovie(createdMovie.id, createdPrize.id);

      router.push('/movies');
    } catch (err) {
      setError('Error al crear la película, actor y premio');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.heading}>Crear Nueva Película</h1>

        {error && <div className={styles.errorBox}>{error}</div>}

        <h2>Película</h2>
        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.label}>Título</label>
          <input
            type="text"
            id="title"
            name="title"
            value={movie.title}
            onChange={handleMovieChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="poster" className={styles.label}>Poster URL</label>
          <input
            type="url"
            id="poster"
            name="poster"
            value={movie.poster}
            onChange={handleMovieChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="duration" className={styles.label}>Duración (min)</label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={movie.duration}
            onChange={handleMovieChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="country" className={styles.label}>País</label>
          <input
            type="text"
            id="country"
            name="country"
            value={movie.country}
            onChange={handleMovieChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="releaseDate" className={styles.label}>Fecha de Lanzamiento</label>
          <input
            type="date"
            id="releaseDate"
            name="releaseDate"
            value={movie.releaseDate ? movie.releaseDate.split('T')[0] : ''}
            onChange={handleMovieChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="popularity" className={styles.label}>Popularidad</label>
          <input
            type="number"
            id="popularity"
            name="popularity"
            value={movie.popularity}
            onChange={handleMovieChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="genreType" className={styles.label}>Género</label>
          <input
            type="text"
            id="genreType"
            name="genreType"
            value={movie.genre.type}
            onChange={handleMovieChange}
            required
            className={styles.input}
          />
        </div>

        <h2>Director</h2>
        <div className={styles.formGroup}>
          <label htmlFor="directorName" className={styles.label}>Nombre</label>
          <input
            type="text"
            id="directorName"
            name="name"
            value={movie.director.name}
            onChange={handleDirectorChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="directorPhoto" className={styles.label}>Foto URL</label>
          <input
            type="url"
            id="directorPhoto"
            name="photo"
            value={movie.director.photo}
            onChange={handleDirectorChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="directorNationality" className={styles.label}>Nacionalidad</label>
          <input
            type="text"
            id="directorNationality"
            name="nationality"
            value={movie.director.nationality}
            onChange={handleDirectorChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="directorBirthDate" className={styles.label}>Cumpleaños</label>
          <input
            type="date"
            id="directorBirthDate"
            name="birthDate"
            value={movie.director.birthDate ? movie.director.birthDate.split('T')[0] : ''}
            onChange={handleDirectorChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="directorBiography" className={styles.label}>Biografía</label>
          <textarea
            id="directorBiography"
            name="biography"
            value={movie.director.biography}
            onChange={handleDirectorChange}
            required
            className={styles.textarea}
          />
        </div>

        <h2>Youtube Trailer</h2>
        <div className={styles.formGroup}>
          <label htmlFor="trailerName" className={styles.label}>Nombre</label>
          <input
            type="text"
            id="trailerName"
            name="name"
            value={movie.youtubeTrailer.name}
            onChange={handleTrailerChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="trailerUrl" className={styles.label}>URL</label>
          <input
            type="url"
            id="trailerUrl"
            name="url"
            value={movie.youtubeTrailer.url}
            onChange={handleTrailerChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="trailerDuration" className={styles.label}>Duración (min)</label>
          <input
            type="number"
            id="trailerDuration"
            name="duration"
            value={movie.youtubeTrailer.duration}
            onChange={handleTrailerChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="trailerChannel" className={styles.label}>Canal</label>
          <input
            type="text"
            id="trailerChannel"
            name="channel"
            value={movie.youtubeTrailer.channel}
            onChange={handleTrailerChange}
            required
            className={styles.input}
          />
        </div>

        <h2>Actor Principal</h2>
        <div className={styles.formGroup}>
          <label htmlFor="actorName" className={styles.label}>Nombre</label>
          <input
            type="text"
            id="actorName"
            name="name"
            value={actor.name}
            onChange={handleActorChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="actorPhoto" className={styles.label}>Foto URL</label>
          <input
            type="url"
            id="actorPhoto"
            name="photo"
            value={actor.photo}
            onChange={handleActorChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="actorNationality" className={styles.label}>Nacionalidad</label>
          <input
            type="text"
            id="actorNationality"
            name="nationality"
            value={actor.nationality}
            onChange={handleActorChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="actorBirthDate" className={styles.label}>Cumpleaños</label>
          <input
            type="date"
            id="actorBirthDate"
            name="birthDate"
            value={actor.birthDate ? actor.birthDate.split('T')[0] : ''}
            onChange={handleActorChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="actorBiography" className={styles.label}>Biografía</label>
          <textarea
            id="actorBiography"
            name="biography"
            value={actor.biography}
            onChange={handleActorChange}
            required
            className={styles.textarea}
          />
        </div>

        <h2>Premio</h2>
        <div className={styles.formGroup}>
          <label htmlFor="prizeName" className={styles.label}>Nombre del Premio</label>
          <input
            type="text"
            id="prizeName"
            name="name"
            value={prize.name}
            onChange={handlePrizeChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="prizeDescription" className={styles.label}>Descripción</label>
          <textarea
            id="prizeDescription"
            name="description"
            value={prize.description}
            onChange={handlePrizeChange}
            className={styles.textarea}
          />
        </div>

        <div className={styles.buttonGroup}>
          <button
            type="submit"
            disabled={submitting}
            className={styles.submitButton}
          >
            {submitting ? 'Creando...' : 'Crear Película'}
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