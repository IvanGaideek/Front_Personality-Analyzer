import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function LinkItem({
	text,
	href = '#',
	className = '',
	navLink = false,
}) {
	return (
		<div>
			{navLink ? (
				<NavLink to={href} className={className}>
					{text}
				</NavLink>
			) : (
				<Link to={href} className={className}>
					{text}
				</Link>
			)}
		</div>
	)
}
