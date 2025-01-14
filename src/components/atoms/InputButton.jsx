import React, { useState } from 'react'

export default function InputButton(props) {
	const maxLength = props.maxLength

	const [charCount, setCharCount] = useState(maxLength) // Установите счетчик символов

	const handleInputChange = event => {
		const { value } = event.target
		if (value.length <= maxLength) {
			setCharCount(value.length)
			props.handleInputChange(event)
		}
	}

	return (
		<>
			{' '}
			{/* Основной контейнер на всю ширину */}
			<div className='relative w-full'>
				{' '}
				{/* Контейнер для input и счетчика */}
				<input
					type='text'
					value={props.inputText}
					onChange={handleInputChange}
					onKeyPress={props.handleKeyPress}
					className='w-full p-2 border border-medium-gray bg-gray-800 text-white rounded-lg focus:outline-none focus:ring focus:ring-medium-yellow open-sans sm:text-lg'
					placeholder='Enter a message...'
					maxLength={maxLength}
				/>
				<div className='rounded-lg text-xs poppins-bold absolute right-1 bottom-1 text-medium-yellow bg-black-alpha-70'>
					<span className='p-1'>
						{props.inputText.length} / {maxLength}
					</span>
				</div>
			</div>
			<div className='flex justify-end'>
				<button
					onClick={props.handleSendMessage}
					className={`bg-medium-yellow text-black px-4 py-2 rounded-lg hover:bg-yellow-alpha-80 transition poppins sm:text-lg ${
						props.loading ? 'opacity-50 cursor-not-allowed' : ''
					}`}
					disabled={props.loading} // Деактивация кнопки при загрузке
				>
					{props.titleButton}
				</button>
			</div>
		</>
	)
}
