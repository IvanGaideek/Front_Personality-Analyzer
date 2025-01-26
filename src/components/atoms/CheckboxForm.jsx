import React from 'react'

export default function CheckboxForm(props) {
	return (
		<div className='flex items-start'>
			<div className='flex items-center h-5'>
				<input
					id='terms'
					aria-describedby='terms'
					type='checkbox'
					className='w-4 h-4 border border-medium-gray rounded bg-black-alpha-20 focus:ring-3 focus:ring-medium-yellow'
					checked={props.checked}
					onChange={props.onChange}
					required
				/>
			</div>
			<div className='ml-3 text-sm lato-regular text-medium-gray'>
				<label htmlFor='terms' className='font-light'>
					{props.children}
				</label>
			</div>
		</div>
	)
}
