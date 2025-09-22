'use client';

import { useAuthStore } from '@/store/authStore';
import LoadingSpinner from '@/components/LoadingSpinner';
import styles from './page.module.scss';

export default function CamerasPage() {
  const { isLoading: authLoading } = useAuthStore();

  if (authLoading) {
    return (
      <div className={styles.loadingContainer}>
        <LoadingSpinner size="large" />
        <p className={styles.loadingText}>Authenticating...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Cameras</h1>

        <div className={styles.comingSoonContainer}>
          <div className={styles.comingSoonContent}>
            <div className={styles.comingSoonIcon}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" fill="none"/>
                <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
            </div>
            <h2 className={styles.comingSoonTitle}>Coming Soon</h2>
            <p className={styles.comingSoonMessage}>
              We&apos;re working hard to bring you an amazing collection of cameras.
              Stay tuned for the latest digital cameras, lenses, and photography equipment.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}