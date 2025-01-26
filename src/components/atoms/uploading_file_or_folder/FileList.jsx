import React from 'react'

const truncateFilename = (filename, maxLength = 38) => {
	if (filename.length <= maxLength) return filename
	const partLength = Math.floor((maxLength - 3) / 2)
	return filename.slice(0, partLength) + '...' + filename.slice(-partLength)
}

const FileList = ({ files }) => {
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

export default FileList
