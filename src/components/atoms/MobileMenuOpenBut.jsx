import React from 'react'
import { useMobileMenu } from '../../addition/contexts/MobileContext'

export const MobileMenuButton = ({
	Icon = null,
	className = '',
	condition = true,
}) => {
	const { mobileMenuOpen, setMobileMenuOpen } = useMobileMenu()
	return (
		<button
			type='button'
			onClick={() => setMobileMenuOpen(condition)}
			className={className}
		>
			{Icon}
		</button>
	)
}
