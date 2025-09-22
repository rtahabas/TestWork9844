'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getProductsByCategory } from '@/services/api';
import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useAuthStore } from '@/store/authStore';
import styles from './category.module.scss';

export default function CategoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isLoading: authLoading } = useAuthStore();
  const { slug } = useParams();

  useEffect(() => {
    if (!slug) return;

    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getProductsByCategory(slug as string, 12);
        setProducts(response.products);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load products'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [slug]);

  if (authLoading || isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <LoadingSpinner size="large" />
        <p className={styles.loadingText}>
          {authLoading ? 'Authenticating...' : 'Loading products...'}
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorBox}>
          <h2 className={styles.errorTitle}>Error Loading Products</h2>
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

  const categoryName = slug ? (slug as string).charAt(0).toUpperCase() + (slug as string).slice(1).replace(/-/g, ' ') : 'Category';

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>{categoryName}</h1>

        {products.length === 0 ? (
          <div className={styles.emptyState}>
            <p className={styles.emptyMessage}>No products found in this category.</p>
          </div>
        ) : (
          <div className={styles.productsGrid}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}