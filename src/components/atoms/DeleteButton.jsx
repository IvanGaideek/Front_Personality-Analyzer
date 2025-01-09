import React from 'react'

export default function DeleteButton(props) {
	return (
		<button
			className={
				'bg-red-500 text-white px-3 py-1 rounded-md text-xs md:text-sm' +
				props.className
			}
		>
			{props.text}
		</button>
	)
}
