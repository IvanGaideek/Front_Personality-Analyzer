import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { BranchesBlocksLink } from '../molecules/BranchesBlocksLink'
import {
	branches_items,
	lonely_items,
} from '../../addition/data_elements/items-docs'
import BranchBlock from '../molecules/BranchBlock'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'

export default function Docs() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen)
	}
	return (
		<div className='flex flex-col min-h-screen bg-gray-100'>
			<div className='flex flex-col md:flex-row flex-1'>
				{/* Sidebar */}
				<nav
					className={`fixed md:static bg-gray-900 text-white p-4 transition-transform duration-300 transform ${
						isMenuOpen
							? 'translate-x-0 rounded-tr-lg rounded-br-lg'
							: '-translate-x-full'
					} md:translate-x-0`}
				>
					<h1 className='text-2xl font-bold mb-4'>Project Documentation</h1>
					<BranchesBlocksLink group={branches_items} />
					<BranchBlock
						items={lonely_items}
						className='hover:text-medium-yellow'
					/>
				</nav>

				{/* Main content */}
				<main className='flex-1 bg-all-black text-white p-4 md:p-6 overflow-y-auto'>
					<Outlet />
				</main>
			</div>

			{/* Mobile Menu Toggle Arrow */}
			<button
				onClick={toggleMenu}
				className={`fixed bottom-4 right-4 z-50 bg-gray-800 text-white p-2 rounded-full transition-opacity duration-300 md:hidden ${
					isMenuOpen ? 'opacity-100' : 'opacity-75 hover:opacity-100'
				}`}
			>
				{isMenuOpen ? (
					<ArrowLeftIcon className='h-6 w-6 z' />
				) : (
					<ArrowRightIcon className='h-6 w-6' />
				)}
			</button>
		</div>
	)
}
