import React, { useEffect, useState } from 'react'
import LogoutButton from '../atoms/LogoutButton'
import DeleteButton from '../atoms/DeleteButton'
import HorizontalLine from '../atoms/HorizontalLine'
import { user_data_items } from '../../addition/data_elements/items-data-user'
import { AiOutlineLoading3Quarters } from 'react-icons/ai' // Иконка для индикации загрузки

export default function Profile() {
	const [userData, setUserData] = useState({
		username: '',
		email: '',
		savedTables: 0,
		isLoading: true,
		error: null,
	})

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await fetch('/api/user/profile', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						// Добавить заголовок авторизации, если потребуется
						// 'Authorization': `Bearer ${yourAuthToken}`
					},
				})

				if (!response.ok) {
					throw new Error('Failed to fetch user data')
				}

				const data = await response.json()
				setUserData({
					username: data.username,
					email: data.email,
					savedTables: data.saved_tables || 0,
					isLoading: false,
					error: null,
				})
			} catch (error) {
				setUserData(prev => ({
					...prev,
					isLoading: false,
					error: 'Failed to load user data',
				}))
			}
		}

		fetchUserData()
	}, [])

	if (userData.isLoading) {
		return (
			<div className='min-h-screen flex flex-row items-center justify-center gap-2 bg-all-black p-6 circle-bi'>
				<div className='text-almost-white text-lg lato-regular'>Loading </div>
				<AiOutlineLoading3Quarters className='animate-spin h-5 w-5 text-almost-white' />
			</div>
		)
	}
	if (userData.error) {
		return (
			<div className='min-h-screen flex items-center justify-center bg-all-black p-6 circle-bi'>
				<div className='text-red-500 text-lg lato-regular'>
					{userData.error}
				</div>
			</div>
		)
	}

	return (
		<div className='min-h-screen flex items-center justify-center bg-all-black p-6 circle-bi'>
			<div className='w-full max-w-6xl rounded-lg bg-almost-white shadow-lg p-8'>
				{/* Profile Section */}
				<h1 className='poppins-bold text-all-black text-2xl'>User Profile</h1>
				<HorizontalLine color='border-medium-gray' etc_style='my-6' />

				<div className='mb-8'>
					<h2 className='text-2xl lato-bold text-center'>
						{userData.username}
					</h2>
					<div className='mt-4 space-y-2'>
						{user_data_items.map(item => (
							<p className='text-all-black open-sans break-words'>
								<span className='lato-bold'>{item.title} </span>
								{userData[item.data]}
							</p>
						))}
					</div>
				</div>

				<HorizontalLine color='border-medium-gray' etc_style='mb-6' />

				{/* Action Buttons */}
				<div className='flex justify-end gap-4'>
					<DeleteButton
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
