import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './header'

export default function FullForPage() {
	return (
		<div className='flex-container'>
			<Header />
			<Outlet />
		</div>
	)
}
