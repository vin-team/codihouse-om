'use client'
import { ReactNode } from 'react';
import Head from 'next/head';
import Header from './Header';
import { SearchDialog } from './search/SearchDialog';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/hooks/redux';
import { setIsOpenSearchDialog } from '@/slices/app';
interface IMainLayoutProps {
	children: ReactNode | ReactNode[];
	title?: string;
	metaData?: IMetaData;
}

interface IMetaData {
	canonicalUrl?: string;
	imgUrl?: string | null;
	description?: string | null;
}
export default function MainLayout({ children }: IMainLayoutProps) {
	const dispatch = useDispatch();
	const isOpenSearchDialog = useAppSelector(state => state.app.isOpenSearchDialog);

	return (
		<>
			<Head>
				<meta charSet='UTF-8' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<meta property="og:type" content="website" />
				<meta name="keywords" content="Codihouse" />
				<title>Codihouse OM</title>
			</Head>
			<div>
				<Header />
				<main className="pt-8 min-h-full">
					{children}
				</main>
			</div>
			<SearchDialog isOpen={isOpenSearchDialog} onClose={() => dispatch(setIsOpenSearchDialog(false))} />
		</>
	);
}