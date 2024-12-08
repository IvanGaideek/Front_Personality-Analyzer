import React from 'react'

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
				<div className='flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white'>
					<Icon
						aria-hidden='true'
						className='size-6 text-gray-600 group-hover:text-indigo-600'
					/>
				</div>
			)}
			<div className='flex-auto'>
				{href && (
					<a href={href} className='block font-semibold text-gray-900'>
						{name}
						<span className='absolute inset-0' />
					</a>
				)}
				{description && (
					<p className='mt-1 text-gray-600 open-sans'>{description}</p>
				)}
			</div>
		</div>
	)
}
