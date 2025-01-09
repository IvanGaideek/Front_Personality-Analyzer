import React from 'react'
import { Link } from 'react-router-dom'

export default function CardMinimalistic({
	name,
	description,
	href,
	className = '',
}) {
	return (
		<div className={className}>
			<div className='mb-2 py-8 px-7 transition-all hover:shadow-lg sm:p-9 lg:px-4 xl:px-7'>
				<Link
					to={href}
					className='group mx-auto mb-7 block h-[12rem] p-6 bg-all-black border-2 border-white rounded-lg shadow hover:bg-white overflow-hidden'
				>
					<h5 className='mb-2 text-2xl font-bold tracking-tight overflow-hidden text-ellipsis text-white group-hover:text-all-black lato-bold'>
						{name}
					</h5>
					<p className='font-normal text-medium-gray overflow-hidden text-ellipsis group-hover:text-black-alpha-70 lato-regular'>
						{description}
					</p>
				</Link>
			</div>
		</div>
	)
}
