import React from 'react'
import { Link } from 'react-router-dom'

export const NavItem = ({
	name,
	className = '',
	Icon = null,
	description = null,
	href = null,
}) => {
	return (
		<div key={name} className={className}>
			{Icon && (
				<div className='flex size-11 flex-none items-center justify-center rounded-lg bg-black-alpha-5 group-hover:bg-black-alpha-90'>
					<Icon
						aria-hidden='true'
						className='size-6 text-gray-600 group-hover:text-medium-yellow'
					/>
				</div>
			)}
			<div className='flex-auto'>
				{href && (
					<Link to={href} className='block font-semibold text-gray-900'>
						{name}
						<span className='absolute inset-0' />
					</Link>
				)}
				{description && (
					<p className='mt-1 text-gray-600 open-sans'>{description}</p>
				)}
			</div>
		</div>
	)
}
