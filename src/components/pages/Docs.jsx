import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export default function Docs() {
	return (
		<div>
			<div class='flex'>
				<nav class='flex-none w-64 bg-gray-800 p-6'>
					<h1 class='text-2xl font-bold mb-6'>Project Documentation</h1>
					<h2 class='text-lg font-semibold mb-2'>About Us</h2>
					<ul class='space-y-2 mb-6'>
						<li>
							<a href='#overview' class='hover:text-blue-400'>
								Overview
							</a>
						</li>
						<li>
							<a href='#team' class='hover:text-blue-400'>
								Our Team
							</a>
						</li>
					</ul>

					<h2 class='text-lg font-semibold mb-2'>Instructions</h2>
					<ul class='space-y-2 mb-6'>
						<li>
							<a href='#installation' class='hover:text-blue-400'>
								Installation
							</a>
						</li>
						<li>
							<a href='#usage' class='hover:text-blue-400'>
								Usage
							</a>
						</li>
					</ul>

					<h2 class='text-lg font-semibold mb-2'>Our API</h2>
					<ul class='space-y-2'>
						<li>
							<a href='#api' class='hover:text-blue-400'>
								API Reference
							</a>
						</li>
						<li>
							<a href='#api-usage' class='hover:text-blue-400'>
								API Usage
							</a>
						</li>
					</ul>

					<h2 class='text-lg font-semibold mt-6 mb-2'>Contributing</h2>
					<ul class='space-y-2'>
						<li>
							<a href='#contributing' class='hover:text-blue-400'>
								How to Contribute
							</a>
						</li>
					</ul>
				</nav>

				<main class='flex-1 p-6'>
					<Outlet />
				</main>
			</div>
		</div>
	)
}
