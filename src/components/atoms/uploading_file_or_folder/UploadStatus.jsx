import React from 'react'

const UploadStatus = ({ error, uploading, uploadSuccess }) => {
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

export default UploadStatus
