import React, { useState } from 'react'
import ChatBot from '../molecules/ChatBot'
import BoxUploadFiles from '../molecules/FileUploadingInChat'
import HorizontalLine from '../atoms/HorizontalLine'
import UploadChatInBD from '../molecules/loadBD/UploadChatInBD'

export default function ChatPersonalAA({ title }) {
	const [isDownloadConfirm, setDownloadConfirm] = useState(false) // состояние дающее разрешение на загрузку в БД данных
	const [loadingDatabase, setLoadingDatabase] = useState({
		selectedTable: '',
		personColumn: '',
		classColumn: '',
	}) // куда загружать данные в БД
	const [loadingMessage, setLoadingMessage] = useState(false)
	const [personName, setPersonName] = useState('')
	const [useSearchInternet, setUseSearchInternet] = useState(false)

	return (
		<>
			<div className='flex flex-col p-4 sm:p-6 bg-transparent text-white'>
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
						setLoadingMessage={setLoadingMessage}
						typeSave='llm'
					/>
					<ChatBot
						maxWords={3000}
						typeAnalysis='llm'
						loadingMessage={loadingMessage}
						setLoadingMessage={setLoadingMessage}
						useSearchInternet={useSearchInternet}
						isDownloadConfirm={isDownloadConfirm}
					/>
				</div>
				<div>
					<HorizontalLine
						color='border border-medium-yellow'
						etc_style='my-4'
					/>
				</div>

				<UploadChatInBD
					isDownloadConfirm={isDownloadConfirm}
					setDownloadConfirm={setDownloadConfirm}
					loadingDatabase={loadingDatabase}
					setLoadingDatabase={setLoadingDatabase}
					personName={personName}
					setPersonName={setPersonName}
					func_search_internet={true}
					useSearchInternet={useSearchInternet}
					setUseSearchInternet={setUseSearchInternet}
				/>
			</div>
		</>
	)
}
