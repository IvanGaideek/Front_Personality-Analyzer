import { React } from 'react'
import { Header } from '../organisms/header'
import Footer from '../organisms/footer'

function MainPage() {
	return (
		<div className='bg-gray-100 flex-container'>
			<Header />
			<div class='flex-grow'>
				<div class='p-4'>
					<h1 class='text-xl font-bold'>Welcome to the Page!</h1>
					<p>This is the main content area.</p>
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default MainPage
