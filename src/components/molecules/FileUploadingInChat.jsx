import React from 'react'

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
					className='cursor-pointer bg-almost-white text-all-black px-4 py-2 rounded-lg hover:bg-all-black hover:text-almost-white hover:border'
				>
					Select individual file
				</label>
				<label
					htmlFor='file-upload-folder'
					className='cursor-pointer bg-almost-white text-all-black px-4 py-2 rounded-lg hover:bg-all-black hover:text-almost-white hover:border'
				>
					Select folder
				</label>
				{files.length > 0 && (
					<button
						onClick={handleClear}
						className='bg-red-500 text-white px-4 py-2 rounded-lg'
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
		<>
			{files.length > 0 && (
				<div className='mt-4'>
					{files.map(file => (
						<p key={file.name}>{file.name}</p>
					))}
				</div>
			)}
		</>
	)
}

export { FileList, UploadControls, UploadStatus }
