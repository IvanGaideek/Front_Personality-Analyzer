import React from 'react'
import { Link } from 'react-router-dom'

export default function Сopyright({ align_style = '', color = '', team = '' }) {
	const className =
		(!align_style ? 'sm:text-center' : align_style) +
		' ' +
		(!color ? 'text-gray-500 dark:text-gray-400' : color) +
		' ' +
		'block text-sm'
	return (
		<span className={className}>
			© 2025{' '}
			<Link
				to='/docs/team'
				className='hover:underline text-almost-white lato-bold'
			>
				{team}™
			</Link>
			. All Rights Reserved.
		</span>
	)
}
