'use client'
import { ReactNode } from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
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
	return (
		<>
			<Head>

				<meta charSet='UTF-8' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<meta property="og:type" content="website" />
				<meta name="keywords" content="Codihouse" />
				<title>Codihouse OM</title>
			</Head>
			<div className={'page-layout'}>
				<Header />
				<main className='page-layout-main'>
					{children}
				</main>
				<Footer />
			</div>
		</>
	);
}