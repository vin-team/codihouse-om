import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { endRouting, startRouting } from '../slices/app';
import { useRouter } from 'next/router';
import Loading from './Loading';

export default function RouterListener() {
	const router = useRouter();
	const isRouteChanging = useAppSelector(state => state.app.isRouteChanging);
	const dispatch = useAppDispatch();

	useEffect(() => {
		const handleStart = () => dispatch(startRouting());
		const handleComplete = () => dispatch(endRouting());

		router.events.on('routeChangeStart', handleStart);
		router.events.on('routeChangeComplete', handleComplete);
		router.events.on('routeChangeError', handleComplete);

		return () => {
			router.events.off('routeChangeStart', handleStart);
			router.events.off('routeChangeComplete', handleComplete);
			router.events.off('routeChangeError', handleComplete);
		};
	}, []);

	if (!isRouteChanging) return null;

	return (
		<Loading />
	);
}