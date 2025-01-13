import React from 'react'

const PasswordInput = ({ password, setPassword, errorMessage }) => {
	return (
		<div>
			<label
				htmlFor='password'
				className='block mb-2 text-sm lato-bold text-medium-gray'
			>
				Password
			</label>
			<input
				type='password'
				name='password'
				id='password'
				placeholder='••••••••'
				className='bg-black-alpha-10 border border-medium-gray text-almost-white text-sm lato-regular rounded-lg focus:ring-medium-yellow focus:border-medium-yellow block w-full p-2.5'
				value={password}
				onChange={e => setPassword(e.target.value)}
				required
			/>
			{errorMessage && (
				<p className='mt-2 text-sm text-red-500'>{errorMessage}</p>
			)}
		</div>
	)
}

export default PasswordInput
