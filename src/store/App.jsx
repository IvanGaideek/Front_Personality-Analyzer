import { React } from 'react'
import MainPage from '../components/pages/Main'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import FullForPage from '../components/pages/FullForPage'
import Docs from '../components/pages/Docs'
import Footer from '../components/organisms/footer'
import OverviewAboutUs from '../addition/data_elements/pages_docs/about_us/Overview'
import Team from '../addition/data_elements/pages_docs/about_us/Team'
import Profile from '../components/pages/Profile'
import DatabaseSearch from '../components/organisms/DatabaseSearch'
import Product from '../components/pages/Product'
import IntoSystem from '../components/pages/IntoSystem'
import SignIn from '../components/organisms/SignIn'
import SignUp from '../components/organisms/SignUp'
import ChatMbti from '../components/organisms/ChatMbti'
import ChatPersonalAA from '../components/organisms/ChatPerconalAA'

function App() {
	return (
		<BrowserRouter>
			<div className='flex-container'>
				<Routes>
					<Route path='/' element={<FullForPage />}>
						<Route index element={<MainPage />} />
						<Route path='/docs' element={<Docs />}>
							<Route path='/docs/overview' element={<OverviewAboutUs />} />
							<Route path='/docs/team' element={<Team />} />
							<Route path='/docs/fast-start' element={'fast start'} />
							<Route path='/docs/policy' element={'policy'} />
							<Route path='/docs/contacts' element={'contacts'} />
							<Route path='/docs/app-usage' element={'Use app'} />
							<Route path='/docs/api-overview' element={'Api overview'} />
							<Route path='/docs/api-usage' element={'Api use'} />
							<Route path='/docs/gratitude' element={'Gratitude'} />
						</Route>
						<Route path='/product' element={<Product />}>
							<Route
								path='/product/personal-aa'
								element={<ChatPersonalAA title='AI Chat Bot' />}
							/>
							<Route
								path='/product/mbti-classification'
								element={<ChatMbti title='MBTI Classification' />}
							/>
						</Route>
					</Route>
					<Route path='/into-system' element={<IntoSystem />}>
						<Route path='/into-system/register' element={<SignUp />} />
						<Route index path='/into-system' element={<SignIn />} />
					</Route>
					<Route path='/profile' element={<Profile />} />
					<Route path='/data-search' element={<DatabaseSearch />} />
					<Route path='*' element={'Not Found'} />
				</Routes>
				<Footer />
			</div>
		</BrowserRouter>
	)
}

export default App
