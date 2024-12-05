import React from 'react'
import { NavCenter } from '../molecules/header/navigation/NavCenter'
import { PlaceAuthorization } from '../molecules/header/PlaceAuthorization'
import { MobileMenuButton } from '../atoms/MobileMenuOpenBut'
import { MobileMenuProvider } from '../../addition/contexts/MobileContext'
import { Bars3Icon } from '@heroicons/react/24/outline'
import { NavDialogPanel } from '../molecules/header/DialogPanel'
import { IconName } from '../molecules/header/Icon_and_name'

export const Header = () => {
	return (
		<MobileMenuProvider>
			<header className='bg-white'>
				<nav
					aria-label='Global'
					className='mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8'
				>
					<div className='flex lg:flex-1'>
						<a href='#' className='-m-1.5 p-1.5'>
							<IconName className='flex justify-flex-start items-center gap-4' />
						</a>
					</div>
					<div className='flex lg:hidden'>
						<MobileMenuButton
							Icon={<Bars3Icon aria-hidden='true' className='size-6' />}
							className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
						/>
					</div>
					<NavCenter />
					<PlaceAuthorization className='hidden lg:flex lg:flex-1 lg:justify-end lg:space-x-4' />
				</nav>
				<NavDialogPanel />
			</header>
		</MobileMenuProvider>
	)
}
