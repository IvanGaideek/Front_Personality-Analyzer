import React from 'react'

const UploadControls = ({
	handleFileChange,
	handleFolderChange,
	files,
	handleClear,
}) => {
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
					className='cursor-pointer bg-almost-white text-all-black text-xs md:text-base px-4 py-2 rounded-lg hover:bg-all-black hover:text-almost-white hover:border duration-200'
				>
					Select individual file
				</label>
				<label
					htmlFor='file-upload-folder'
					className='cursor-pointer bg-almost-white text-all-black text-xs md:text-base px-4 py-2 rounded-lg hover:bg-all-black hover:text-almost-white hover:border duration-200'
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

export default UploadControls
