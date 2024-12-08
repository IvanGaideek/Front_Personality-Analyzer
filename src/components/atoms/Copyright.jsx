import React from 'react'

export default function Сopyright({ align_style = '', color = '', team = '' }) {
	const className =
		(!align_style ? 'sm:text-center' : align_style) +
		' ' +
		(!color ? 'text-gray-500 dark:text-gray-400' : color) +
		' ' +
		'block text-sm'
	return (
		<span class={className}>
			© 2025{' '}
			<a href='#' class='hover:underline text-almost-white lato-bold'>
				{team}™
			</a>
			. All Rights Reserved.
		</span>
	)
}
