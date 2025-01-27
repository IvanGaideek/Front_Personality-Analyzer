import React, { useState } from 'react'

export default function ButtonLoadModal(props) {
	return (
		<button
			className='bg-gray-800 text-white px-8 rounded-md'
			onClick={() => props.setOpen(true)}
		>
			Create Table
		</button>
	)
}
