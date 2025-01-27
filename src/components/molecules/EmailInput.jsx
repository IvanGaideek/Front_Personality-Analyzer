import React from 'react'

const EmailInput = ({ email, setEmail }) => {
	return (
		<div>
			<label
				htmlFor='email'
				className='block mb-2 text-sm lato-bold text-medium-gray'
			>
				Your email <span className='text-red-500'>*</span>
			</label>
			<input
				type='email'
				name='email'
				id='email'
				className='bg-black-alpha-10 border border-medium-gray text-almost-white text-sm lato-regular rounded-lg focus:ring-medium-yellow focus:border-medium-yellow block w-full p-2.5'
				placeholder='example@gmail.com'
				value={email}
				onChange={e => setEmail(e.target.value)}
				required
			/>
		</div>
	)
}

export default EmailInput
