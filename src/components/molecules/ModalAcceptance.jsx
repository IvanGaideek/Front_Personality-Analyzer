import React from 'react'

export default function ModalAcceptance(props) {
	const handleDelete = () => {
		// Логика удаления
		console.log('Удаление...')
		props.setModalIsOpen(false)
	}

	return (
		<>
			<h2 className='text-lg poppins'>{props.title}</h2>
			<p className='py-2 open-sans'>{props.description}</p>
			<div className='flex justify-end'>
				<button
					onClick={handleDelete}
					className='bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded-md mr-2'
				>
					{props.name_button}
				</button>
				<button
					onClick={() => props.setModalIsOpen(false)}
					className='bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded-md'
				>
					Cancel
				</button>
			</div>
		</>
	)
}
