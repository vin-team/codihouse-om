import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/hooks/redux';
import { selectIsAuthenticated } from '@/slices/authSlice';
import { LoaderCircle } from 'lucide-react';

const Home: React.FC = () => {
  const router = useRouter();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <LoaderCircle className='w-16 h-16 text-blue-400 animate-spin' />
    </div>
  );
};

export default Home;