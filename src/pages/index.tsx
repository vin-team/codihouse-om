import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/hooks/redux';
import { selectIsAuthenticated } from '@/slices/authSlice';

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
            <div className="text-center">
                <h1 className="text-2xl font-semibold mb-4">Đang chuyển hướng...</h1>
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
            </div>
        </div>
    );
};

export default Home;