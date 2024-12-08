import React from 'react'

export default function LinkItem({ text, href = '#', className = '' }) {
	return (
		<div>
			<a href={href} class={className}>
				{text}
			</a>
		</div>
	)
}
