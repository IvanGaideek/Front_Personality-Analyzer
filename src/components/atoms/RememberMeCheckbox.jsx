import React from 'react'

const RememberMeCheckbox = ({ rememberMe, setRememberMe }) => {
	return (
		<div className='flex items-center justify-between'>
			<div className='flex items-start'>
				<div className='flex items-center h-5'>
					<input
						id='remember'
						aria-describedby='remember'
						type='checkbox'
						className='w-4 h-4 border border-medium-gray rounded bg-black-alpha-20 focus:ring-3 focus:ring-medium-yellow'
						checked={rememberMe}
						onChange={() => setRememberMe(!rememberMe)}
					/>
				</div>
				<div className='ml-3 text-sm'>
					<label
						htmlFor='remember'
						className='font-light text-medium-gray lato-regular'
					>
						Remember me
					</label>
				</div>
			</div>
		</div>
	)
}

export default RememberMeCheckbox
