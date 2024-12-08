import React from 'react'
import { useMobileMenu } from '../../../addition/contexts/MobileContext'
import { Dialog, DialogPanel } from '@headlessui/react'
import { MobileMenuButton } from '../../atoms/MobileMenuOpenBut'
import { CloseDialogMenu } from '../../atoms/CloseDialogMenu'
import { Bars3Icon } from '@heroicons/react/24/outline'
import { DialogListItems } from '../../atoms/DialogListItems'
import { PlaceAuthorization } from './PlaceAuthorization'

export const NavDialogPanel = () => {
	const { mobileMenuOpen, setMobileMenuOpen } = useMobileMenu()

	return (
		<Dialog
			open={mobileMenuOpen}
			onClose={setMobileMenuOpen}
			className='lg:hidden'
		>
			<div className='fixed inset-0 z-10' />
			<DialogPanel className='fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-almost-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 poppins-bold'>
				<div className='flex items-center justify-between'>
					<MobileMenuButton
						Icon={<Bars3Icon aria-hidden='true' className='size-6' />}
						className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
						condition={false}
					/>
					<CloseDialogMenu className='-m-2.5 rounded-md p-2.5 text-gray-700' />
				</div>
				<div className='mt-6 flow-root'>
					<div className='-my-6 divide-y divide-gray-500/10'>
						<div className='space-y-2 py-6'>
							<a
								href='#'
								className='-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-black-alpha-10'
							>
								Product
							</a>
							<DialogListItems title='Features' />
							<a
								href='#'
								className='-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-black-alpha-10'
							>
								API
							</a>
						</div>
						<PlaceAuthorization className='py-6 flex flex-1 justify-center space-x-4' />
					</div>
				</div>
			</DialogPanel>
		</Dialog>
	)
}
