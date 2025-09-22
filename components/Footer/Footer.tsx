'use client';

import { useAuthStore } from '@/store/authStore';
import styles from './Footer.module.scss';

export default function Footer() {
  const { user, isAuthenticated } = useAuthStore();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.text}>
          © {currentYear}
          {isAuthenticated && user && (
            <span className={styles.userEmail}>
              {' '}
              - Logged as {user.email}
            </span>
          )}
        </p>
      </div>
    </footer>
  );
}