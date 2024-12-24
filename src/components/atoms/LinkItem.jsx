import React from 'react'
import { Link } from 'react-router-dom'

export default function LinkItem({ text, href = '#', className = '' }) {
	return (
		<div>
			<Link to={href} class={className}>
				{text}
			</Link>
		</div>
	)
}
