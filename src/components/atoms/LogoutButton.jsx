import React from 'react'
import { Link } from 'react-router-dom'

export default function LogoutButton() {
	return (
		<Link
			className='text-sm/6 text-all-black py-2 px-4 rounded-full transition duration-200 focus:outline-none poppins bg-white focus:ring focus:ring-medium-gray hover:bg-gray-300 border-2 border-all-black'
			to='/'
		>
			Logout
		</Link>
	)
}
