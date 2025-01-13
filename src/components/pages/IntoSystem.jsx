import React from 'react'
import { Outlet } from 'react-router-dom'

export default function IntoSystem() {
	return (
		<div className='min-h-screen'>
			<Outlet />
		</div>
	)
}
