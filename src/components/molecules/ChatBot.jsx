import React, { useState } from 'react'
import AnswerBot from './AnswerBot'
import InputButton from '../atoms/InputButton'

export default function ChatBot() {
	const maxLength = 4000

	const [inputText, setInputText] = useState('')
	const [messages, setMessages] = useState([])
	const [loading, setLoading] = useState(false)

	const handleInputChange = e => {
		setInputText(e.target.value)
	}

	const handleSendMessage = () => {
		// Ограничение на отправку сообщения, если загрузка идет
		if (inputText.trim() === '') return // Проверка на пустое сообщение
		if (loading) {
			alert(
				'Please wait for a response from the bot before sending a new message.'
			) // Оповещение
			return
		}

		// Отправляем сообщение пользователя
		setMessages(prevMessages => [
			...prevMessages,
			{ text: inputText, sender: 'user' },
		])
		setInputText('')
		setLoading(true)

		// Имитация ответа от бота
		setTimeout(() => {
			const botResponse = `Answer: "${inputText}"`
			setMessages(prevMessages => [
				...prevMessages,
				{ text: botResponse, sender: 'bot' },
			])
			setLoading(false)
		}, 2000)
	}

	const handleKeyPress = e => {
		if (e.key === 'Enter') {
			handleSendMessage()
		}
	}

	return (
		<>
			<AnswerBot
				className='flex-1 p-4 overflow-y-auto mb-4 scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-thumb-rounded-full flex flex-col open-sans'
				messages={messages}
				loading={loading}
			/>
			<div className='flex flex-row gap-3 items-center justify-between mb-4'>
				<InputButton
					handleInputChange={handleInputChange}
					handleKeyPress={handleKeyPress}
					handleSendMessage={handleSendMessage}
					inputText={inputText}
					titleButton='Send'
					loading={loading}
					maxLength={maxLength}
				/>
			</div>
		</>
	)
}
