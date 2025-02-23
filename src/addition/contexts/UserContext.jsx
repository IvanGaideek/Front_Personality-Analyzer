import React, { createContext, useEffect, useState } from 'react'
import { user_me_link } from '../data_elements/links_to_backend'

export const UserContext = createContext()

export const UserProvider = props => {
	// Проблема была в том, что не возвращалось значение из useState
	const [rememberMe, setRememberMe] = useState(() => {
		return localStorage.getItem('remember_me') === 'true'
	})

	const [token, setToken] = useState(() => {
		if (localStorage.getItem('remember_me') === 'true') {
			return localStorage.getItem('access_token')
		}
		return sessionStorage.getItem('access_token')
	})

	const handleSetToken = (newToken, remember = false) => {
		if (remember) {
			localStorage.setItem('access_token', newToken)
			localStorage.setItem('remember_me', 'true')
			sessionStorage.removeItem('access_token')
		} else {
			sessionStorage.setItem('access_token', newToken)
			localStorage.removeItem('access_token')
			localStorage.setItem('remember_me', 'false')
		}
		setToken(newToken)
		setRememberMe(remember)
	}

	useEffect(() => {
		const fetchUser = async () => {
			if (!token) {
				handleSetToken(null)
				return
			}

			try {
				const url = new URL(user_me_link)
				url.searchParams.append('authorization', `Bearer ${token}`)

				const request_params = {
					method: 'GET',
					headers: {
						accept: 'application/json',
					},
				}

				const response = await fetch(url, request_params)

				if (!response.ok) {
					handleSetToken(null, rememberMe)
					return
				}

				// Сохраняем токен в соответствующее хранилище
				if (rememberMe) {
					localStorage.setItem('access_token', token)
					localStorage.setItem('remember_me', 'true')
				} else {
					sessionStorage.setItem('access_token', token)
				}
			} catch (error) {
				console.error('Error fetching user:', error)
				handleSetToken(null, rememberMe)
			}
		}

		fetchUser()
	}, [token])

	const contextValue = [token, handleSetToken]

	return (
		<UserContext.Provider value={contextValue}>
			{props.children}
		</UserContext.Provider>
	)
}
