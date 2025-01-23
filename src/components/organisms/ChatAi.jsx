import React from 'react'

export default function ChatAi({ title = 'AI Chat Bot', chat }) {
	return (
		<div className='flex flex-col h-screen p-4 sm:p-6 bg-transparent text-white'>
			<div className='mb-4'>
				<h1 className='text-2xl sm:text-3xl poppins-bold text-medium-yellow'>
					{title}
				</h1>
			</div>
			{chat}
		</div>
	)
}
