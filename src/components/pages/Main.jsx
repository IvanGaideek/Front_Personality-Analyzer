import { React } from 'react'
import { Header } from '../organisms/header'
import Footer from '../organisms/footer'
import CenterMainPage from '../organisms/MainWithOpportunities'

function MainPage() {
	return (
		<div className='flex-container overflow-x-hidden'>
			<Header />
			<CenterMainPage />
			<Footer />
		</div>
	)
}

export default MainPage
