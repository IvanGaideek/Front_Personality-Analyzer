import React from 'react'
import { AuthorizationButton } from '../../atoms/AuthorizationButton'

export const PlaceAuthorization = ({ className = '' }) => {
	return (
		<div className={className}>
			<AuthorizationButton text='Sign up' href='#' />
			<AuthorizationButton text='Log in' href='#' arrow={true} />
		</div>
	)
}
