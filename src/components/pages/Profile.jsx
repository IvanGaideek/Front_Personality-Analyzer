import React, { useContext, useEffect, useState } from 'react'
import LogoutButton from '../atoms/LogoutButton'
import DeleteButton from '../atoms/DeleteButton'
import HorizontalLine from '../atoms/HorizontalLine'
import { user_data_items } from '../../addition/data_elements/items-data-user'
import { AiOutlineLoading3Quarters } from 'react-icons/ai' // Иконка для индикации загрузки
import {
	delete_user_link,
	get_profile_data,
} from '../../addition/data_elements/links_to_backend'
import { UserContext } from '../../addition/contexts/UserContext'

export default function Profile() {
	const [userData, setUserData] = useState({
		username: '',
		email: '',
		savedTables: 0,
		isLoading: true,
		error: null,
	})
	const [token, setToken] = useContext(UserContext)

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const url = new URL(get_profile_data)
				url.searchParams.append('authorization', `Bearer ${token}`)

				const request_params = {
					method: 'GET',
					headers: {
						accept: 'application/json',
					},
				}

				const response = await fetch(url, request_params)

				if (!response.ok) {
					setUserData.isLoading(false)
					setUserData.error(response.ok)
					throw new Error(response.ok)
				} else {
					const data = await response.json()
					setUserData({
						username: data.username,
						email: data.email,
						savedTables: null, // пока не реализовано
						isLoading: false,
						error: null,
					})
				}
			} catch (error) {
				setUserData(prev => ({
					...prev,
					isLoading: false,
					error: 'Failed to load user data',
				}))
			}
		}

		fetchUserData()
	}, [token])

	if (userData.isLoading) {
		return (
			<div className='min-h-screen flex flex-row items-center justify-center gap-2 bg-all-black p-6 circle-bi'>
				<div className='text-almost-white text-lg lato-regular'>Loading </div>
				<AiOutlineLoading3Quarters className='animate-spin h-5 w-5 text-almost-white' />
			</div>
		)
	}

	const deleteUser = async () => {
		try {
			const url = new URL(delete_user_link)

			// Добавляем токен авторизации
			url.searchParams.append('authorization', `Bearer ${token}`)

			const request_params = {
				method: 'DELETE', // Метод DELETE для удаления пользователя
				headers: {
					accept: 'application/json',
				},
			}

			const response = await fetch(url, request_params)

			// Проверяем, успешен ли запрос
			if (!response.ok) {
				// Установим состояние ошибки
				setUserData(prev => ({
					...prev,
					isLoading: false,
					error: 'Failed to delete user',
				}))
				throw new Error('Failed to delete user')
			} else {
				// Дополнительно: можно отправить уведомление об успешном удалении
				console.log('User deleted successfully')
				setUserData({
					username: null,
					email: null,
					savedTables: null,
					isLoading: false,
					error: 'User deleted',
				})
				setToken(null)
			}
		} catch (error) {
			// Обрабатываем ошибку, если что-то пошло не так
			setUserData(prev => ({
				...prev,
				isLoading: false,
				error: 'Failed to delete user',
			}))
		}
	}

	return (
		<div className='min-h-screen flex items-center justify-center bg-all-black p-6 circle-bi'>
			<div className='w-full max-w-6xl rounded-lg bg-almost-white shadow-lg p-8'>
				{/* Profile Section */}
				<h1 className='poppins-bold text-all-black text-2xl'>User Profile</h1>
				<HorizontalLine color='border-medium-gray' etc_style='my-6' />
				{!userData.error ? (
					<div className='mb-8'>
						<h2 className='text-2xl lato-bold text-center'>
							{userData.username}
						</h2>
						<div className='mt-4 space-y-2'>
							{user_data_items.map(item => (
								<p
									className='text-all-black open-sans break-words'
									key={item.title}
								>
									<span className='lato-bold'>{item.title} </span>
									{userData[item.data]}
								</p>
							))}
						</div>
					</div>
				) : (
					<div className='text-red-500 text-lg lato-regular'>
						{userData.error}
					</div>
				)}

				<HorizontalLine color='border-medium-gray' etc_style='mb-6' />

				{/* Action Buttons */}
				<div className='flex justify-end gap-4'>
					<DeleteButton
						deleting_func={deleteUser}
						text='Delete'
						title='Confirm the deletion'
						description='Are you sure you want to delete your account along with other dependent data?'
						className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 text-sm/6 rounded-full transition duration-200 focus:outline-none poppins focus:ring focus:ring-medium-gray mr-2 border-2 border-all-black'
					/>
					<LogoutButton />
				</div>
			</div>
		</div>
	)
}
