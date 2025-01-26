import React, { useEffect, useRef } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai' // Иконка для индикации загрузки

export default function AnswerBot(props) {
	const messagesEndRef = useRef(null)

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}

	useEffect(() => {
		scrollToBottom()
	}, [props.messages])

	return (
		<div className={props.className}>
			{props.messages.length === 0 && !props.loading ? (
				<div className='flex-grow flex items-center justify-center'>
					<h2 className='text-4xl font-bold lato-bold text-yellow-alpha-80 uppercase text-center'>
						Start chatting with the bot
					</h2>
				</div>
			) : (
				props.messages.map((msg, index) => (
					<div
						key={index}
						className={`my-2 p-3 rounded-lg ${
							msg.sender === 'user'
								? 'bg-all-black border-2 border-medium-yellow text-medium-yellow self-end'
								: 'bg-all-black border-2 border-white text-white self-start'
						}`}
					>
						{msg.text}
					</div>
				))
			)}
			{props.loading && (
				<div className='my-2 p-3 bg-gray-600 rounded-lg flex items-center'>
					<AiOutlineLoading3Quarters className='animate-spin mr-2 h-5 w-5' />
					<span>Waiting for a response...</span>
				</div>
			)}
			<div ref={messagesEndRef} /> {/* Ссылка на конец списка сообщений */}
		</div>
	)
}
