import React from 'react'
import { Link } from 'react-router-dom'

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
		<Link to={href} className={all_classes}>
			{text} {arrow && <span aria-hidden='true'>&rarr;</span>}
		</Link>
	)
}
