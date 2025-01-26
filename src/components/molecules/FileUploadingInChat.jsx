import React, { useState } from 'react'
import { ChevronDoubleLeftIcon } from '@heroicons/react/24/outline'

const MAX_SIZE_MB = 5
const MAX_FILE_SIZE = MAX_SIZE_MB * 1024 * 1024 // 5 MB
const ACCEPTED_FILE_TYPES = [
	'application/pdf',
	'text/plain',
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

// Обрезка слов
const truncateFilename = (filename, maxLength = 38) => {
	if (filename.length <= maxLength) return filename
	const partLength = Math.floor((maxLength - 3) / 2)
	return filename.slice(0, partLength) + '...' + filename.slice(-partLength)
}

function UploadControls({
	handleFileChange,
	handleFolderChange,
	files,
	handleClear,
}) {
	return (
		<>
			<input
				type='file'
				onChange={handleFileChange}
				accept='.pdf, .txt, .docx'
				className='hidden'
				id='file-upload-single'
			/>
			<input
				type='file'
				onChange={handleFolderChange}
				accept='.pdf, .txt, .docx'
				webkitdirectory=''
				directory=''
				className='hidden'
				id='file-upload-folder'
			/>
			<div className='flex flex-row items-center justify-content gap-4'>
				<label
					htmlFor='file-upload-single'
					className='cursor-pointer bg-almost-white text-all-black text-xs md:text-base px-4 py-2 rounded-lg hover:bg-all-black hover:text-almost-white hover:border'
				>
					Select individual file
				</label>
				<label
					htmlFor='file-upload-folder'
					className='cursor-pointer bg-almost-white text-all-black text-xs md:text-base px-4 py-2 rounded-lg hover:bg-all-black hover:text-almost-white hover:border'
				>
					Select folder
				</label>
				{files.length > 0 && (
					<button
						onClick={handleClear}
						className='bg-red-500 text-white text-xs md:text-base px-4 py-2 rounded-lg'
					>
						Clear
					</button>
				)}
			</div>
		</>
	)
}

function UploadStatus({ error, uploading, uploadSuccess }) {
	return (
		<>
			{error && <p className='mt-1 text-red-500 text-sm open-sans'>{error}</p>}
			{uploading && <p className='mt-1 text-white'>Uploading...</p>}
			{uploadSuccess && (
				<p className='mt-1 text-medium-yellow'>{uploadSuccess}</p>
			)}
		</>
	)
}

function FileList({ files }) {
	return (
		<div className='mt-4 max-h-40 overflow-y-auto'>
			{files.length > 0 && (
				<ul>
					{files.map(file => (
						<li key={file.name} className='truncate'>
							{truncateFilename(file.name)}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

function BoxUploadFiles({ path_upload, path_delete }) {
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
			if (totalSize > MAX_FILE_SIZE) {
				setError(
					`Error: Total size of the folder exceeds the maximum size of ${MAX_SIZE_MB} MB.`
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
			const response = await fetch(path_upload, {
				method: 'POST',
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
			await fetch(path_delete, {
				method: 'DELETE',
			})
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
		<div className='flex flex-col items-center mb-4'>
			{isVisible && (
				<div
					className='z-20 flex flex-col items-center justify-center border-dashed border-2 border-almost-white px-4 py-2 rounded-lg w-full max-w-md mx-4 md:mx-12 lg:mx-0 lato-regular'
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
	)
}

export { BoxUploadFiles }
