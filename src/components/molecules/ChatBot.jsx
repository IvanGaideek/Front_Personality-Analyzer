import React, { useEffect, useState } from 'react'
import AnswerBot from './AnswerBot'
import InputButton from '../atoms/InputButton'

export default function ChatBot({
	maxWords = 4000,
	initialMessages = [],
	isDownloadConfirm,
	loadingDatabase,
	loadingMessage,
	setLoadingMessage,
}) {
	const [inputText, setInputText] = useState('')
	const [messages, setMessages] = useState([])

	// Добавляем результаты анализа в чат при их получении
	useEffect(() => {
		if (initialMessages.length > 0) {
			const analysisMessages = constructMessage(initialMessages)
			setMessages(prev => [...prev, ...analysisMessages])
		}
	}, [initialMessages])

	const constructMessage = data_messages => {
		return data_messages.map(result => ({
			text: `${result.personName} - ${result.analysis} -> Write in DB: ${
				result.writingDatabase
					? result.writingDatabase
					: 'Not writing this down'
			}`,
			sender: 'bot',
		}))
	}

	const handleInputChange = e => {
		setInputText(e.target.value)
	}

	const analyzeMessage = async () => {
		let mockResult = null
		try {
			// Разделение текста на две части
			const [person, ...texts] = inputText.split(' - ')
			// Склеиваем оставшиеся части обратно (если разделителей было больше одного)
			const text_user = texts.join(' - ') // отправляю на анализ в бекэнд
			if (
				person < 1 ||
				text_user.split(' ').filter(word => word !== '').length < 4
			) {
				mockResult = {
					personName: 'Error',
					analysis:
						'insufficient or incorrect input (check out the documentation)',
					writingDatabase: 'undefined',
				}
			} else if (isDownloadConfirm) {
				// Имитация ответа от сервера для примера с записью в БД
				// При отправке запроса передаём loadingDatabase, содержащий информацию, куда записывать результаты
				console.log(loadingDatabase)
				mockResult = {
					personName: person,
					analysis: 'MBTI',
					writingDatabase: 'Successful entry in the database!',
				}
			} else {
				// Имитация ответа от сервера для примера без записи в БД
				mockResult = {
					personName: person,
					analysis: 'MBTI',
					writingDatabase: false,
				}
			}
		} catch (error) {
			mockResult = {
				personName: 'Error',
				analysis: error.messages,
				writingDatabase: 'undefined',
			}
		}
		const analysisMessages = constructMessage([mockResult])
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
