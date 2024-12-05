import React from 'react'

export const AuthorizationButton = ({ text, href, arrow = false }) => {
	return (
		<a href={href} className='text-sm/6 font-semibold text-gray-900'>
			{text} {arrow && <span aria-hidden='true'>&rarr;</span>}
		</a>
	)
}
