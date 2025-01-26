import React from 'react'

const AnalyzeEverything = ({ files, setError, handleAnalysisResult }) => {
	const analyzeFiles = async () => {
		try {
			const formData = new FormData()
			files.forEach(file => {
				formData.append('files', file)
			})

			// Отправка файлов на сервер для анализа
			const response = await fetch('/analyze-files', {
				method: 'POST',
				headers: {
					'X-CSRF-Token': await getCSRFToken(),
				},
				body: formData,
			})

			const resultData = await response.json()
			if (response.ok) {
				handleAnalysisResult(resultData.results)
			} else {
				setError('File analysis failed.')
			}
		} catch (error) {
			setError('Error: ' + error.message)
		}
	}

	return (
		<>
			{files.length > 0 && (
				<button
					onClick={analyzeFiles}
					className='cursor-pointer bg-almost-white text-all-black text-xs md:text-base px-4 py-2 rounded-lg hover:bg-all-black hover:text-almost-white hover:border'
				>
					Analyze Everything
				</button>
			)}
		</>
	)
}

export default AnalyzeEverything
