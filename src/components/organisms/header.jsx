import React from 'react'
import { NavCenter } from '../molecules/header/navigation/NavCenter'
import { PlaceAuthorization } from '../molecules/header/PlaceAuthorization'
import { MobileMenuButton } from '../atoms/MobileMenuOpenBut'
import { MobileMenuProvider } from '../../addition/contexts/MobileContext'
import { Bars3Icon } from '@heroicons/react/24/outline'
import { NavDialogPanel } from '../molecules/header/DialogPanel'
import { IconName } from '../molecules/header/Icon_and_name'
import { Link } from 'react-router-dom'

export const Header = () => {
	return (
		<MobileMenuProvider>
			<header className='gradient-black_bg text-medium-gray'>
				<nav
					aria-label='Global'
					className='mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8 md:px-8'
				>
					<div className='flex lg:flex-1 md:flex-1'>
						<Link to='/docs/overview' className='-m-1.5 p-1.5'>
							<IconName className='flex justify-flex-start items-center gap-4' />
						</Link>
					</div>
					<div className='flex lg:hidden md:hidden'>
						<MobileMenuButton
							Icon={
								<Bars3Icon
									aria-hidden='true'
									className='size-6 text-almost-white'
								/>
							}
							className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
						/>
					</div>
					<NavCenter />
					<PlaceAuthorization className='hidden lg:flex lg:flex-1 md:flex md:flex-1 lg:justify-end lg:space-x-4 md:justify-end md:space-x-4' />
				</nav>
				<NavDialogPanel />
			</header>
		</MobileMenuProvider>
	)
}
