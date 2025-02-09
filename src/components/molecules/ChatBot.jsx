import React, { useEffect, useState } from 'react'
import AnswerBot from './AnswerBot'
import InputButton from '../atoms/InputButton'
import {
	searchClass,
	constructMessageClass,
} from '../../addition/function_to_backend/analysis_result_chat'

export default function ChatBot({
	maxWords = 4000,
	initialMessages = [],
	isDownloadConfirm,
	loadingDatabase,
	loadingMessage,
	setLoadingMessage,
	typeAnalysis = 'class_1',
}) {
	const [inputText, setInputText] = useState('')
	const [messages, setMessages] = useState([])

	// Добавляем результаты анализа в чат при их получении
	useEffect(() => {
		if (initialMessages.length > 0) {
			const analysisMessages = constructMessageClass(initialMessages)
			setMessages(prev => [...prev, ...analysisMessages])
		}
	}, [initialMessages])

	const handleInputChange = e => {
		setInputText(e.target.value)
	}

	const analyzeMessage = async () => {
		let analysisMessages = []
		if (typeAnalysis == 'class_1') {
			analysisMessages = searchClass(
				inputText,
				isDownloadConfirm,
				loadingDatabase
			)
		}
		setMessages(prev => [...prev, ...analysisMessages])
	}

	const handleSendMessage = () => {
		// Ограничение на отправку сообщения, если загрузка идет
		if (inputText.trim() === '') return // Проверка на пустое сообщение
		if (loadingMessage) {
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
		setLoadingMessage(true)

		// Имитация ответа от бота
		setTimeout(() => {
			analyzeMessage()
			setInputText('')
			setLoadingMessage(false)
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
				loading={loadingMessage}
			/>
			<div className='flex flex-row gap-3 items-center justify-between mb-4'>
				<InputButton
					handleInputChange={handleInputChange}
					handleKeyPress={handleKeyPress}
					handleSendMessage={handleSendMessage}
					inputText={inputText}
					titleButton='Send'
					loading={loadingMessage}
					maxWords={maxWords}
				/>
			</div>
		</>
	)
}
