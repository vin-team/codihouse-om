import './globals.css';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { HttpService } from '@/services/http/HttpService';
import { useEffect } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/app/store';
import RouterListener from '@/components/RouterListener';
import MainLayout from '@/components/Layout';
import { initializeAuth } from '@/slices/authSlice';
import { useAppDispatch } from '@/hooks/redux';

// Component để khởi tạo app sau khi Provider đã sẵn sàng
function AppInitializer({ children }: { children: React.ReactNode }) {
	const dispatch = useAppDispatch();

	useEffect(() => {
		HttpService.initialize();
		dispatch(initializeAuth());
	}, [dispatch]);

	return <>{children}</>;
}

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				{() => (
					<AppInitializer>
						<RouterListener />
						<MainLayout>
							<Component {...pageProps} />
						</MainLayout>
					</AppInitializer>
				)}
			</PersistGate>
		</Provider>
	);
}