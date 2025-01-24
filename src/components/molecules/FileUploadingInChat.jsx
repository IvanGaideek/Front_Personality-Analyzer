import React from 'react'

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

export { FileList, UploadControls, UploadStatus }
