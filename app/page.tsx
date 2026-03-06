import Link from 'next/link';
import styles from './home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.heading}>Bienvenido a FrontArte7</h1>
        <p className={styles.description}>
          Sistema de gestión de actores para la plataforma de arte
        </p>
        <div className={styles.buttonGroup}>
          <Link
            href="/actors"
            className={`${styles.button} ${styles.primaryButton}`}
          >
            Ver Actores
          </Link>
          <Link
            href="/actors/crear"
            className={`${styles.button} ${styles.secondaryButton}`}
          >
            Crear Nuevo Actor
          </Link>
          <Link
            href="/movies"
            className={`${styles.button} ${styles.primaryButton}`}
          >
            Ver Películas
          </Link>
          <Link
            href="/movies/crear"
            className={`${styles.button} ${styles.secondaryButton}`}
          >
            Crear Nueva Película
          </Link>
        </div>
      </div>
    </div>
  );
}