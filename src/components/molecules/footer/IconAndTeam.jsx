import React from 'react'
import { Link } from 'react-router-dom'

export default function IconAndTeam({
	Image = '',
	href = '/',
	team = '',
	classTeam = '',
}) {
	return (
		<div>
			<Link
				to={href}
				className='flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse'
			>
				<Image
					className='h-8 text-medium-yellow'
					aria-hidden='true'
					alt='Group'
				/>
				<span className={'self-center ' + classTeam}>{team}</span>
			</Link>
		</div>
	)
}
