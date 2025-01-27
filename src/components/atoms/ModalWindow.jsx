import React from 'react'

export default function ModalWindow(props) {
	return (
		<div className='fixed inset-0 flex items-center justify-center z-30'>
			<div
				className='fixed inset-0 bg-black bg-opacity-50 z-25'
				onClick={() => props.setModalIsOpen(false)}
			/>
			<div className='border border-medium-yellow bg-gray-900 text-white rounded-lg p-1 md:p-4 shadow-lg z-10 w-screen md:w-1/2 mx-auto'>
				{props.children}
			</div>
		</div>
	)
}
