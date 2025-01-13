import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../organisms/header'

export default function FullForPage() {
	return (
		<>
			<Header />
			<Outlet />
		</>
	)
}
