import './globals.css';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { HttpService } from '@/services/http/HttpService';
import { useEffect } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/app/store';
import RouterListener from '@/components/RouterListener';
import MainLayout from '@/components/Layout';
import { useAppDispatch } from '@/hooks/redux';
import Loading from '@/components/Loading';
import ClientOnly from '@/components/ClientOnly';
import { ToastProvider } from '@/contexts/ToastContext';
import { ToastContainer } from '@/components/ui/toast-container';

function AppInitializer({ children }: { children: React.ReactNode }) {
	const dispatch = useAppDispatch();

	useEffect(() => {
		HttpService.initialize();
	}, [dispatch]);

	return <>{children}</>;
}

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				{() => (
					<ClientOnly fallback={<Loading />}>
						<ToastProvider>
							<AppInitializer>
								<RouterListener />
								<MainLayout>
									<Component {...pageProps} />
								</MainLayout>
								<ToastContainer />
							</AppInitializer>
						</ToastProvider>
					</ClientOnly>
				)}
			</PersistGate>
		</Provider>
	);
}
