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

	const handleFileChange = event => {
		const selectedFiles = Array.from(event.target.files)
		processFiles(selectedFiles)
	}

	const handleFolderChange = event => {
		const selectedFiles = Array.from(event.target.files)
		processFiles(selectedFiles)
	}

	const processFiles = selectedFiles => {
		const validFiles = []

		selectedFiles.forEach(file => {
			if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
				setError(
					`Mistake: Only Word, TXT, or PDF files are allowed. Invalid file: ${file.name}`
				)
				return
			}

			if (file.size > MAX_FILE_SIZE) {
				setError(`Error: File ${file.name} exceeds the maximum size of 5 MB.`)
				return
			}

			validFiles.push(file)
		})

		if (validFiles.length > 0) {
			setFiles(prevFiles => [...prevFiles, ...validFiles])
			setError('')
			uploadFiles(validFiles) // Upload valid files
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
			// Assuming you have a function to get CSRF token
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

	const handleDragOver = event => {
		event.preventDefault()
		event.stopPropagation()
	}

	const handleDrop = event => {
		event.preventDefault()
		event.stopPropagation()
		const droppedFiles = Array.from(event.dataTransfer.files)
		if (droppedFiles.length > 0) {
			processFiles(droppedFiles)
		}
	}

	const toggleVisibility = () => {
		setIsVisible(!isVisible)
	}

	const handleClear = () => {
		setFiles([])
		setError('')
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
