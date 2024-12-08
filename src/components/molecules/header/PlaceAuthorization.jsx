import React from 'react'
import { AuthorizationButton } from '../../atoms/AuthorizationButton'

export const PlaceAuthorization = ({ className = '' }) => {
	return (
		<div className={className}>
			<AuthorizationButton
				text='Sign up'
				href='#'
				className='bg-lime-500 focus:ring focus:ring-medium-gray hover:bg-lime-400'
			/>
			<AuthorizationButton
				text='Log in'
				href='#'
				arrow={true}
				className='bg-white focus:ring focus:ring-medium-gray hover:bg-gray-300'
			/>
		</div>
	)
}
