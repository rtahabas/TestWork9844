'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCategories } from '@/services/api';
import { Category } from '@/types';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useAuthStore } from '@/store/authStore';
import styles from './page.module.scss';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isLoading: authLoading } = useAuthStore();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getCategories();
        setCategories(response);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load categories'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const getAvailableCategories = () => {
    const availableCategories = ['laptops', 'smartphones', 'mobile-accessories'];
    return categories.filter(category =>
      availableCategories.includes(category.slug.toLowerCase())
    );
  };

  const getUnavailableCategories = () => {
    const availableCategories = ['laptops', 'smartphones', 'mobile-accessories'];
    return categories.filter(category =>
      !availableCategories.includes(category.slug.toLowerCase())
    );
  };

  if (authLoading || isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <LoadingSpinner size="large" />
        <p className={styles.loadingText}>
          {authLoading ? 'Authenticating...' : 'Loading categories...'}
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorBox}>
          <h2 className={styles.errorTitle}>Error Loading Categories</h2>
          <p className={styles.errorMessage}>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className={styles.retryButton}
            type="button"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const availableCategories = getAvailableCategories();
  const unavailableCategories = getUnavailableCategories();

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Product Categories</h1>

        {availableCategories.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Available Categories</h2>
            <div className={styles.categoriesGrid}>
              {availableCategories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  className={styles.categoryCard}
                >
                  <div className={styles.categoryContent}>
                    <h3 className={styles.categoryName}>{category.name}</h3>
                    <p className={styles.categoryDescription}>
                      Explore our {category.name.toLowerCase()} collection
                    </p>
                    <span className={styles.viewProducts}>View Products</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {unavailableCategories.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Coming Soon</h2>
            <div className={styles.categoriesGrid}>
              {unavailableCategories.map((category) => (
                <div
                  key={category.slug}
                  className={`${styles.categoryCard} ${styles.comingSoon}`}
                >
                  <div className={styles.categoryContent}>
                    <h3 className={styles.categoryName}>{category.name}</h3>
                    <p className={styles.categoryDescription}>
                      {category.name} products coming soon
                    </p>
                    <span className={styles.comingSoonLabel}>Coming Soon</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}