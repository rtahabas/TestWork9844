'use client';

import { useEffect } from 'react';
import { initializeAuth } from '@/store/authStore';

export default function AuthInitializer() {
  useEffect(() => {
    initializeAuth();
  }, []);

  return null;
}