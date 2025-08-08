import { useAppSelector } from '@/hooks/redux';
import { LoaderCircle } from 'lucide-react';
import router from 'next/router';
import { useEffect } from 'react';

const Home: React.FC = () => {
  const isLogined = useAppSelector(state => state.app.isLogined);

  useEffect(() => {
    if (isLogined) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <LoaderCircle className='w-16 h-16 text-blue-400 animate-spin' />
    </div>
  );
};

export default Home;