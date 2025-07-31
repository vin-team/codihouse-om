import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppSelector } from './redux';
import { selectIsAuthenticated } from '@/slices/authSlice';
import { storage } from '@/utils/storage.util';

export const useRedirectAfterLogin = () => {
  const router = useRouter();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      const redirectPath = storage.getItem('redirectAfterLogin');
      if (redirectPath && redirectPath !== '/login') {
        storage.removeItem('redirectAfterLogin');
        router.push(redirectPath);
      } else {
        router.push('/');
      }
    }
  }, [isAuthenticated, router]);
}; 