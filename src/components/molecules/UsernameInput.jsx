import React from 'react'

export default function UsernameInput({
	username,
	setUserName,
	minLength = 3,
	maxLength = 32,
}) {
	return (
		<div>
			<label
				htmlFor='username'
				className='block mb-2 text-sm lato-bold text-medium-gray'
			>
				Your name <span className='text-red-500'>*</span>
			</label>
			<input
				type='text'
				name='username'
				id='username'
				className='bg-black-alpha-10 border border-medium-gray text-almost-white text-sm lato-regular rounded-lg focus:ring-medium-yellow focus:border-medium-yellow block w-full p-2.5'
				maxLength={maxLength} // Максимальная длина в 20 символов
				minLength={minLength} // Минимальная длина в 3 символа (опционально)
				placeholder='username'
				value={username}
				onChange={e => setUserName(e.target.value)}
				required
			/>
		</div>
	)
}
