import { FC, PropsWithChildren } from 'react'

import Footer from '@/app/(main)/_components/footer'
import Header from '@/app/(main)/_components/header'

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<main className='flex h-screen items-center justify-center'>
			<div className='h-full w-full overflow-y-auto sm:w-[400px] sm:rounded-xl sm:border sm:border-foreground/20 sm:shadow-md'>
				<Header />
				{children}
				<Footer />
			</div>
		</main>
	)
}

export default MainLayout
