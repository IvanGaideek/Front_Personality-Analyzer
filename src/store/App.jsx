import { React } from 'react'
import MainPage from '../components/pages/Main'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import FullForPage from '../components/organisms/FullForPage'
import Docs from '../components/pages/Docs'
import Footer from '../components/organisms/footer'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<FullForPage />}>
					<Route index element={<MainPage />} />
					<Route path='/docs' element={<Docs />}>
						<Route path='/docs/overview' element={'overview'} />
						<Route path='/docs/api' element={'...'} />
						<Route path='/docs/team' element={'...'} />
						<Route path='/docs/manual' element={'fast start'} />
						<Route path='/docs/policy' element={'...'} />
						<Route path='/docs/contact' element={'contact'} />
					</Route>
				</Route>
				<Route path='/register' element={'Register'} />
				<Route path='/login' element={'Login'} />
				<Route path='/profile' element={'Profile user'} />
				<Route path='*' element={'Not Found'} />
			</Routes>
			<Footer />
		</BrowserRouter>
	)
}

export default App
