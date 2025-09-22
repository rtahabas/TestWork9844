'use client';

import { Product } from '@/types';
import { useAuthStore } from '@/store/authStore';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { isAuthenticated } = useAuthStore();


  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className={styles.image}
          loading="lazy"
        />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{product.title}</h3>
        <p className={styles.category}>{product.category}</p>
        <p className={styles.price}>${product.price.toFixed(2)}</p>

        {isAuthenticated && (
          <button className={styles.addToCartButton} type="button">
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
}
