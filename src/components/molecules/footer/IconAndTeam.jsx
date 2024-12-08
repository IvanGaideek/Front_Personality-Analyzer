import React from 'react'

export default function IconAndTeam({
	Image = '',
	href = '#',
	team = '',
	classTeam = '',
}) {
	return (
		<div>
			<a
				href={href}
				class='flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse'
			>
				<Image
					className='h-8 text-medium-yellow'
					aria-hidden='true'
					alt='Group'
				/>
				<span class={'self-center ' + classTeam}>{team}</span>
			</a>
		</div>
	)
}
