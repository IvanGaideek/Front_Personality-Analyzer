import React, { useContext } from 'react'
import { AuthorizationButton } from '../../atoms/AuthorizationButton'
import {
	login_link,
	register_link,
} from '../../../addition/data_elements/into-system-link'
import LogoutButton from '../../atoms/LogoutButton'
import { UserContext } from '../../../addition/contexts/UserContext'

export const PlaceAuthorization = ({ className = '' }) => {
	const [token] = useContext(UserContext)
	return (
		<div className={'justify-end ' + className}>
			{token ? (
				<LogoutButton />
			) : (
				<>
					<AuthorizationButton
						text='Sign up'
						href={register_link}
						className='bg-medium-yellow focus:ring focus:ring-medium-gray hover:bg-yellow-alpha-80'
					/>
					<AuthorizationButton
						text='Log in'
						href={login_link}
						arrow={true}
						className='bg-white focus:ring focus:ring-medium-gray hover:bg-gray-300'
					/>
				</>
			)}
		</div>
	)
}
