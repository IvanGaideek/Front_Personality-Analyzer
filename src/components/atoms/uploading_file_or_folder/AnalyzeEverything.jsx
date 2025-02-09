import React from 'react'

const AnalyzeEverything = ({
	files,
	setError,
	handleAnalysisResult,
	isDownloadConfirm,
	loadingDatabase,
	setLoadingMessage,
}) => {
	const analyzeFiles = async () => {
		setLoadingMessage(true)
		setTimeout(() => {
			try {
				const formData = new FormData()
				files.forEach(file => {
					formData.append('files', file)
				})
				let mockResults = null
				if (isDownloadConfirm) {
					// Имитация ответа от сервера для примера с записью в БД
					// При отправке запроса передаём loadingDatabase, содержащий информацию, куда записывать результаты
					console.log(loadingDatabase)
					mockResults = files.map(file => ({
						fileName: file.name,
						analysis: `MBTI`,
						writingDatabase: 'Successful entry in the database!',
					}))
				} else {
					// Имитация ответа от сервера для примера без записи в БД
					mockResults = files.map(file => ({
						fileName: file.name,
						analysis: `MBTI`,
						writingDatabase: false,
					}))
				}
				handleAnalysisResult(mockResults)
			} catch (error) {
				setError('Error: ' + error.message)
			}
			setLoadingMessage(false)
		}, 2000)
	}

	return (
		<>
			{files.length > 0 && (
				<button
					onClick={analyzeFiles}
					className='cursor-pointer bg-almost-white text-all-black text-xs md:text-base px-4 py-2 rounded-lg hover:bg-all-black hover:text-almost-white hover:border duration-200'
				>
					Analyze Everything
				</button>
			)}
		</>
	)
}

export default AnalyzeEverything
