import React, { useState } from 'react'
import ChatBot from '../molecules/ChatBot'
import { ChevronDoubleLeftIcon } from '@heroicons/react/24/outline'
import {
	UploadControls,
	FileList,
	UploadStatus,
} from '../molecules/FileUploadingInChat'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 MB
const ACCEPTED_FILE_TYPES = [
	'application/pdf',
	'text/plain',
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

export default function FileUpload() {
	const [files, setFiles] = useState([])
	const [error, setError] = useState('')
	const [isVisible, setIsVisible] = useState(true)
	const [uploading, setUploading] = useState(false)
	const [uploadSuccess, setUploadSuccess] = useState('')

	const handleFileChange = async event => {
		const selectedFiles = Array.from(event.target.files)
		await removeFiles() // Заблаговременно удалить старые файлы на сервере
		processFiles(selectedFiles)
	}

	const handleFolderChange = async event => {
		const selectedFiles = Array.from(event.target.files)
		await removeFiles() // Заблаговременно удалить старые файлы на сервере
		processFiles(selectedFiles, true)
	}

	const processFiles = (selectedFiles, isFolder = false) => {
		const validFiles = []
		let totalSize = 0

		selectedFiles.forEach(file => {
			if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
				setError(
					`Mistake: Only Word, TXT, or PDF files are allowed. Invalid file: ${file.name}`
				)
				return
			}

			totalSize += file.size
			if (isFolder && totalSize > MAX_FILE_SIZE) {
				setError(
					`Error: Total size of the folder exceeds the maximum size of 5 MB.`
				)
				return
			}

			validFiles.push(file)
		})

		if (validFiles.length > 0 && (!isFolder || totalSize <= MAX_FILE_SIZE)) {
			setFiles(validFiles) // Заменить старые файлы новыми
			setError('')
			uploadFiles(validFiles) // Загрузить допустимые файлы
		}
	}

	const uploadFiles = async files => {
		const formData = new FormData()
		files.forEach(file => {
			formData.append('files', file)
		})

		try {
			setUploading(true)
			setUploadSuccess('')
			// Получить CSRF токен для безопасности
			const token = await getCSRFToken()
			const response = await fetch('/upload', {
				method: 'POST',
				headers: {
					'X-CSRF-Token': token,
				},
				body: formData,
			})

			if (response.ok) {
				setUploadSuccess('Files uploaded successfully!')
			} else {
				setError('File upload failed.')
			}
		} catch (error) {
			setError('Error: ' + error.message)
		} finally {
			setUploading(false)
		}
	}

	const removeFiles = async () => {
		try {
			// await fetch('/delete', {
			// 	method: 'DELETE',
			// 	headers: {
			// 		'X-CSRF-Token': await getCSRFToken(),
			// 	},
			// })
			setFiles([]) // Очистить локальный список файлов после удаления на сервере
		} catch (error) {
			setError('Error: ' + error.message)
		}
	}

	const handleDragOver = event => {
		event.preventDefault()
		event.stopPropagation()
	}

	const handleDrop = async event => {
		event.preventDefault()
		event.stopPropagation()
		const droppedFiles = Array.from(event.dataTransfer.files)
		if (droppedFiles.length > 0) {
			await removeFiles() // Заблаговременно удалить старые файлы на сервере
			processFiles(droppedFiles, true)
		}
	}

	const toggleVisibility = () => {
		setIsVisible(!isVisible)
	}

	const handleClear = async () => {
		setError('')
		await removeFiles() // Заблаговременно удалить старые файлы на сервере
		setFiles([])
		setUploadSuccess('')
	}

	return (
		<>
			<div className='flex flex-col items-center mb-4'>
				{isVisible && (
					<div
						className='z-10 flex flex-col items-center justify-center border-dashed border-2 border-almost-white px-4 py-2 rounded-lg w-full max-w-md mx-4 md:mx-12 lg:mx-0 lato-regular'
						onDragOver={handleDragOver}
						onDrop={handleDrop}
					>
						<button onClick={toggleVisibility} className='mb-2'>
							<span className='border-2 border-medium-yellow p-1 text-sm rounded-lg hover:bg-yellow-alpha-20'>
								Hide
							</span>
						</button>
						<h2 className='text-xl mb-2'>Upload files or folder</h2>
						<p className='mb-1 text-medium-gray'>
							Supported formats: Word, TXT, PDF
						</p>
						<p className='mb-2 text-medium-gray'>Maximum size per file: 5 MB</p>
						<UploadControls
							handleFileChange={handleFileChange}
							handleFolderChange={handleFolderChange}
							files={files}
							handleClear={handleClear}
						/>
						<FileList files={files} />
						<UploadStatus
							error={error}
							uploading={uploading}
							uploadSuccess={uploadSuccess}
						/>
					</div>
				)}
				{!isVisible && (
					<button
						onClick={toggleVisibility}
						className='border-2 border-r-0 border-almost-white fixed p-1 right-0 z-50 bg-all-black text-white rounded-l-full'
					>
						<ChevronDoubleLeftIcon className='text-medium-yellow w-6 h-auto' />
					</button>
				)}
			</div>
			<ChatBot maxLength={9000} />
		</>
	)
}
