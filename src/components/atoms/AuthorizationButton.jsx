import React from 'react'

export const AuthorizationButton = ({
	text,
	href,
	arrow = false,
	className = '',
}) => {
	const all_classes =
		'text-sm/6 font-semibold text-all-black py-2 px-4 rounded-full transition duration-200 focus:outline-none poppins ' +
		className

	return (
		<a href={href} className={all_classes}>
			{text} {arrow && <span aria-hidden='true'>&rarr;</span>}
		</a>
	)
}
