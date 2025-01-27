import React from 'react'

export default function ResponseResult(props) {
	return (
		<>
			{props.message && (
				<div className='text-green-700 text-center rounded relative mb-2 lato-regular text-sm'>
					{props.message}
				</div>
			)}
			{props.error && (
				<div className='text-red-500 text-center rounded relative mb-2 lato-regular text-sm'>
					{props.error}
				</div>
			)}
		</>
	)
}
