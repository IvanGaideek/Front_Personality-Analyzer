import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Product() {
	return (
		<div className='bg-all-black right-top-circle-2-bi'>
			<Outlet />
		</div>
	)
}
