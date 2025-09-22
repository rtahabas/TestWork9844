'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import styles from './Header.module.scss';

export default function Header() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const staticCategories = ['laptops', 'smartphones', 'mobile-accessories'];

  const getCategoryDisplayName = (category: string) => {
    switch (category) {
      case 'laptops':
        return 'Laptops';
      case 'smartphones':
        return 'Smartphones';
      case 'mobile-accessories':
        return 'Accessories';
      default:
        return category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ');
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {/* Top Contact Bar */}
      <div className={styles.topBar}>
        <div className={styles.topContainer}>
          {/* Desktop Content */}
          <div className={styles.desktopTopContent}>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" fill="currentColor"/>
                </svg>
                <span>+021-95-51-84</span>
              </div>
              <div className={styles.contactItem}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" fill="currentColor"/>
                  <polyline points="22,6 12,13 2,6" stroke="#333" strokeWidth="1" fill="none"/>
                </svg>
                <span>shop@abelohost.com</span>
              </div>
              <div className={styles.contactItem}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="currentColor"/>
                  <circle cx="12" cy="10" r="3" fill="#333"/>
                </svg>
                <span>1734 Stonecoal Road</span>
              </div>
            </div>

            <div className={styles.topRight}>
              {isAuthenticated && user ? (
                <div className={styles.userInfo}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" fill="none"/>
                  </svg>
                  <span>{user.firstName} {user.lastName}</span>
                  <button
                    onClick={handleLogout}
                    className={styles.topLogoutButton}
                    type="button"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link href="/login" className={styles.topLoginLink}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" fill="none"/>
                  </svg>
                  <span>Login</span>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Hamburger Menu */}
          <div className={styles.mobileTopContent}>
            <div className={styles.mobileTopLeft}>
              <span className={styles.mobileTitle}>Abelohost Shop</span>
            </div>
            <button
              className={styles.hamburgerButton}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsMenuOpen(!isMenuOpen);
              }}
              aria-label="Toggle menu"
              type="button"
            >
              <span className={`${styles.hamburgerLine} ${isMenuOpen ? styles.hamburgerLineOpen : ''}`}></span>
              <span className={`${styles.hamburgerLine} ${isMenuOpen ? styles.hamburgerLineOpen : ''}`}></span>
              <span className={`${styles.hamburgerLine} ${isMenuOpen ? styles.hamburgerLineOpen : ''}`}></span>
            </button>
          </div>
        </div>
      </div>

      {/* Banner Section */}
      <div className={styles.bannerSection}>
        <div className={styles.bannerContainer}>
          <div className={styles.bannerContent}>
            <h1 className={styles.bannerTitle}>
              Abelohost Shop<span className={styles.dot}>.</span>
            </h1>
          </div>
          <div className={styles.bannerImagePlaceholder}>
            <span className={styles.imageDimensions}>600 x 70</span>
          </div>
        </div>
      </div>

      {/* Navigation Menu - Desktop Only */}
      <nav className={styles.navigationMenu}>
        <div className={styles.navContainer}>
          <Link href="/" className={styles.navItem}>
            Home
          </Link>
          <Link href="/hot-deals" className={styles.navItem}>
            Hot Deals
          </Link>
          <Link href="/categories" className={styles.navItem}>
            Categories
          </Link>
          {staticCategories.map((category) => (
            <Link
              key={category}
              href={`/category/${category}`}
              className={styles.navItem}
            >
              {getCategoryDisplayName(category)}
            </Link>
          ))}
          <Link href="/cameras" className={styles.navItem}>
            Cameras
          </Link>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ''}`}>
        {/* Contact Info in Mobile Menu */}
        <div className={styles.mobileContactSection}>
          <div className={styles.mobileContactItem}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" fill="currentColor"/>
            </svg>
            <span>+021-95-51-84</span>
          </div>
          <div className={styles.mobileContactItem}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" fill="currentColor"/>
              <polyline points="22,6 12,13 2,6" stroke="#333" strokeWidth="1" fill="none"/>
            </svg>
            <span>shop@abelohost.com</span>
          </div>
          <div className={styles.mobileContactItem}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="currentColor"/>
              <circle cx="12" cy="10" r="3" fill="#333"/>
            </svg>
            <span>1734 Stonecoal Road</span>
          </div>
        </div>

        {/* User Info/Login in Mobile Menu */}
        <div className={styles.mobileUserSection}>
          {isAuthenticated && user ? (
            <div className={styles.mobileUserInfo}>
              <div className={styles.mobileUserDetails}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
                <span>{user.firstName} {user.lastName}</span>
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className={styles.mobileLogoutButton}
                type="button"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login" className={styles.mobileLoginLink} onClick={() => setIsMenuOpen(false)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" fill="none"/>
                <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
              <span>Login</span>
            </Link>
          )}
        </div>

        {/* Navigation Links in Mobile Menu */}
        <div className={styles.mobileNavSection}>
          <Link href="/" className={styles.mobileNavItem} onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link href="/hot-deals" className={styles.mobileNavItem} onClick={() => setIsMenuOpen(false)}>
            Hot Deals
          </Link>
          <Link href="/categories" className={styles.mobileNavItem} onClick={() => setIsMenuOpen(false)}>
            Categories
          </Link>
          {staticCategories.map((category) => (
            <Link
              key={category}
              href={`/category/${category}`}
              className={styles.mobileNavItem}
              onClick={() => setIsMenuOpen(false)}
            >
              {getCategoryDisplayName(category)}
            </Link>
          ))}
          <Link href="/cameras" className={styles.mobileNavItem} onClick={() => setIsMenuOpen(false)}>
            Cameras
          </Link>
        </div>
      </div>
    </>
  );
}