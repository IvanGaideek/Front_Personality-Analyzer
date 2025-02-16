import React, { useState } from 'react'
import UploadChatInBD from '../../molecules/loadBD/UploadChatInBD'
import HorizontalLine from '../../atoms/HorizontalLine'
import ChatBot from '../../molecules/ChatBot'
import BoxUploadFiles from '../../molecules/FileUploadingInChat'

const maxWordsChat = 1024

export default function ChatFraudDetection({ title }) {
	const [isDownloadConfirm, setDownloadConfirm] = useState(false) // состояние дающее разрешение на загрузку в БД данных
	const [analysisResults, setAnalysisResults] = useState([])
	const [loadingDatabase, setLoadingDatabase] = useState({
		selectedTable: '',
		personColumn: '',
		classColumn: '',
		needAnalysisPhone: false,
		writingPhoneColumn: '',
		locationPhoneColumn: '',
		providerPhoneColumn: '',
		fraudDetectionPhoneColumn: '',
	}) // куда загружать данные в БД
	const [loadingMessage, setLoadingMessage] = useState(false)
	const [personName, setPersonName] = useState('')

	const handleAnalysisResult = results => {
		// Преобразуем результаты анализа в формат сообщений чата
		const chatMessages = results.map(result => ({
			personName: result.fileName.split('.')[0],
			analysis: result.analysis,
			writingDatabase: result.writingDatabase,
		}))
		setAnalysisResults(chatMessages)
	}

	return (
		<div className='flex flex-col p-4 sm:p-6 bg-transparent text-white'>
			<div className='flex flex-col h-screen p-4 sm:p-6 bg-transparent text-white'>
				<div className='mb-4'>
					<h1 className='text-2xl sm:text-3xl poppins-bold text-medium-yellow'>
						{title}
					</h1>
				</div>
				<BoxUploadFiles
					path_upload='/fraud-detection/upload'
					path_delete='/fraud-detection/delete'
					handleAnalysisResult={handleAnalysisResult}
					loadingDatabase={loadingDatabase}
					isDownloadConfirm={isDownloadConfirm}
					setLoadingMessage={setLoadingMessage}
					typeSave='eachAnalysis_fs_detect'
				/>

				<ChatBot
					maxWords={maxWordsChat}
					initialMessages={analysisResults}
					isDownloadConfirm={isDownloadConfirm}
					loadingDatabase={loadingDatabase}
					loadingMessage={loadingMessage}
					setLoadingMessage={setLoadingMessage}
					personName={personName}
				/>
			</div>
			<div>
				<HorizontalLine color='border border-almost-white' etc_style='my-4' />
			</div>

			<UploadChatInBD
				isDownloadConfirm={isDownloadConfirm}
				setDownloadConfirm={setDownloadConfirm}
				loadingDatabase={loadingDatabase}
				setLoadingDatabase={setLoadingDatabase}
				personName={personName}
				setPersonName={setPersonName}
				analysis_phone={true}
			/>
		</div>
	)
}
