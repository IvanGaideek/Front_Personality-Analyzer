import React, { useContext } from 'react'
import { UserContext } from '../../addition/contexts/UserContext'

export default function LogoutButton() {
	const [, setToken] = useContext(UserContext)

	const handleLogout = async () => {
		setToken(null)
	}

	return (
		<a
			className='text-sm/6 text-all-black py-2 px-4 rounded-full transition duration-200 focus:outline-none poppins bg-white focus:ring focus:ring-medium-gray hover:bg-gray-300 border-2 border-all-black'
			href='/'
			onClick={() => {
				handleLogout()
			}}
		>
			Logout
		</a>
	)
}
