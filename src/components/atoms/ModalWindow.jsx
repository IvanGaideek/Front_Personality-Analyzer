import React from 'react'

export default function ModalWindow(props) {
	return (
		<div className='fixed inset-0 flex items-center justify-center z-200 w-11/12 mx-auto'>
			<div
				className='fixed inset-0 bg-black bg-opacity-50'
				onClick={() => props.setModalIsOpen(false)}
			/>
			<div className='border border-medium-yellow bg-gray-900 text-white rounded-lg p-6 shadow-lg z-10'>
				{props.children}
			</div>
		</div>
	)
}
