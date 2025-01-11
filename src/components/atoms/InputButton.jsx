import React from 'react'

export default function InputButton(props) {
	return (
		<>
			<input
				type='text'
				value={props.inputText}
				onChange={props.handleInputChange}
				onKeyPress={props.handleKeyPress}
				className='flex-1 p-2 border border-medium-gray bg-gray-800 text-white rounded-lg focus:outline-none focus:ring focus:ring-medium-yellow open-sans sm:text-lg'
				placeholder='Enter a message...'
			/>
			<button
				onClick={props.handleSendMessage}
				className={`ml-2 bg-medium-yellow text-black px-4 py-2 rounded-lg hover:bg-yellow-alpha-80 transition poppins sm:text-lg ${
					props.loading ? 'opacity-50 cursor-not-allowed' : ''
				}`}
				disabled={props.loading} // Деактивация кнопки при загрузке
			>
				{props.titleButton}
			</button>
		</>
	)
}
