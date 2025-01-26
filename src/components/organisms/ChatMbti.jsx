import React, { useState } from 'react'
import ChatBot from '../molecules/ChatBot'
import { BoxUploadFiles } from '../molecules/FileUploadingInChat'
import UploadChatInBD from '../molecules/loadBD/UploadChatInBD'
import HorizontalLine from '../atoms/HorizontalLine'
import { UploadEnabled } from '../../addition/contexts/UploadAnalizerData'

export default function ChatMbti({ title }) {
	const [isUploadEnabled, setUploadEnabled] = useState(false)
	const [analysisResults, setAnalysisResults] = useState([])

	const handleChatAnalysis = async (person, question, answer) => {
		try {
			const response = await fetch('/save-chat-analysis', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'X-CSRF-Token': await getCSRFToken(),
				},
				body: JSON.stringify({
					table: selectedTable,
					personColumn,
					classColumn,
					person,
					question,
					answer,
				}),
			})

			if (!response.ok) {
				throw new Error('Failed to save chat analysis.')
			}
		} catch (error) {
			console.error('Error:', error.message)
		}
	}

	const handleAnalysisResult = results => {
		setAnalysisResults(results)

		results.forEach(async ({ fileName, analysis }) => {
			await handleChatAnalysis(fileName, 'Analyzed', analysis)
		})

		setUploadSuccess('Files analyzed and uploaded successfully!')
	}

	return (
		<UploadEnabled.Provider value={[isUploadEnabled, setUploadEnabled]}>
			<div className='flex flex-col p-4 sm:p-6 bg-transparent text-white'>
				<div className='flex flex-col h-screen p-4 sm:p-6 bg-transparent text-white'>
					<div className='mb-4'>
						<h1 className='text-2xl sm:text-3xl poppins-bold text-medium-yellow'>
							{title}
						</h1>
					</div>

					<BoxUploadFiles
						path_upload='/mbti/upload'
						path_delete='/mbti/delete'
						handleAnalysisResult={handleAnalysisResult}
						analysisResults={analysisResults}
					/>

					{analysisResults.length > 0 && (
						<ChatBot maxWords={1024} initialMessages={analysisResults} />
					)}
				</div>

				<div>
					<HorizontalLine color='border border-almost-white' etc_style='my-4' />
				</div>

				<UploadChatInBD />
			</div>
		</UploadEnabled.Provider>
	)
}
