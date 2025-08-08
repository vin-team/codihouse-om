import './globals.css';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { HttpService } from '@/services/http/HttpService';
import { useEffect, useState } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/app/store';
import RouterListener from '@/components/RouterListener';
import MainLayout from '@/components/Layout';
import { useAppDispatch } from '@/hooks/redux';
import { ToastProvider } from '@/contexts/ToastContext';
import { ToastContainer } from '@/components/ui/toast-container';
import AuthGuard from '@/components/AuthGuard';

function AppInitializer({ children }: { children: React.ReactNode }) {
	const dispatch = useAppDispatch();

	useEffect(() => {
		HttpService.initialize();
	}, [dispatch]);

	return <>{children}</>;
}

export default function App({ Component, pageProps }: AppProps) {
	const [isClient, setIsClient] = useState(false)

	useEffect(() => {
		setIsClient(true)
	}, [])

	if (!isClient) return null;

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				{() => (
					<ToastProvider>
						<AppInitializer>
							<AuthGuard>
								<RouterListener />
								<MainLayout>
									<Component {...pageProps} />
								</MainLayout>
								<ToastContainer />
							</AuthGuard>
						</AppInitializer>
					</ToastProvider>
				)}
			</PersistGate>
		</Provider>
	);
}
