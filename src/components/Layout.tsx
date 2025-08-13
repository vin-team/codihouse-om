'use client'
import { ReactNode, useEffect, useState } from 'react';
import Head from 'next/head';
import Header from './Header';
import { SearchDialog } from './search/SearchDialog';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setIsOpenSearchDialog } from '@/slices/app';
import { SidebarInset, SidebarProvider } from './ui/sidebar';
import { AppSidebar } from './app-sidebar';
import Loading from './Loading';
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
	const dispatch = useAppDispatch();
	const isOpenSearchDialog = useAppSelector(state => state.app.isOpenSearchDialog);
	const isLogined = useAppSelector(state => state.app.isLogined);

	return (
		<>
			<Head>
				<meta charSet='UTF-8' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<meta property="og:type" content="website" />
				<meta name="keywords" content="LNC" />
				<title>LNC</title>
			</Head>
			{isLogined ? <div>
				<Header />
				<SidebarProvider className="pt-16 min-h-screen flex flex-row overflow-x-hidden">
					<AppSidebar />
					<SidebarInset>
						<div className="flex flex-1 min-w-0 flex-col gap-4 p-4 overflow-x-hidden">
							<div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min">
								{children}
							</div>
						</div>
					</SidebarInset>
				</SidebarProvider>
			</div> :
				<div>
					<Header />
					<div className="flex flex-1 flex-col gap-4 p-4">
						<div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min">
							{children}
						</div>
					</div>
				</div>
			}

			<SearchDialog isOpen={isOpenSearchDialog} onClose={() => dispatch(setIsOpenSearchDialog(false))} />
		</>
	);
}