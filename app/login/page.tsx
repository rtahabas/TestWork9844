'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import LoadingSpinner from '@/components/LoadingSpinner';
import styles from './login.module.scss';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
    general?: string;
  }>({});

  const { login, isAuthenticated, isLoading, error } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!username.trim()) {
      newErrors.username = 'Username is required';
    } else if (username.trim().length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.trim().length < 3) {
      newErrors.password = 'Password must be at least 3 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await login({ username: username.trim(), password: password.trim() });
    } catch {
      // Error is already handled by the store
    }
  };

  const handleInputChange = (field: 'username' | 'password', value: string) => {
    if (field === 'username') {
      setUsername(value);
      if (errors.username) {
        setErrors(prev => ({ ...prev, username: undefined }));
      }
    } else {
      setPassword(value);
      if (errors.password) {
        setErrors(prev => ({ ...prev, password: undefined }));
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>Login</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              className={`${styles.input} ${
                errors.username ? styles.inputError : ''
              }`}
              placeholder="Username"
              disabled={isLoading}
            />
            {errors.username && (
              <span className={styles.errorMessage}>{errors.username}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className={`${styles.input} ${
                errors.password ? styles.inputError : ''
              }`}
              placeholder="Password"
              disabled={isLoading}
            />
            {errors.password && (
              <span className={styles.errorMessage}>{errors.password}</span>
            )}
          </div>

          {error && (
            <div className={styles.generalError}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={styles.submitButton}
          >
            {isLoading ? (
              <LoadingSpinner size="small" />
            ) : (
              'Login'
            )}
          </button>
        </form>

        <div className={styles.demoCredentials}>
          <p className={styles.demoTitle}>Demo Credentials:</p>
          <p className={styles.demoText}>Username: emilys</p>
          <p className={styles.demoText}>Password: emilyspass</p>
        </div>
      </div>
    </div>
  );
}