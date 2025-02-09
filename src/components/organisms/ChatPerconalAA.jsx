import React from 'react'
import ChatBot from '../molecules/ChatBot'
import BoxUploadFiles from '../molecules/FileUploadingInChat'

export default function ChatPersonalAA({ title }) {
	return (
		<>
			<div className='flex flex-col h-screen p-4 sm:p-6 bg-transparent text-white'>
				<div className='mb-4'>
					<h1 className='text-2xl sm:text-3xl poppins-bold text-medium-yellow'>
						{title}
					</h1>
				</div>
				<BoxUploadFiles
					path_upload='/ai/upload'
					path_delete='/ai/delete'
					define_analysis={false}
				/>
				<ChatBot maxWords={3000} typeAnalysis='llm' />
			</div>
		</>
	)
}
