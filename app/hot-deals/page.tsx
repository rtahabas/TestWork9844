'use client';

import { useAuthStore } from '@/store/authStore';
import LoadingSpinner from '@/components/LoadingSpinner';
import styles from './page.module.scss';

export default function HotDealsPage() {
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
        <h1 className={styles.title}>Hot Deals</h1>

        <div className={styles.comingSoonContainer}>
          <div className={styles.comingSoonContent}>
            <div className={styles.comingSoonIcon}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
            </div>
            <h2 className={styles.comingSoonTitle}>Coming Soon</h2>
            <p className={styles.comingSoonMessage}>
              We're preparing amazing deals and special offers for you.
              Check back soon for incredible discounts on your favorite products.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}