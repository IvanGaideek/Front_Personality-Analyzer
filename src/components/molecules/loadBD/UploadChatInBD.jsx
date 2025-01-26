import React, { useState, useEffect, useContext } from 'react'
import CheckboxForm from '../../atoms/CheckboxForm'
import { UploadEnabled } from '../../../addition/contexts/UploadAnalizerData'

const UploadChatInBD = () => {
	const [isUploadEnabled, setUploadEnabled] = useContext(UploadEnabled)
	const [tables, setTables] = useState([])
	const [selectedTable, setSelectedTable] = useState('')
	const [columns, setColumns] = useState([])
	const [personColumn, setPersonColumn] = useState('')
	const [classColumn, setClassColumn] = useState('')
	const [files, setFiles] = useState([])
	const [error, setError] = useState('')
	const [uploading, setUploading] = useState(false)
	const [uploadSuccess, setUploadSuccess] = useState('')

	useEffect(() => {
		const mockTables = ['Table1', 'Table2', 'Table3']
		setTables(mockTables)
	}, [])

	const fetchColumns = async table => {
		const mockColumns = ['Column1', 'Column2', 'Column3', 'Person', 'Class']
		setColumns(mockColumns)
	}

	const handleTableChange = event => {
		const table = event.target.value
		setSelectedTable(table)
		fetchColumns(table)
	}

	const handleUploadFiles = event => {
		const selectedFiles = Array.from(event.target.files)
		setFiles(selectedFiles)
	}

	const handleUploadData = async () => {
		try {
			setUploading(true)
			setUploadSuccess('')
			const formData = new FormData()
			files.forEach(file => {
				formData.append('files', file)
			})
			formData.append('table', selectedTable)
			formData.append('personColumn', personColumn)
			formData.append('classColumn', classColumn)

			// const response = await fetch('/upload-data', {
			//   method: 'POST',
			//   headers: {
			//     'X-CSRF-Token': await getCSRFToken(),
			//   },
			//   body: formData,
			// });

			// Имитация успешного ответа сервера
			const response = { ok: true }

			if (response.ok) {
				setUploadSuccess('Data uploaded successfully!')
			} else {
				setError('Data upload failed.')
			}
		} catch (error) {
			setError('Error: ' + error.message)
		} finally {
			setUploading(false)
		}
	}

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

	return (
		<div className='border-2 border-almost-white bg-all-black p-4 max-w-2xl mx-auto rounded-lg'>
			<h2 className='text-lg font-semibold text-medium-yellow'>
				Data Upload (Database)
			</h2>
			<p className='text-sm text-medium-gray mb-4'>
				Enable data download. Select the table and columns where you want to
				upload the data.
			</p>
			<CheckboxForm
				checked={isUploadEnabled}
				onChange={() => setUploadEnabled(!isUploadEnabled)}
			>
				Enable Upload
			</CheckboxForm>
			{isUploadEnabled && (
				<>
					<div className='flex flex-row items-center justify-content gap-2 mb-4 mt-4'>
						<label className='text-white poppins mb-2'>Select Table:</label>
						<select
							value={selectedTable}
							onChange={handleTableChange}
							className='block w-full md:w-1/3 px-4 py-2 bg-all-black border border-medium-yellow text-white rounded-lg focus:outline-none focus:ring focus:ring-medium-gray transition duration-200'
						>
							{tables.map(table => (
								<option
									key={table}
									value={table}
									className='bg-gray-800 hover:bg-gray-600'
								>
									{table}
								</option>
							))}
						</select>
					</div>
					{selectedTable && (
						<>
							<div className='flex flex-row items-center justify-content gap-2 mb-4 mt-4'>
								<label className='text-white poppins mb-2'>
									Select Person Column:
								</label>
								<select
									value={personColumn}
									onChange={e => setPersonColumn(e.target.value)}
									className='block w-full md:w-1/3 px-4 py-2 bg-all-black border border-medium-yellow text-white rounded-lg focus:outline-none focus:ring focus:ring-medium-gray transition duration-200'
								>
									{columns.map(column => (
										<option
											key={column}
											value={column}
											className='bg-gray-800 hover:bg-gray-600'
										>
											{column}
										</option>
									))}
								</select>
							</div>
							<div className='flex flex-row items-center justify-content gap-2 mb-4 mt-4'>
								<label className='text-white poppins mb-2'>
									Select Class Column:
								</label>
								<select
									value={classColumn}
									onChange={e => setClassColumn(e.target.value)}
									className='block w-full md:w-1/3 px-4 py-2 bg-all-black border border-medium-yellow text-white rounded-lg focus:outline-none focus:ring focus:ring-medium-gray transition duration-200'
								>
									{columns.map(column => (
										<option
											key={column}
											value={column}
											className='bg-gray-800 hover:bg-gray-600'
										>
											{column}
										</option>
									))}
								</select>
							</div>
						</>
					)}
					<input
						type='file'
						onChange={handleUploadFiles}
						accept='.pdf, .txt, .docx'
						className='hidden'
						id='file-upload-multiple'
					/>
					<div className='flex flex-row items-center justify-content gap-4'>
						<label
							htmlFor='file-upload-multiple'
							className='cursor-pointer bg-almost-white text-all-black text-xs md:text-base px-4 py-2 rounded-lg hover:bg-all-black hover:text-almost-white hover:border'
						>
							Select files
						</label>
						{files.length > 0 && (
							<button
								onClick={handleUploadData}
								className='bg-green-500 text-white text-xs md:text-base px-4 py-2 rounded-lg'
							>
								Upload
							</button>
						)}
					</div>
				</>
			)}
			{error && <p className='text-red-500'>{error}</p>}
			{uploadSuccess && <p className='text-green-500'>{uploadSuccess}</p>}
		</div>
	)
}

export default UploadChatInBD
