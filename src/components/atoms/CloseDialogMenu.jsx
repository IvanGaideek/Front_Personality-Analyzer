import React from 'react'
import { useMobileMenu } from '../../addition/contexts/MobileContext'
import { XMarkIcon } from '@heroicons/react/24/outline'

export const CloseDialogMenu = ({ className = '' }) => {
	const { mobileMenuOpen, setMobileMenuOpen } = useMobileMenu()

	return (
		<button
			type='button'
			onClick={() => setMobileMenuOpen(false)}
			className={className}
		>
			<XMarkIcon aria-hidden='true' className='size-6' />
		</button>
	)
}
