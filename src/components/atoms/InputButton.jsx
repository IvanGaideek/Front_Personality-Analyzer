import React, { useState } from 'react'

export default function InputButton(props) {
	const maxWords = props.maxWords

	// Установить счетчик слов
	const [wordCount, setWordCount] = useState(getWordCount(props.inputText))

	// Функция для подсчета слов
	function getWordCount(text) {
		return text.trim() === '' ? 0 : text.trim().split(/\s+/).length
	}

	// Обработчик изменения ввода
	const handleInputChange = event => {
		const { value } = event.target
		const wc = getWordCount(value)
		if (wc <= maxWords) {
			setWordCount(wc)
			props.handleInputChange(event)
		}
	}

	return (
		<>
			<div className='relative w-full'>
				<input
					type='text'
					value={props.inputText}
					onChange={handleInputChange}
					onKeyPress={props.handleKeyPress}
					className='w-full p-2 border border-medium-gray bg-gray-800 text-white rounded-lg focus:outline-none focus:ring focus:ring-medium-yellow open-sans sm:text-lg'
					placeholder='Enter a message...'
				/>
				<div className='rounded-lg text-xs poppins-bold absolute right-1 bottom-1 text-medium-yellow bg-black-alpha-70'>
					<span className='p-1'>
						{wordCount} / {maxWords}
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
