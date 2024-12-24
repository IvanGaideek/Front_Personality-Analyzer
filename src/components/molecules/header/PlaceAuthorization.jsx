import React from 'react'
import { AuthorizationButton } from '../../atoms/AuthorizationButton'

export const PlaceAuthorization = ({ className = '' }) => {
	return (
		<div className={className}>
			<AuthorizationButton
				text='Sign up'
				href='/register'
				className='bg-medium-yellow focus:ring focus:ring-medium-gray hover:bg-yellow-alpha-80'
			/>
			<AuthorizationButton
				text='Log in'
				href='/login'
				arrow={true}
				className='bg-white focus:ring focus:ring-medium-gray hover:bg-gray-300'
			/>
		</div>
	)
}
